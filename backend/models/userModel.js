import tuple from '../db.js';

// Auto-create users table if it does not exist yet
export const initUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await tuple.query(query);
    console.log('✓ PostgreSQL "users" table initialized or verified.');
  } catch (error) {
    console.warn('Note: Could not verify/create "users" table in PostgreSQL:', error.message);
  }
};

export const createUser = async (uname, email, hpasswd) => {
  const result = await tuple.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
    [uname, email, hpasswd]
  );
  return result.rows[0]; 
};

export const findUserByEmail = async (email) => {
  const result = await tuple.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0]; 
};

export const getAllUsers = async () => {
  const result = await tuple.query('SELECT id, name, email, created_at FROM users ORDER BY created_at DESC');
  return result.rows;
};
