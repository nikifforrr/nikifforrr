





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




const howMuch = document.querySelector(".transfer span")

const idInput = document.querySelector(".idInput")
const urlInput = document.querySelector(".urlInput")
const addressInput = document.querySelector(".transferAddress")


const orderId = localStorage.getItem("order_id");
async function checkOrderStage() {
  showLoadingSpinner()
setTimeout(async () => {
  try {
    if(!orderId){
      window.location.href = "./mix.html"
    }
    const response = await fetch(`https://cryptomix.onrender.com/api/orders/${orderId}`);
    if (!response.ok) {
      throw new Error('Error fetching order');
    }
    const order = await response.json();

    if (order.stage === 3) {
      console.log("Stage is 3, no action needed");
    } else {
      window.location.href = `./mix${order.stage}.html`;
    }

    idInput.value = orderId;
    urlInput.value = `https://mix.guru/mix.html?order_id=${order._id}`; // need to change 
    addressInput.value = order.receive_wallet_address;
    howMuch.innerText = `${order.amount} ${order.currency}`

    const letterBtn = document.querySelector(".letterBtnDiv a");
    const file = 'LetterOfGuarantee.json';
    const letter = JSON.stringify(order, null, 2);

    function createJSONFile(jsonData, fileName) {
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      letterBtn.href = url;
      letterBtn.download = fileName;
    }

    createJSONFile(letter, file);

  } catch (error) {
    console.error('Error:', error);
  }finally {
    hideLoadingSpinner()
  }
}, 200);

}

checkOrderStage();

setInterval(async function(){
  const response = await fetch(`https://cryptomix.onrender.com/api/orders/${orderId}`);
  const order = await response.json();
  console.log("yes")
  if(order.stage==4){
    checkOrderStage()
  }
},5000)

const copyBtns = document.querySelectorAll(".copy")

copyBtns[0].addEventListener("click", ()=>{
    navigator.clipboard.writeText(urlInput.value)
})

copyBtns[1].addEventListener("click", ()=>{
    navigator.clipboard.writeText(idInput.value)
})

copyBtns[2].addEventListener("click", ()=>{
    navigator.clipboard.writeText(addressInput.value)
})

const spinner = document.querySelector("#thisImg")

let m=1

setInterval(()=>{
  spinner.style.transform = `rotate(${m*360}deg)`
  m++
},2000)


