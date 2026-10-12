const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'USERNAME',
    password: 'PASSWORD',
    database: 'kalasetu_db'
};

async function seedDatabase() {
    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to database...');

        // Clear existing data (optional - comment out if you want to keep existing data)
        console.log('Clearing existing data...');
        await connection.query('SET FOREIGN_KEY_CHECKS = 0');
        await connection.query('TRUNCATE TABLE `ORDER`');
        await connection.query('TRUNCATE TABLE PRODUCT');
        await connection.query('TRUNCATE TABLE BUYER');
        await connection.query('TRUNCATE TABLE ARTISAN');
        await connection.query('SET FOREIGN_KEY_CHECKS = 1');

        // Insert Artisans
        console.log('Inserting artisans...');
        const artisans = [
            ['Rajesh Kumar', 'rajesh.kumar@kalasetu.com', '+91-9876543210'],
            ['Priya Sharma', 'priya.sharma@kalasetu.com', '+91-9876543211'],
            ['Amit Patel', 'amit.patel@kalasetu.com', '+91-9876543212'],
            ['Lakshmi Reddy', 'lakshmi.reddy@kalasetu.com', '+91-9876543213'],
            ['Vikram Singh', 'vikram.singh@kalasetu.com', '+91-9876543214']
        ];

        for (const artisan of artisans) {
            await connection.query(
                'INSERT INTO ARTISAN (name, email, phone) VALUES (?, ?, ?)',
                artisan
            );
        }
        console.log(`✓ Added ${artisans.length} artisans`);

        // Insert Buyers
        console.log('Inserting buyers...');
        const buyers = [
            ['Arjun Mehta', 'arjun.mehta@gmail.com', '+91-9123456780'],
            ['Sneha Gupta', 'sneha.gupta@gmail.com', '+91-9123456781'],
            ['Rahul Verma', 'rahul.verma@gmail.com', '+91-9123456782'],
            ['Kavita Nair', 'kavita.nair@gmail.com', '+91-9123456783'],
            ['Aditya Joshi', 'aditya.joshi@gmail.com', '+91-9123456784'],
            ['Pooja Iyer', 'pooja.iyer@gmail.com', '+91-9123456785']
        ];

        for (const buyer of buyers) {
            await connection.query(
                'INSERT INTO BUYER (name, email, phone) VALUES (?, ?, ?)',
                buyer
            );
        }
        console.log(`✓ Added ${buyers.length} buyers`);

        // Insert Products
        console.log('Inserting products...');
        const products = [
            // Rajesh Kumar's Products (Artisan ID: 1)
            [1, 'Handwoven Silk Saree', 'Beautiful traditional silk saree with intricate patterns, handwoven by skilled artisans', 4500.00, 15],
            [1, 'Cotton Dupatta', 'Soft cotton dupatta with block print designs, perfect for daily wear', 850.00, 25],
            [1, 'Embroidered Shawl', 'Woolen shawl with traditional embroidery work', 2200.00, 10],

            // Priya Sharma's Products (Artisan ID: 2)
            [2, 'Terracotta Flower Vase', 'Handcrafted terracotta vase with ethnic designs', 650.00, 20],
            [2, 'Clay Dinner Set', 'Traditional clay dinner set for 4 people, eco-friendly', 1800.00, 8],
            [2, 'Decorative Wall Hanging', 'Beautiful terracotta wall art piece', 950.00, 12],

            // Amit Patel's Products (Artisan ID: 3)
            [3, 'Wooden Jewelry Box', 'Handcarved teak wood jewelry box with brass fittings', 1500.00, 18],
            [3, 'Sandalwood Statue', 'Carved sandalwood deity statue, 6 inches', 3200.00, 5],
            [3, 'Wooden Coasters Set', 'Set of 6 handcrafted wooden coasters with stand', 450.00, 30],
            [3, 'Carved Photo Frame', 'Intricately carved wooden photo frame, 8x10 inches', 750.00, 22],

            // Lakshmi Reddy's Products (Artisan ID: 4)
            [4, 'Pearl Necklace Set', 'Handmade pearl necklace with matching earrings', 2800.00, 12],
            [4, 'Silver Anklet', 'Traditional silver anklet with ghungroo bells', 1600.00, 15],
            [4, 'Beaded Bracelet', 'Colorful handmade beaded bracelet set', 380.00, 40],
            [4, 'Kundan Maang Tikka', 'Traditional kundan maang tikka for special occasions', 1950.00, 8],

            // Vikram Singh's Products (Artisan ID: 5)
            [5, 'Handwoven Jute Bag', 'Eco-friendly jute shopping bag with leather handles', 550.00, 35],
            [5, 'Bamboo Basket Set', 'Set of 3 handwoven bamboo baskets in different sizes', 890.00, 20],
            [5, 'Cane Chair', 'Traditional handwoven cane chair, sturdy and comfortable', 3500.00, 6],
            [5, 'Jute Table Runner', 'Decorative jute table runner with embroidery', 420.00, 25]
        ];

        for (const product of products) {
            await connection.query(
                'INSERT INTO PRODUCT (artisan_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)',
                product
            );
        }
        console.log(`✓ Added ${products.length} products`);

        // Insert Orders
        console.log('Inserting orders...');
        const orders = [
            // Recent orders from various buyers
            [1, 1, 1, '2026-10-05'],  // Arjun bought Silk Saree from Rajesh
            [2, 4, 2, '2026-10-05'],  // Sneha bought Terracotta Vase from Priya
            [3, 7, 1, '2026-10-06'],  // Rahul bought Wooden Jewelry Box from Amit
            [1, 9, 2, '2026-10-06'],  // Arjun bought Wooden Coasters from Amit
            [4, 11, 1, '2026-10-06'], // Kavita bought Pearl Necklace from Lakshmi
            [5, 15, 1, '2026-10-07'], // Aditya bought Jute Bag from Vikram
            [2, 2, 1, '2026-10-07'],  // Sneha bought Cotton Dupatta from Rajesh
            [6, 13, 2, '2026-10-07'], // Pooja bought Beaded Bracelets from Lakshmi
            [3, 5, 1, '2026-10-07'],  // Rahul bought Clay Dinner Set from Priya
            [4, 16, 3, '2026-10-07']  // Kavita bought Bamboo Basket Sets from Vikram
        ];

        for (const order of orders) {
            await connection.query(
                'INSERT INTO `ORDER` (buyer_id, product_id, quantity, order_date) VALUES (?, ?, ?, ?)',
                order
            );
            // Update stock
            await connection.query(
                'UPDATE PRODUCT SET stock = stock - ? WHERE product_id = ?',
                [order[2], order[1]]
            );
        }
        console.log(`✓ Added ${orders.length} orders`);

        // Display summary
        console.log('\n========================================');
        console.log('✅ DATABASE SEEDING COMPLETED!');
        console.log('========================================');
        console.log(`Total Artisans: ${artisans.length}`);
        console.log(`Total Buyers: ${buyers.length}`);
        console.log(`Total Products: ${products.length}`);
        console.log(`Total Orders: ${orders.length}`);
        console.log('========================================\n');

        // Display some sample data
        console.log('📊 Sample Data Overview:\n');

        console.log('ARTISANS:');
        artisans.forEach((a, i) => console.log(`  ${i + 1}. ${a[0]} - ${a[1]}`));

        console.log('\nBUYERS:');
        buyers.forEach((b, i) => console.log(`  ${i + 1}. ${b[0]} - ${b[1]}`));

        console.log('\nSAMPLE PRODUCTS:');
        console.log('  • Handwoven Silk Saree (₹4,500) - Rajesh Kumar');
        console.log('  • Terracotta Flower Vase (₹650) - Priya Sharma');
        console.log('  • Wooden Jewelry Box (₹1,500) - Amit Patel');
        console.log('  • Pearl Necklace Set (₹2,800) - Lakshmi Reddy');
        console.log('  • Handwoven Jute Bag (₹550) - Vikram Singh');
        console.log('  ... and more!\n');

        console.log('🚀 You can now start the server with: node server.js');
        console.log('🌐 Then visit: http://localhost:3000\n');

    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed.');
        }
    }
}

// Run the seed function
seedDatabase();
