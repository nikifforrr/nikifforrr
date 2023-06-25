




const loadingSpinner = `
  <div class="loading-spinner-overlay">
    <div>
      <img id="loader" src="./img/spinner.svg">
    </div>
  </div>
`;


let s = 1



function showLoadingSpinner() {
  const spinnerElement = document.createElement('div');
  spinnerElement.innerHTML = loadingSpinner;

  const overlayElement = document.createElement('div');
  overlayElement.classList.add('loading-overlay');

  document.body.appendChild(overlayElement);
  document.body.appendChild(spinnerElement);
  document.body.style.overflow = 'hidden';

  setTimeout(()=>{
    const loader = document.querySelector("#loader")

  s=1

  loader.style.transform = `rotate(${360}deg)`
  s++


  setInterval(() => {
    loader.style.transform = `rotate(${s*360}deg)`
    s++
  }, 2000)
  },10)

  
}

function hideLoadingSpinner() {
  const spinnerElement = document.querySelector('.loading-spinner-overlay');
  const overlayElement = document.querySelector('.loading-overlay');
  if (spinnerElement && overlayElement) {
    spinnerElement.parentNode.removeChild(spinnerElement);
    overlayElement.parentNode.removeChild(overlayElement);
    document.body.style.overflow = 'auto';
  }
}






const orderId = localStorage.getItem("order_id")

if(!orderId){
  window.location.href = "./mix.html"
}

if(orderId){
  setTimeout(()=>{
    showLoadingSpinner()
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
        window.location.href = `./mix${order.stage}.html`;
      }
    })
    .catch(error => {
      console.error(error);
    }).finally(()=>{
      hideLoadingSpinner()
    })
  },5)
}



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
    showLoadingSpinner()
    fetch(`https://cryptomix.onrender.com/api/orders/approve/${orderId}`, {
      method: 'PUT',
    })
      .then(response => {
        if (response.ok) {
          window.location.href = `./mix3.html`;
          return response.json();
        } else {
          throw new Error('Error fetching order');
        }
      })
      .catch(error => {
        console.error(error);
      }).finally(()=>{
        hideLoadingSpinner()
      })
    
})
