const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.use(express.static('public'));

//db connection
  const dbConnect = require('./db');
  dbConnect();     
  const Comment = require('./models/comment');
  app.use(express.json());
  
  //routes
  app.post('/api/comments',(req,res)=>{
      const comment = new Comment({
          username: req.body.username,
          comment : req.body.comment
      });
      comment.save().then(response=>{
          res.send(response);
      });
  });
  let i =0;
  app.get('/api/comments',(req,res)=>{
      
      Comment.find().limit(5).skip(i).sort({_id:-1}).then(comments=>{
          i = i+5;
          res.send(comments);
      })
  });
  
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

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    })
})