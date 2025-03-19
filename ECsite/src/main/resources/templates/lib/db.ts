import mysql from "mysql2/promise"

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function executeQuery<T>({ query, values }: { query: string; values?: any[] }): Promise<T> {
  try {
    const [rows] = await pool.execute(query, values)
    return rows as T
  } catch (error) {
    console.error("Database query error:", error)
    throw new Error("Database query failed")
  }
}

// Database initialization function
export async function initializeDatabase() {
  try {
    // Create products table
    await executeQuery({
      query: `
        CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(36) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price DECIMAL(10, 2) NOT NULL,
          image VARCHAR(255),
          category VARCHAR(50),
          inventory INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
    })

    // Create orders table
    await executeQuery({
      query: `
        CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(36) PRIMARY KEY,
          customer_email VARCHAR(255) NOT NULL,
          customer_name VARCHAR(255),
          total_amount DECIMAL(10, 2) NOT NULL,
          status VARCHAR(50) NOT NULL,
          stripe_payment_intent_id VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `,
    })

    // Create order_items table
    await executeQuery({
      query: `
        CREATE TABLE IF NOT EXISTS order_items (
          id VARCHAR(36) PRIMARY KEY,
          order_id VARCHAR(36) NOT NULL,
          product_id VARCHAR(36) NOT NULL,
          quantity INT NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          FOREIGN KEY (order_id) REFERENCES orders(id),
          FOREIGN KEY (product_id) REFERENCES products(id)
        )
      `,
    })

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Database initialization error:", error)
    throw new Error("Failed to initialize database")
  }
}

