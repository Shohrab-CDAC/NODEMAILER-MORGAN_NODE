const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser"); // Add bodyParser for parsing request body
const nodemailer = require("nodemailer"); // Add nodemailer for sending emails
const app = express();
const con = require("./config");

app.use(morgan('tiny'));
app.use(bodyParser.json()); // Use bodyParser for parsing JSON request body

// GET API
app.get("/", (req, resp) => {
    con.query("SELECT * FROM emp", (err, result) => {
        if (err) {
            resp.send("error in getting data from db");
        } else {
            resp.send(result);
        }
    });
});

// POST API
app.post("/", (req, resp) => {
    const data = {
        "Empno": "007",
        "Ename": "abx",
        "Sal": 99000,
        "City": "pimpri",
        "Dob": "1995-08-15"
    };
    con.query('INSERT INTO emp SET ?', data, (err, result) => {
        if (err) {
            resp.send("error in posting data into db");
        } else {
            resp.send(result);
        }
    });
});

// PUT API
app.put("/:EmpID", (req, resp) => {
    const data = ["ttt", 21000, "nimpri", "1996-08-25", req.params.EmpID];
    con.query('UPDATE emp SET Ename=?, Sal=?, City=?, Dob=? WHERE EmpID=?', data, (err, result) => {
        if (err) {
            resp.send("error in updating data into db");
        } else {
            resp.send(result);
        }
    });
});

// DELETE API
app.delete("/:EmpID", (req, resp) => {
    con.query('DELETE FROM emp WHERE EmpID =' + req.params.EmpID, (err, result) => {
        if (err) {
            resp.send("error in deleting data from db");
        } else {
            resp.send(result);
        }
    });
});

// NodeMailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'beingshohrab@gmail.com',
        pass: 'PASSWORD'
    }
});

// Example email sending endpoint
app.post("/email", (req, resp) => {
    const mailOptions = {
        from: 'beingshohrab@gmail.com',
        to: 'imabbas2019@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            resp.send("Error sending email: " + error);
        } else {
            resp.send("Email sent: " + info.response);
        }
    });
});

app.listen(5000, () => {
    console.log("server started at port 5000");
});
