// server.js (Node.js with Express)
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();
console.log("SERVER info: \n", process.env.SERVER_GMAIL_ADDR);

// Email options mapping based on goalId
const goalPDFs = {
  0: { filename: "Lean Muscle Build.pdf", file: "Lean Muscle Build (3 days).pdf" },
  1: { filename: "Weight Loss.pdf", file: "Weight loss (3 days).pdf" },
  2: { filename: "Extreme Weight Loss.pdf", file: "Extreme Weight loss (3 days) .pdf" },
  3: { filename: "Lean Bulk (3 days).pdf", file: "Lean Bulk (3 days).pdf" },
};

// Set up nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SERVER_GMAIL_ADDR,
    pass: process.env.SERVER_GMAIL_PASS,
  },
});

// Email sending endpoint
app.post('/send-email/:goalId', (req, res) => {
  const { to, subject, message } = req.body;
  const goalId = isNaN(parseInt(req.params.goalId)) ? 0 : parseInt(req.params.goalId);

  if (!goalPDFs.hasOwnProperty(goalId)) {
    return res.status(400).json({ message: 'Invalid goal ID' });
  }

  const { filename, file } = goalPDFs[goalId];
  const filePath = path.join(".", 'src', 'assets', file);

  const mailOptions = {
    from: process.env.SERVER_GMAIL_ADDR,
    to,
    subject,
    text: message,
    attachments: [
      {
        filename,
        path: filePath,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('[Server] Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send email from backend', error });
    }
    console.log('Email sent: ' + info.response);
    return res.status(200).json({ message: 'Email sent successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
