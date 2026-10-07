const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const dbConfig = { host: 'localhost', user: 'root', password: 'students', database: 'kalasetu_db' };
let pool;

async function initDB() {
    try {
        pool = mysql.createPool(dbConfig);
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS ARTISAN (
                artisan_id INT AUTO_INCREMENT PRIMARY KEY, 
                name VARCHAR(255), 
                email VARCHAR(255) UNIQUE, 
                phone VARCHAR(50)
            );
        `);
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS BUYER (
                buyer_id INT AUTO_INCREMENT PRIMARY KEY, 
                name VARCHAR(255), 
                email VARCHAR(255) UNIQUE, 
                phone VARCHAR(50)
            );
        `);
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS PRODUCT (
                product_id INT AUTO_INCREMENT PRIMARY KEY, 
                artisan_id INT, 
                name VARCHAR(255), 
                description TEXT, 
                price DECIMAL(10,2), 
                stock INT, 
                FOREIGN KEY (artisan_id) REFERENCES ARTISAN(artisan_id) ON DELETE CASCADE
            );
        `);
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS \`ORDER\` (
                order_id INT AUTO_INCREMENT PRIMARY KEY, 
                buyer_id INT, 
                product_id INT, 
                quantity INT, 
                order_date DATE, 
                status VARCHAR(50) DEFAULT 'Pending', 
                FOREIGN KEY (buyer_id) REFERENCES BUYER(buyer_id) ON DELETE CASCADE, 
                FOREIGN KEY (product_id) REFERENCES PRODUCT(product_id) ON DELETE CASCADE
            );
        `);
        
        console.log("Database connected successfully.");
    } catch (err) {
        console.error("Database initialization error:", err.message);
    }
}
initDB();

app.get('/api/artisans', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ARTISAN');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/artisans', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const [result] = await pool.query('INSERT INTO ARTISAN (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
        res.json({ message: 'Artisan registered', artisan_id: result.insertId });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/buyers', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM BUYER');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/buyers', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const [result] = await pool.query('INSERT INTO BUYER (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
        res.json({ message: 'Buyer registered', buyer_id: result.insertId });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/artisan/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [artisan] = await pool.query('SELECT * FROM ARTISAN WHERE artisan_id = ?', [id]);
        const [pCount] = await pool.query('SELECT COUNT(*) AS total FROM PRODUCT WHERE artisan_id = ?', [id]);
        const [sales] = await pool.query('SELECT COALESCE(SUM(p.price * o.quantity), 0) AS earnings, COUNT(o.order_id) AS orders FROM \`ORDER\` o JOIN PRODUCT p ON o.product_id = p.product_id WHERE p.artisan_id = ?', [id]);
        const [recentOrders] = await pool.query('SELECT o.order_id, b.name AS buyer_name, p.name AS product_name, (p.price * o.quantity) AS total_amount, o.order_date FROM \`ORDER\` o JOIN PRODUCT p ON o.product_id = p.product_id JOIN BUYER b ON o.buyer_id = b.buyer_id WHERE p.artisan_id = ?', [id]);
        res.json({ artisan: artisan[0], totalProducts: pCount[0].total, totalEarnings: sales[0].earnings, totalOrders: sales[0].orders, recentOrders });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/products', async (req, res) => {
    try {
        const { artisan_id, name, description, price, stock } = req.body;
        const [result] = await pool.query('INSERT INTO PRODUCT (artisan_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)', [artisan_id, name, description, price, stock]);
        res.json({ message: 'Product added', product_id: result.insertId });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT p.*, a.name AS artisan_name FROM PRODUCT p JOIN ARTISAN a ON p.artisan_id = a.artisan_id WHERE p.stock > 0');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/buyer/:id/orders', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT o.*, p.name AS product_name, a.name AS artisan_name, (p.price * o.quantity) AS total_amount FROM \`ORDER\` o JOIN PRODUCT p ON o.product_id = p.product_id JOIN ARTISAN a ON p.artisan_id = a.artisan_id WHERE o.buyer_id = ?', [req.params.id]);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/orders', async (req, res) => {
    try {
        const { buyer_id, product_id, quantity } = req.body;
        const date = new Date().toISOString().slice(0, 10);
        await pool.query('INSERT INTO \`ORDER\` (buyer_id, product_id, quantity, order_date) VALUES (?, ?, ?, ?)', [buyer_id, product_id, quantity, date]);
        await pool.query('UPDATE PRODUCT SET stock = stock - ? WHERE product_id = ?', [quantity, product_id]);
        res.json({ message: 'Order placed' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(3000, () => console.log('Server started on port 3000'));