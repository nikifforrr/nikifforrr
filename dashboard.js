const input = document.querySelector(".filter")

input.addEventListener("input", (e)=>{
    const ids = document.querySelectorAll(".order>div:nth-child(1)")
    const orders = document.querySelectorAll(".order")
    const word = e.target.value.toLowerCase()

    for(let i=0; i<ids.length;i++){
        if(ids[i].innerText.toLowerCase().includes(word)){
            orders[i].style.display = "flex"
        }
        else{
            orders[i].style.display = "none"
        }
    }
})