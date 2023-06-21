




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







const orderId = localStorage.getItem("order_id")
if(orderId){
  setTimeout(()=>{
    showLoadingSpinner()
    fetch(`https://cryptomix.onrender.com/api/completed-order/${orderId}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error fetching order');
      }
    })
    .then(order => {
      if (order.stage === 5) {
        // Stage is 2, do nothing
        console.log("Stage is 5, no action needed");
      } else {
        // Redirect to the appropriate page based on the stage
        window.location.href = `mix${order.stage}.html`;
      }
    })
    .catch(error => {
      console.error(error);
    }).finally(()=>{
      hideLoadingSpinner()
    })
  },5)
}

