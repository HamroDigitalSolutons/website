// backend/server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // optional: for email
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ urlencoded: true }));
app.use(express.static(path.join(__dirname, '../public')));


// Serve index.html on root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});



app.post('/submit-form', async (req, res) => {
    const { name, email, message } = req.body
    console.log(email)





    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hamrodigitalsolution@gmail.com',
            pass: 'akhi rgtc uyen sokq'
        }
    });

    const mailOptions = {
        from: 'hamrodigitalsolution@gmail.com',  // Your company email (sender)
        to: 'hamrodigitalsolution@gmail.com',    // Your company email (recipient)
        subject: `Contact Form Submission from ${name}`,
        text: `You have a new message from the contact form:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };


    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);

        // Send response only after mail is sent successfully
        res.sendFile(path.join(__dirname, '../public/thankyou.html'));
    });
});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
