const express =require('express');
require('dotenv').config();
const  bodyParser = require('body-parser');
const connect =require('./config/db');
const router =require('./routes/userRoutes');
const app =express();

// connect mongodb database
connect();

app.use(bodyParser.json());
app.use('/',router);




const PORT =process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('Your app is running');
});