import tuple from '../db.js';

<<<<<<< HEAD
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
=======
export const createUser = async (uname, email, hpasswd) => {
  const result = await tuple.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', //checking eith the 3 parameters in input
>>>>>>> 9299a117d0da3aefd2e2f21440ca01a6cb3ce22b
    [uname, email, hpasswd]
  );
  return result.rows[0]; 
};

export const findUserByEmail = async (email) => {
<<<<<<< HEAD
  const result = await tuple.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0]; 
};

export const getAllUsers = async () => {
  const result = await tuple.query('SELECT id, name, email, created_at FROM users ORDER BY created_at DESC');
  return result.rows;
};
=======
  const result = await tuple.query('SELECT * FROM users WHERE email = $1', [email]); //checking with the first parametetr
  return result.rows[0]; 
};
>>>>>>> 9299a117d0da3aefd2e2f21440ca01a6cb3ce22b
