# KalaSetu Marketplace Platform

**KalaSetu** is a web-based marketplace platform designed to connect artisans with buyers, enabling artisans to showcase and sell their handcrafted products while providing buyers with a seamless shopping experience.

![KalaSetu Platform]

## 🌟 Features

### Artisan Portal
- **Artisan Registration**: Register artisans with name, email, and phone number
- **Product Management**: Add products with details (name, description, price, stock)
- **Product Listings**: View all products listed by the artisan on their profile
- **Order Management**: View incoming orders from buyers
- **Order Deletion**: Delete/cancel orders and automatically restore product stock
- **Real-time Dashboard**: Track products, orders, and earnings

### Buyer Storefront
- **Buyer Registration**: Register buyers with name, email, and phone number
- **Product Browsing**: View all available products with artisan information
- **Order Placement**: Purchase products directly from artisans
- **Order History**: View all placed orders with product and artisan details
- **Order Cancellation**: Cancel orders with stock restoration

### Technical Features
- Responsive design with Tailwind CSS
- Real-time data updates
- MySQL database with relational integrity
- RESTful API architecture
- Stock management with automatic updates
- Order tracking system

## 🛠️ Tech Stack

- **Frontend**: HTML5, JavaScript (Vanilla), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Dependencies**:
  - `express` - Web framework
  - `mysql2` - MySQL client with Promise support
  - `cors` - Cross-Origin Resource Sharing
  - `body-parser` - Request body parsing middleware

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) (v5.7 or higher)
- npm (comes with Node.js)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd kalasetu-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up MySQL Database

1. Start your MySQL server
2. Create a database named `kalasetu_db`:

```sql
CREATE DATABASE kalasetu_db;
```

3. Update database credentials in `server.js` if needed (default configuration):

```javascript
const dbConfig = { 
    host: 'localhost', 
    user: 'USERNAME', 
    password: 'PASSWORD', 
    database: 'kalasetu_db' 
};
```

The application will automatically create the required tables on first run:
- `ARTISAN` - Stores artisan information
- `BUYER` - Stores buyer information
- `PRODUCT` - Stores product listings
- `ORDER` - Stores order transactions

## 🎯 Usage

### Start the server

```bash
node server.js
```

The server will start on `http://localhost:3000`

### Access the application

Open your web browser and navigate to:
```
http://localhost:3000
```

## 📖 User Guide

### For Artisans

1. **Register**: Click on "Artisan Portal" and fill in the registration form
2. **Add Products**: Use the "Add Product" section to list your items
3. **View Products**: See all your listed products in the "My Listed Products" section
4. **Monitor Orders**: Check incoming orders in the "Recent Orders" section
5. **Manage Orders**: Delete orders if needed (stock will be automatically restored)

### For Buyers

1. **Register**: Switch to "Buyer Storefront" and complete the registration
2. **Browse Products**: View all available products from various artisans
3. **Place Orders**: Click "Buy Now" to purchase items
4. **Track Orders**: View your order history in "My Placed Orders"
5. **Cancel Orders**: Use the "Cancel" button to delete orders

## 🔌 API Endpoints

### Artisans
- `GET /api/artisans` - Get all artisans
- `POST /api/artisans` - Register a new artisan
- `GET /api/artisan/:id` - Get artisan dashboard data
- `GET /api/artisan/:id/products` - Get all products by artisan

### Buyers
- `GET /api/buyers` - Get all buyers
- `POST /api/buyers` - Register a new buyer
- `GET /api/buyer/:id/orders` - Get buyer's order history

### Products
- `GET /api/products` - Get all available products (stock > 0)
- `POST /api/products` - Add a new product

### Orders
- `POST /api/orders` - Place a new order
- `DELETE /api/orders/:id` - Delete an order (restores stock)

## 📁 Project Structure

```
kalasetu-app/
│
├── public/
│   └── index.html          # Frontend application
│
├── node_modules/           # Dependencies (auto-generated)
│
├── server.js               # Backend server and API
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Locked versions of dependencies
└── README.md               # Project documentation
```

## 🗄️ Database Schema

### ARTISAN Table
```sql
artisan_id (INT, PRIMARY KEY, AUTO_INCREMENT)
name (VARCHAR 255)
email (VARCHAR 255, UNIQUE)
phone (VARCHAR 50)
```

### BUYER Table
```sql
buyer_id (INT, PRIMARY KEY, AUTO_INCREMENT)
name (VARCHAR 255)
email (VARCHAR 255, UNIQUE)
phone (VARCHAR 50)
```

### PRODUCT Table
```sql
product_id (INT, PRIMARY KEY, AUTO_INCREMENT)
artisan_id (INT, FOREIGN KEY)
name (VARCHAR 255)
description (TEXT)
price (DECIMAL 10,2)
stock (INT)
```

### ORDER Table
```sql
order_id (INT, PRIMARY KEY, AUTO_INCREMENT)
buyer_id (INT, FOREIGN KEY)
product_id (INT, FOREIGN KEY)
quantity (INT)
order_date (DATE)
status (VARCHAR 50, DEFAULT 'Pending')
```

## 🔒 Security Notes

- This is a demonstration application. For production use:
  - Implement proper authentication and authorization
  - Use environment variables for sensitive data
  - Add input validation and sanitization
  - Implement rate limiting
  - Use HTTPS
  - Add CSRF protection
  - Implement proper error handling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Known Issues

- No user authentication implemented
- No payment gateway integration
- Limited error handling on the frontend
- No email notifications for orders

## 🚧 Future Enhancements

- [ ] User authentication and authorization
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Order status tracking (Pending, Shipped, Delivered)
- [ ] Product images upload
- [ ] Search and filter functionality
- [ ] Product reviews and ratings
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app version

## 📧 Support

For support, email support@kalasetu.com or create an issue in the repository.

## 👥 Authors

- **KalaSetu Team** - Param Gupta,
                      Viyom Jain,
                      Param Jain

## 🙏 Acknowledgments

- Background image from [Sarmaya Museum](https://sarmaya.in)
- Built with [Tailwind CSS](https://tailwindcss.com)
- Powered by [Express.js](https://expressjs.com) and [MySQL](https://www.mysql.com)

---

**Made with ❤️ for artisans and their craft**
