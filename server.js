const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route for handling GET requests at root
app.get('/', (req, res) => {
    res.send('Welcome to the Reservation System!'); // แสดงข้อความต้อนรับ
});

// Route for handling reservations
app.post('/reserve', (req, res) => {
    const { name, email, phone, table } = req.body;

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // หรือบริการอีเมลที่คุณต้องการ
        auth: {
            user: 'Capoongt87@gmail.com', // ใส่อีเมลของคุณ
            pass: 'wjjv lpyu kekg zbsv' // ใส่รหัสผ่านของอีเมล
        }
    });
    
    // Email options
    const mailOptions = {
        from: 'Capoongt87@gmail.com',
        to: email,
        subject: 'Reservation Confirmation',
        text: `Dear ${name},\n\nYour reservation for table ${table} has been confirmed!\n\nThank you!`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error); // เพิ่มบรรทัดนี้
            return res.status(500).json({ message: 'Error sending email' });
        }
        res.status(200).json({ message: 'Reservation confirmed and email sent!' });
    });
    
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
