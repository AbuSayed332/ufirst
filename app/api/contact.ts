import dbConnect from '../lib/mongodb';
import mongoose from 'mongoose';

// Define the Contact Schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Prevent model recompilation error in serverless
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

/**
 * Standard Node.js handler compatible with Vercel and Netlify.
 */
export default async function handler(req: any, res: any) {
  // Support both Netlify (req.httpMethod) and Vercel (req.method)
  const method = req.method || (req as any).httpMethod;

  if (method !== 'POST') {
    return res.status ? res.status(405).json({ message: 'Method Not Allowed' }) : {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    await dbConnect();
    
    // Parse body (Vercel parses it automatically, Netlify event.body is a string)
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return res.status ? res.status(400).json({ message: 'Missing required fields' }) : {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }

    await Contact.create({ name, email, message });

    const successResponse = { message: 'Message sent successfully' };
    
    return res.status ? res.status(200).json(successResponse) : {
      statusCode: 200,
      body: JSON.stringify(successResponse)
    };
  } catch (error) {
    console.error('API Error:', error);
    const errorResponse = { message: 'Internal Server Error' };
    
    return res.status ? res.status(500).json(errorResponse) : {
      statusCode: 500,
      body: JSON.stringify(errorResponse)
    };
  }
}

// Export for Netlify compatibility specifically
export { handler };