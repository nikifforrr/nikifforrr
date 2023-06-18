const checkboxes = document.querySelectorAll(".checkbox")
const checks = document.querySelectorAll(".check")

let isChecked = [false, false, false, false]

for(let i=0; i<checkboxes.length; i++){
    checkboxes[i].addEventListener("click", ()=>{
        if(!isChecked[i]){
            checks[i].style.display = "block"
            isChecked[i] = true
        }
        else{
            checks[i].style.display = "none"
            isChecked[i] = false
        }
    })
}


const batoni = document.querySelector(".button-div button")

batoni.addEventListener("click", ()=>{
    for(let i=0; i<4; i++){
        if(!isChecked[i]){
            alert("Please check all the boxes")
            return
        }
    }

    window.location.href = "mix3.html"
})