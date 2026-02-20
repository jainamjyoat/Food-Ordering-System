# MongoDB Setup Guide

## Prerequisites

Make sure you have MongoDB installed and running on your system.

### Install MongoDB

#### Windows
1. Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the installation wizard
3. MongoDB will be installed as a Windows Service and start automatically

#### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

## Configuration

### 1. Environment Variables
The MongoDB connection string is already configured in `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/
```

### 2. Database Name
The application uses the database name: `food_ordering_system`

### 3. Collections
The following collections are automatically created:
- `users` - Stores user account information
- `orders` - Stores order data
- `food_items` - Stores food menu items

## Installation

1. Install dependencies:
```bash
npm install
```

This will install the MongoDB driver (`mongodb` package).

## Migration from JSON to MongoDB

If you have existing user data in `data/users.json`, you can migrate it to MongoDB:

1. Make sure MongoDB is running
2. Run the migration script:
```bash
node scripts/migrate-to-mongodb.js
```

This will transfer all users from the JSON file to MongoDB.

## Running the Application

### Development
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## Database Operations

The `lib/db.js` file provides the following functions:

### User Operations
- `getAllUsers()` - Get all users
- `findUserByEmail(email)` - Find user by email
- `findUserById(id)` - Find user by MongoDB ID
- `addUser(userData)` - Create new user
- `updateUser(id, updates)` - Update user
- `deleteUser(id)` - Delete user
- `verifyUserCredentials(email, password)` - Verify login

### Order Operations
- `getAllOrders()` - Get all orders
- `getOrdersByUserId(userId)` - Get user's orders
- `createOrder(orderData)` - Create new order
- `updateOrder(orderId, updates)` - Update order
- `deleteOrder(orderId)` - Delete order

### Food Items Operations
- `getAllFoodItems()` - Get all food items
- `getFoodItemById(id)` - Get food item by ID
- `addFoodItem(itemData)` - Add new food item
- `updateFoodItem(id, updates)` - Update food item
- `deleteFoodItem(id)` - Delete food item

## Troubleshooting

### MongoDB Connection Error
If you get a connection error:
1. Verify MongoDB is running: `mongosh` (or `mongo` for older versions)
2. Check the connection string in `.env.local`
3. Ensure MongoDB is listening on `localhost:27017`

### Migration Issues
If the migration script fails:
1. Ensure `data/users.json` exists and is valid JSON
2. Check MongoDB is running
3. Verify the MONGODB_URI environment variable is set correctly

## Security Notes

- In production, use MongoDB Atlas (cloud) with proper authentication
- Update the MONGODB_URI to include username and password
- Use environment variables for sensitive credentials
- Enable MongoDB authentication and use strong passwords
- Use SSL/TLS for connections in production

## Next Steps

1. Start MongoDB service
2. Run `npm install` to install dependencies
3. Run the application with `npm run dev`
4. If migrating from JSON, run the migration script
5. Test the application at `http://localhost:3000`
