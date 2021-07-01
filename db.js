

function dbConnect(){

    const mongoose = require('mongoose');
    const dotenv = require('dotenv')
    dotenv.config();// have to do this to use process.env  

//db CONNECTION
const dbURI = process.env.dbURI;
//console.log("------------",dbURI);
mongoose.connect(dbURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true
});

const connection = mongoose.connection;
connection.on('error',console.error.bind(console,'connection error:'));
connection.once('open',()=>{
    console.log('Database connected.....');
});
}


module.exports = dbConnect;
