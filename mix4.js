




const loadingSpinner = `
  <div class="loading-spinner-overlay">
    <div class="loading-spinner"></div>
  </div>
`;



function showLoadingSpinner() {
  const spinnerElement = document.createElement('div');
  spinnerElement.innerHTML = loadingSpinner;

  const overlayElement = document.createElement('div');
  overlayElement.classList.add('loading-overlay');

  document.body.appendChild(overlayElement);
  document.body.appendChild(spinnerElement);
  document.body.style.overflow = 'hidden';
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







const completed_order_id = localStorage.getItem("completed_order_id") || localStorage.getItem("order_id")

if(!completed_order_id){
  showLoadingSpinner();
  window.location.href = "./mix.html"
}
if(completed_order_id){
  showLoadingSpinner();
  fetch(`https://cryptomix.onrender.com/api/completed-order/${completed_order_id}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error fetching order');
    }
  })
  .then((order) => {
    const createdAt = new Date(order.createdAt);
    const currentTime = new Date();
    const timeDifferenceInHours = Math.abs(currentTime - createdAt) / 36e5;
    console.log(timeDifferenceInHours)
    if (timeDifferenceInHours > 7) {
      localStorage.removeItem("order_id");
      localStorage.removeItem("completed_order_id");
      alert("This order has expired");
      window.location.href = `./mix.html`;
    } else {
      if (order.stage === 5) {
        localStorage.removeItem("order_id");
        localStorage.setItem("completed_order_id",completed_order_id)
        window.location.href = `mix${order.stage}.html`;
        console.log("Stage is 5, no action needed");
      } else {
        // Redirect to the appropriate page based on the stage
        window.location.href = `mix${order.stage}.html`;
      }
    } 
  })
  .catch((error) => {
    console.error(error);
    // Handle the error and try an alternative fetch request
    fetch(`https://cryptomix.onrender.com/api/orders/${completed_order_id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching order');
        }
      })
      .then((order) => {
        if (order.stage === 4) {
          console.log("Stage is 4, no action needed");
        } else {
          localStorage.setItem("completed_order_id",completed_order_id);
          window.location.href = `./mix${order.stage}.html`;
        }
      })
      .catch((error) => {
        console.error(error);
      })
  })
  .finally(() => {
    hideLoadingSpinner();
  });

}else {
  const order_id = localStorage.getItem("order_id")
  if(order_id){
      showLoadingSpinner()
      fetch(`https://cryptomix.onrender.com/api/orders/${order_id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching order');
        }
      })
      .then(order => {
        if (order.stage === 4) {
          console.log("Stage is 4, no action needed");
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
  }
}

const orderId = localStorage.getItem("order_id");


setInterval(async function(){
  const response = fetch(`https://cryptomix.onrender.com/api/completed-order/${completed_order_id}`)
  const order = await response.json();
  console.log("yes")
  if(order.stage==5){
    checkOrderStage()
  }
},5000)
