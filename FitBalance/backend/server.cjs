// server.js (Node.js with Express)
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();
const port = 5000;

// Middleware
// app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for frontend requests
app.use(bodyParser.json()); // Parse JSON request bodies

require('dotenv').config()
console.log("SERVER info: \n", process.env.SERVER_GMAIL_ADDR);

// Setup Nodemailer transport (for sending emails via Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'hotmail' or 'smtp.gmail.com'
  auth: {
    user: process.env.SERVER_GMAIL_ADDR, // Your email address
    pass: process.env.SERVER_GMAIL_PASS, // Your email password or App Password if using 2FA
  },
});

// Email sending endpoint
app.post('/send-email', (req, res) => {
  const { to, subject, message } = req.body;
  console.log("Sending email to:");
  console.log(to);
  const filePath = "./src/assets/Lean Bulk (3 days).pdf"; // Path to the file you want to send

  const mailOptions = {
    from: process.env.SERVER_GMAIL_ADDR,
    to: to,
    subject: subject,
    text: message,
    attachments: [
      {
        filename: 'Lean Bulk (3 days).pdf', // The name of the file in the email
        path: filePath, // Path to the file you want to send
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send email from backend' });
    }
    console.log('Email sent: ' + info.response);
    return res.status(200).json({ message: 'Email sent successfully!' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
