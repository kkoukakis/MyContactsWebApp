const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
 
const uri = process.env.DB_URI;

try {
    mongoose.connect(uri , {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
} catch (error) {
    console.error(`Error:  ${error}`);
}

const connection = mongoose.connection;
connection.once(`open`, () => {
    console.log(`Connected to the database.`);
});
 
const contactsRouter = require('./routes/contacts');
app.use('/contacts', contactsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});