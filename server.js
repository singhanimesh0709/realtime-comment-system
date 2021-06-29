const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.use(express.static('public'));



const server = app.listen(port, ()=>{
    console.log(`listening on port: ${port}`);
});

const io = require('socket.io')(server);

io.on('connection',(socket) =>{
    console.log(`New connection : ${socket.id}`)
})