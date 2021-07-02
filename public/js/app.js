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
let flag =1;
submitBtn.addEventListener('click',(event) => {
    event.preventDefault();//button ka default action jaise ki page refresh karna ya fi url ke andar hash value aana, usko prevent karega
    let comment = textarea.value;
    if(!comment){
        return;
    }
     flag =1;
    // agar comment hoga toh yha aa jayega
    postComment(comment);
});

function postComment(comment) {
    //apppend to the dom

    let data = {
        username:username,
        comment:comment
    }
    
    appendToDom(data,flag);
    textarea.value ='';
    
    //broadcast it for the socket
    broadcastComment(data);
    
    //sync with mongo DB
    syncWithDb(data);

}


function appendToDom(data,flag){
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
  if(flag===1){
    commentBox.prepend(lTag);// matlab comment post hua hai
  }else if(flag===0){
    commentBox.appendChild(lTag);// for loadmore btn
  }
 

}

function broadcastComment(data){
    // socket 
    socket.emit('comment',data);// #########222222222222

    
}
socket.on('comment',(data) => {//#########4444444
    appendToDom(data,flag);
})

//debounce function
let timerId = null;
function debounce(func,timer){

    if(timerId){
        clearTimeout(timerId);
    }
    timerId = setTimeout(()=>{
        func();
    },timer);
}

let typingDiv = document.querySelector('.typing');
socket.on('typing',(data)=>{
    typingDiv.innerText = `${data.username} is typing ...`;
    
    debounce(function(){
        typingDiv.innerText ='';  
    },1000);
})

textarea.addEventListener('keyup',(e)=>{
socket.emit('typing',{username});
})

// Api calls
function syncWithDb(data){

    const headers = {'Content-Type':'application/json'};
    fetch('/api/comments',{method:'Post',body:JSON.stringify(data),headers})
    .then(response=>{//console.log(response.json());
        response.json().then((result)=>{
            console.log(result);
        })
    })
}
//let flag2 = 1;
function fetchComments(){
fetch('/api/comments').then(res=>{
    
    res.json()// stream of data converted to json, will return a promise
    .then((result)=>{
        result.forEach((comment)=>{
            comment.time = comment.createdAt;
            flag =0;
            appendToDom(comment,flag);
        })
    })
})
}

const loadMore = document.querySelector('#loadMore');
loadMore.addEventListener('click',(e)=>{
    //flag2 = 0;
    fetchComments();
});

window.onload = fetchComments;