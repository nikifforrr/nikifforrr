






const questions = document.querySelectorAll(".question")
const arrows = document.querySelectorAll(".question1 div img")
const expanditures = document.querySelectorAll(".question2")
const texts = document.querySelectorAll(".question1>div:nth-child(1)")
const header = document.querySelector("header")

let opened =-1

for(let i=0; i<questions.length; i++){
    questions[i].addEventListener("click", ()=>{
        if(opened>-1){
            arrows[i].src = "img/linearuparrow.svg"
            expanditures[i].style.display = "flex"
            texts[i].classList.add("colors")
            texts[i].style.fontWeight = "500"

            arrows[opened].src = "img/down-arrow.svg"
            expanditures[opened].style.display = "none"
            texts[opened].classList.remove("colors")

        }
        else{
            arrows[i].src = "img/linearuparrow.svg"
            expanditures[i].style.display = "flex"
            texts[i].classList.add("colors")
            texts[i].style.fontWeight = "700"
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
    if(isRobot){
        return
    }
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
    const userData = `https://mix.guru/chat.html?subject=${encodeURIComponent(subject)}&name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`;
    
    // Redirect the user to the completed URL
    window.location.href = userData;
    
  })


  const leftHome = document.querySelector(".leftHome")

  const rightHome = document.querySelector(".rightHome")

  window.addEventListener("load", ()=>{
    leftHome.style.opacity = "1"
    leftHome.style.transform = "translate(0)"
    rightHome.style.opacity = "1"
  })

  const gridItems = document.querySelectorAll(".grid-item")
  const works = document.querySelectorAll(".works")

  window.addEventListener("scroll", ()=>{
    const scrolled = window.scrollY

    if(scrolled>100){
        header.style.position = "fixed"
        header.style.background = "#020236"
    }
    else{
        header.style.position = "relative"
        header.style.background = "transparent"
        header.style.zIndex = "100"
    }

    if(scrolled>550){
        for(let i=0; i<3; i++){
            gridItems[i].style.opacity = "1"
            gridItems[i].style.transform = "translateY(0)"
        }
    }

    if(scrolled>700){
        for(let i=3; i<6; i++){
            gridItems[i].style.opacity = "1"
            gridItems[i].style.transform = "translateY(0)"
        }
    }

    if(scrolled>1350){
        for(let i=0; i<3; i++){
            works[i].style.opacity = "1"
            works[i].style.transform = "translate(0)"
        }
    }

    if(scrolled>1550){
        for(let i=3; i<5; i++){
            works[i].style.opacity = "1"
            works[i].style.transform = "translate(0)"
        }
    }

  })

  const mixBtns = document.querySelectorAll(".leftHome4>a")

  mixBtns[0].addEventListener("click", ()=>{
    localStorage.setItem("mix", 0)
  })

  mixBtns[1].addEventListener("click", ()=>{
    localStorage.setItem("mix", 1)
  })

  mixBtns[2].addEventListener("click", ()=>{
    localStorage.setItem("mix", 2)
  })

  const captcha = document.querySelector("#captcha")

  let isRobot = true

  captcha.addEventListener("click", (e)=>{
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6LcrgMcmAAAAAAtz9bolTFcbRd_DbaUCLTVcGnXW', {action: 'LOGIN'});
      isRobot = false
      // IMPORTANT: The 'token' that results from execute is an encrypted response sent by
      // reCAPTCHA Enterprise to the end user's browser.
      // This token must be validated by creating an assessment.
      // See https://cloud.google.com/recaptcha-enterprise/docs/create-assessment
    });
})
