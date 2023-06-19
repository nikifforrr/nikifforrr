const howMuch = document.querySelector(".transfer span")

const idInput = document.querySelector(".idInput")
const urlInput = document.querySelector(".urlInput")
const addressInput = document.querySelector(".transferAddress")



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

howMuch.innerText = `${localStorage.getItem("amount")} ${localStorage.getItem("Currency")}`

let addressesNumber = localStorage.getItem("Number of Addresses")


async function fetchOrderData() {
  try {
    let order_id = localStorage.getItem("order_id");
    const response = await fetch('https://cryptomix.onrender.com/api/orders/' + order_id);
    const data = await response.json();
    let letter = JSON.stringify(data, null, 2);
    idInput.value = order_id;
    urlInput.value = "website url" + "/" + data._id;
    addressInput.value = data.receive_wallet_address;

    const letterBtn = document.querySelector(".letterBtnDiv a");
    const file = 'data.json';
    if(data.stage === 4){
      window.location.href = "mix4.html"
    }
    function createJSONFile(jsonData, fileName) {
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      letterBtn.href = url;
      letterBtn.download = fileName;
    }

    createJSONFile(letter, file);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchOrderData();


