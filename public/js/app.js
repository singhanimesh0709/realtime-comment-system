//client side jaavascript
let username;
let socket = io();
do {
 username = prompt('Enter your name');   
} while (!username);  
// now we cann  use that username to show on our site the users name
const textarea = document.querySelector('#textarea');
const submitBtn = document.querySelector('#submitBtn');
const commentBox = document.querySelector('.comment__box');

submitBtn.addEventListener('click',(event) => {
    event.preventDefault();//button ka default action jaise ki page refresh karna ya fi url ke andar hash value aana, usko prevent karega
    let comment = textarea.value;
    if(!comment){
        return;
    }
     
    // agar comment hoga toh yha aa jayega
    postComment(comment);
});

function postComment(comment) {
    //apppend to the dom

    let data = {
        username:username,
        comment:comment
    }

    appendToDom(data);
    textarea.value ='';
    
    //broadcast it for the socket
    broadcastComment(data);
    
    //sync with mongo DB
    

}


function appendToDom(data){
    let lTag = document.createElement('li');
    lTag.classList.add('comment','mb-3');
    let markup = `     <div class="card border-light mb-3 ">
                       <div class="card-body ">
                       <h6 class="font-weight-bold">${data.username}</h6>
                       <p>${data.comment}</p>
                       <div>
                       <img src="/images/clock.png" alt="clock">
                       <small class="mainebnaya">${moment(data.time).format('LT')}</small>
                       </div>
                       </div>
                       </div>
    
  `
  lTag.innerHTML = markup;
 commentBox.prepend(lTag);

}

function broadcastComment(data){
    // socket 
    socket.emit('comment',data);// #########222222222222

    
}
socket.on('comment',(data) => {//#########4444444
    appendToDom(data);
})