require('dotenv').config({ path: '.env' });
const express= require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter')
const noteRouter = require('./routes/noteRouter')
const path = require('path') //this code for heroku upload

const app = express();
app.use(express.json());
app.use(cors())


//All Routes
app.use('/users', userRouter)
app.use('/api/notes', noteRouter)


// Mongodb connection
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex:true,
    useFindAndModify: false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}, err=>{
    if(err) throw err;
    console.log('Connected to MongoDB');
})

// Work Process for log in
// 1. create => a router.post('/login', userCtrl.loginUser) in userRouter and this userCtrl.loginUser will find controller folder
// 2. then create=>  auth in middleware
// 3. then create =>  router.get('/verify', userCtrl.verifiedToken)  in userRouter and this userCtrl.verifiedToken will find controller folder
// 4. all the things in routes folder use=> server.js file as app.use('/routes main path', routes name)


//this code for heroku upload
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


// Lister Server
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
