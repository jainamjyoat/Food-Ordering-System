import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const DB_NAME = 'food_ordering_system';
const USERS_COLLECTION = 'users';
const ORDERS_COLLECTION = 'orders';
const FOOD_ITEMS_COLLECTION = 'food_items';

let cachedClient = null;
let cachedDb = null;

// Connect to MongoDB
async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);

    cachedClient = client;
    cachedDb = db;

    console.log('Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Get users collection
async function getUsersCollection() {
  const { db } = await connectToDatabase();
  return db.collection(USERS_COLLECTION);
}

// Get orders collection
async function getOrdersCollection() {
  const { db } = await connectToDatabase();
  return db.collection(ORDERS_COLLECTION);
}

// Get food items collection
async function getFoodItemsCollection() {
  const { db } = await connectToDatabase();
  return db.collection(FOOD_ITEMS_COLLECTION);
}

// ==================== USER OPERATIONS ====================

// Get all users
export async function getAllUsers() {
  try {
    const usersCollection = await getUsersCollection();
    const users = await usersCollection.find({}).toArray();
    return users;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
}

// Find user by email
export async function findUserByEmail(email) {
  try {
    const usersCollection = await getUsersCollection();
    const user = await usersCollection.findOne({ email });
    return user;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}

// Find user by ID
export async function findUserById(id) {
  try {
    const usersCollection = await getUsersCollection();
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    return user;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
}

// Add new user
export async function addUser(userData) {
  try {
    const usersCollection = await getUsersCollection();
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    return { _id: result.insertedId, ...newUser };
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
}

// Update user
export async function updateUser(id, updates) {
  try {
    const usersCollection = await getUsersCollection();
    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      throw new Error('User not found');
    }

    return result.value;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Delete user
export async function deleteUser(id) {
  try {
    const usersCollection = await getUsersCollection();
    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      throw new Error('User not found');
    }

    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Verify user credentials (legacy, not used when routes directly use bcrypt)
export async function verifyUserCredentials(email, password) {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return null;
    }
    // Keep for backward compatibility: never compare plaintext
    return null;
  } catch (error) {
    console.error('Error verifying credentials:', error);
    throw error;
  }
}

// ==================== ORDER OPERATIONS ====================

// Get all orders
export async function getAllOrders() {
  try {
    const ordersCollection = await getOrdersCollection();
    const orders = await ordersCollection.find({}).toArray();
    return orders;
  } catch (error) {
    console.error('Error getting all orders:', error);
    throw error;
  }
}

// Get orders by user ID
export async function getOrdersByUserId(userId) {
  try {
    const ordersCollection = await getOrdersCollection();
    const orders = await ordersCollection
      .find({ userId: new ObjectId(userId) })
      .toArray();
    return orders;
  } catch (error) {
    console.error('Error getting orders by user ID:', error);
    throw error;
  }
}

// Create order
export async function createOrder(orderData) {
  try {
    const ordersCollection = await getOrdersCollection();
    const newOrder = {
      ...orderData,
      userId: new ObjectId(orderData.userId),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await ordersCollection.insertOne(newOrder);
    return { _id: result.insertedId, ...newOrder };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// Update order
export async function updateOrder(orderId, updates) {
  try {
    const ordersCollection = await getOrdersCollection();
    const result = await ordersCollection.findOneAndUpdate(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      throw new Error('Order not found');
    }

    return result.value;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

// Delete order
export async function deleteOrder(orderId) {
  try {
    const ordersCollection = await getOrdersCollection();
    const result = await ordersCollection.deleteOne({ _id: new ObjectId(orderId) });

    if (result.deletedCount === 0) {
      throw new Error('Order not found');
    }

    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}

// ==================== FOOD ITEMS OPERATIONS ====================

// Get all food items
export async function getAllFoodItems() {
  try {
    const foodItemsCollection = await getFoodItemsCollection();
    const items = await foodItemsCollection.find({}).toArray();
    return items;
  } catch (error) {
    console.error('Error getting all food items:', error);
    throw error;
  }
}

// Get food item by ID
export async function getFoodItemById(id) {
  try {
    const foodItemsCollection = await getFoodItemsCollection();
    const item = await foodItemsCollection.findOne({ _id: new ObjectId(id) });
    return item;
  } catch (error) {
    console.error('Error getting food item by ID:', error);
    throw error;
  }
}

// Add food item
export async function addFoodItem(itemData) {
  try {
    const foodItemsCollection = await getFoodItemsCollection();
    const newItem = {
      ...itemData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await foodItemsCollection.insertOne(newItem);
    return { _id: result.insertedId, ...newItem };
  } catch (error) {
    console.error('Error adding food item:', error);
    throw error;
  }
}

// Update food item
export async function updateFoodItem(id, updates) {
  try {
    const foodItemsCollection = await getFoodItemsCollection();
    const result = await foodItemsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      throw new Error('Food item not found');
    }

    return result.value;
  } catch (error) {
    console.error('Error updating food item:', error);
    throw error;
  }
}

// Delete food item
export async function deleteFoodItem(id) {
  try {
    const foodItemsCollection = await getFoodItemsCollection();
    const result = await foodItemsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      throw new Error('Food item not found');
    }

    return true;
  } catch (error) {
    console.error('Error deleting food item:', error);
    throw error;
  }
}

// ==================== UTILITY FUNCTIONS ====================

// Close database connection
export async function closeDatabase() {
  try {
    if (cachedClient) {
      await cachedClient.close();
      cachedClient = null;
      cachedDb = null;
      console.log('Disconnected from MongoDB');
    }
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
}

export default {
  // User operations
  getAllUsers,
  findUserByEmail,
  findUserById,
  addUser,
  updateUser,
  deleteUser,
  verifyUserCredentials,
  // Order operations
  getAllOrders,
  getOrdersByUserId,
  createOrder,
  updateOrder,
  deleteOrder,
  // Food items operations
  getAllFoodItems,
  getFoodItemById,
  addFoodItem,
  updateFoodItem,
  deleteFoodItem,
  // Utility
  closeDatabase,
};
