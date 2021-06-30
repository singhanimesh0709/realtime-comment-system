const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.use(express.static('public'));



const server = app.listen(port, ()=>{
    console.log(`listening on port: ${port}`);
});

const io = require('socket.io')(server);

io.on('connection',(socket) =>{ //#######11111  //connection i s the event, and socket is current socket that connected.
    console.log(`New connection : ${socket.id}`); // socket har ek ko unique id deta hai,
    // but ye toh bas server side hua ye tab tak kaam nhi karega jab tak hum, client side ise set up nhi karte. yaani client side iski library ko import karna hoga.

    socket.on('comment',(data)=>{//############3333333
        data.time = Date();
        socket.broadcast.emit('comment',data);
    })
})