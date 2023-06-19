






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

