require('dotenv').config();
const express = require('express');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');


const app = express();
const PORT = process.env.PORT;

app.set('views' , './views');
app.set('view engine' , 'ejs');


app.use('/blog' , blogRouter);
app.use('/user' , userRouter);



app.get('/' , (req , res) => {
    res.render('index');
})



app.listen(PORT, () => {
    console.log(`app has started on ${PORT}`);
})