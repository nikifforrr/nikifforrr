const burger = document.querySelector(".burger")
const menu = document.querySelector(".mobile-menu")
const img = document.querySelector(".burger img")

let openedd = false

burger.addEventListener("click", ()=>{
    if(!openedd){
        menu.style.display = "flex"
        img.src = "img/menux.svg"
        openedd=true
    }
    else{
        menu.style.display = "none"
        img.src = "img/burger.svg"
        openedd = false
    }
})