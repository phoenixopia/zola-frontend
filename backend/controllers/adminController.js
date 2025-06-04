// controllers/adminController.js
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const existingAdmin = await Admin.findOne(); // Get the only admin (if any)

    let admin;

    if (!existingAdmin) {
      // No admin exists – create one with the provided email/password
      const hashedPassword = await bcrypt.hash(password, 10);
      admin = await Admin.create({ email, password: hashedPassword });
    } else {
      // Admin exists – only allow login with that admin's email
      if (email !== existingAdmin.email) {
        return res.status(403).json({ message: 'Unauthorized: Only the initial admin is allowed' });
      }

      const isMatch = await bcrypt.compare(password, existingAdmin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      admin = existingAdmin; // reuse the found admin
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
