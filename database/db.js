const dotenv= require('dotenv');
const mongoose= require('mongoose');

dotenv.config({path: './config.env'});
const DB = process.env.MONGO_URL

mongoose.connect(DB ,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>{console.log('cloud database connected')})
.catch((e)=>{console.log('error in connection')})


// localhost connection....

// mongoose.connect('mongodb://localhost:127.0.0.1/my_databse', {
//     useCreateIndex:true,
//     useNewUrlParser:true,
//     useFindAndModify:false,
//     useUnifiedTopology:true
// }).then(()=>{console.log('connected db')})
// .catch((e) =>{console.log('msg:e')})