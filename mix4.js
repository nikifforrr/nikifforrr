



const loadingSpinner = `
  <div class="loading-spinner-overlay">
    <div>
      <img id="loader" src="./img/loading.png">
      <div>Loading...</div>
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


const completed_order_id = localStorage.getItem("completed_order_id") || localStorage.getItem("order_id");

if (!completed_order_id) {
  showLoadingSpinner();
  console.log("No completed order ID found. Redirecting to mix.html");
  window.location.href = "./mix.html";
}

if (completed_order_id) {
  showLoadingSpinner();
  console.log("Fetching completed order details for completed_order_id:", completed_order_id);

  fetch(`https://cryptomix.onrender.com/api/completed-order/${completed_order_id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error fetching order');
      }
      return response.json();
    })
    .then((order) => {
      const createdAt = new Date(order.createdAt);
      const currentTime = new Date();
      const timeDifferenceInHours = Math.abs(currentTime - createdAt) / 36e5;
      console.log("Time difference in hours:", timeDifferenceInHours);

      if (timeDifferenceInHours > 7) {
        localStorage.removeItem("order_id");
        localStorage.removeItem("completed_order_id");
        alert("This order has expired");
        console.log("Order expired. Redirecting to mix.html");
        window.location.href = `./mix.html`;
      } else {
        if (order.stage === 5) {
          localStorage.removeItem("order_id");
          localStorage.setItem("completed_order_id", completed_order_id);
          console.log("Stage is 5, no action needed");
          console.log("Redirecting to mix5.html for completed_order_id:", completed_order_id);
          window.location.href = `mix${order.stage}.html`;
        } else {
          console.log("Redirecting to the appropriate page based on the stage for completed_order_id:", completed_order_id);
          window.location.href = `mix${order.stage}.html`;
        }
      }
    })
    .catch((error) => {
      console.error(error);
      console.log("Error fetching completed order details. Trying alternative fetch request for completed_order_id:", completed_order_id);

      showLoadingSpinner();
      setTimeout(() => {
        fetch(`https://cryptomix.onrender.com/api/orders/${completed_order_id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error fetching order');
            }
            return response.json();
          })
          .then((order) => {
            if (order.stage === 4) {
              console.log("Stage is 4, no action needed for completed_order_id:", completed_order_id);
            } else {
              localStorage.setItem("completed_order_id", completed_order_id);
              console.log("Redirecting to mix4.html for completed_order_id:", completed_order_id);
              window.location.href = `./mix${order.stage}.html`;
            }
          })
          .catch((error) => {
            console.error(error);
            alert("Oops, something went wrong. Please refresh this page");
          })
          .finally(() => {
            hideLoadingSpinner();
          });
      }, 1000);
    })
    .finally(() => {
      hideLoadingSpinner();
    });
}




const eventSource = new EventSource(`https://cryptomix.onrender.com/api/orders/sse/${completed_order_id}`);

// Event listener for SSE updates
eventSource.addEventListener("message", (event) => {
  const eventData = JSON.parse(event.data);
  if(eventData.stage === 5){
    localStorage.removeItem("order_id");
    localStorage.setItem("completed_order_id",completed_order_id)
    window.location.href = './mix5.html'
  }
});



const greenLoad = document.querySelector(".washAbs img")

let m=1

setInterval(()=>{
  greenLoad.style.transform = `rotate(${m*360}deg)`
  m++
},2000)
