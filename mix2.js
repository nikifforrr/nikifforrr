const orderId = localStorage.getItem("order_id")
setTimeout(()=>{
  fetch(`https://cryptomix.onrender.com/api/orders/${orderId}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error fetching order');
    }
  })
  .then(order => {
    if (order.stage === 2) {
      // Stage is 2, do nothing
      console.log("Stage is 2, no action needed");
    } else {
      // Redirect to the appropriate page based on the stage
      window.location.href = `mix${order.stage}.html`;
    }
  })
  .catch(error => {
    console.error(error);
  });
},5)



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
    fetch(`https://cryptomix.onrender.com/api/orders/approve/${orderId}`, {
      method: 'PUT',
    })
      .then(response => {
        if (response.ok) {
          window.location.href = `mix3.html`;
          return response.json();
        } else {
          throw new Error('Error fetching order');
        }
      })
      .catch(error => {
        console.error(error);
      });
    
})