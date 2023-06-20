






const questions = document.querySelectorAll(".question")
const arrows = document.querySelectorAll(".question1 div img")
const expanditures = document.querySelectorAll(".question2")
const texts = document.querySelectorAll(".question1>div:nth-child(1)")

let opened =-1

for(let i=0; i<questions.length; i++){
    questions[i].addEventListener("click", ()=>{
        if(opened>-1){
            arrows[i].src = "img/linearuparrow.svg"
            expanditures[i].style.display = "flex"
            texts[i].classList.add("colors")

            arrows[opened].src = "img/down-arrow.svg"
            expanditures[opened].style.display = "none"
            texts[opened].classList.remove("colors")

        }
        else{
            arrows[i].src = "img/linearuparrow.svg"
            expanditures[i].style.display = "flex"
            texts[i].classList.add("colors")
        }

        if(opened==i){
            opened=-1
            return
        }

        opened=i

    })
}

const selector = document.querySelector(".contact-selector-div")
const options = document.querySelector(".contact-options")
const option = document.querySelectorAll(".contact-option")
const selected = document.querySelector(".contact-selected")

let isIt = false

selector.addEventListener("click", ()=>{
    if(!isIt){
        options.style.display="flex"
        isIt=true
    }
    else{
        isIt=false
        options.style.display = "none"
    }
})

for(let i=0; i<option.length; i++){
    option[i].addEventListener("click", ()=>{
        selected.innerText = option[i].innerText
    })
}

const fileInput = document.querySelector("#fileInput")
const fileName = document.querySelector(".letterName")

fileInput.addEventListener("input", ()=>{
    fileName.value=fileInput.files[0].name
})


const nameInput = document.querySelector(".nameInput")
const generateBtn = document.querySelector(".name-generate")

const names = ["Luna", "Aiden", "Scarlett", "Leo", "Jacob", "Colton", "Jade", "Tyler", "Sierra", "Smith"]

generateBtn.addEventListener("click", ()=>{
    nameInput.value = names[Math.floor(Math.random()*10)]
})

const openChat = document.querySelector("#chat")

console.log(openChat)


// Print the retrieved values

openChat.addEventListener("click",(e)=>{
    // Get the input values
    const subjectSelect = document.querySelector('.contact-selected');
    const letterNameInput = document.querySelector('.letterName');
    const messageTextarea = document.querySelector('textarea');
    
    // Get the file input and selected file name
    const selectedFileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';
    
    // Retrieve the values
    const subject = subjectSelect.textContent;
    const name = nameInput.value;
    const letterName = letterNameInput.value;
    const message = messageTextarea.value;
    console.log('Subject:', subject);
    console.log('Name:', name);
    console.log('Letter Name:', letterName);
    console.log('Message:', message);
    
    // Complete the URL with the input values
    const userData = `http://127.0.0.1:5500/chat.html?subject=${encodeURIComponent(subject)}&name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`;
    
    // Redirect the user to the completed URL
    window.location.href = userData;
    
  })