const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
require("./database/db");
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 5500;

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 20
}))

const People = require('./model/schema');
const route_file = require('./routes/route_file');
app.use(express.json());
app.use('/api', route_file);

if(process.env.NODE_ENV== 'production'){
    app.use(express.static("clients/build"));
}

app.listen(PORT, () => { console.log(`port is listening at port ${PORT}`) });