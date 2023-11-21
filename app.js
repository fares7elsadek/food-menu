const express = require('express');
const dbConnect = require('./config/dbConnect');
const proudctRoute = require('./routes/Product');
const adminRoute = require('./routes/Admin');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const controllers = require('./controllers/Product');
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000

dbConnect();
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'data')));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', 'views');



app.get('/',controllers.getall);

app.use('/product',proudctRoute);
app.use('/admin',adminRoute);


app.all('*',(req,res)=>{
    res.render('error');
});
  
app.use((error,req,res,next)=>{
    res.render('error');
});

app.listen(PORT);