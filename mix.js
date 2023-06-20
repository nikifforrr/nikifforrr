



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













const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('order_id');



if(orderId){
  processOrder(orderId)
function processOrder(order_id) {
      const isValidIdFormat = /^[0-9a-fA-F]{24}$/.test(order_id);
      if (!isValidIdFormat) {
        const errorMessage = 'Invalid Order ID format';
        const errorUrl = `http://127.0.0.1:5500/error-order.html?error=${encodeURIComponent(errorMessage)}`;
        window.location.href = errorUrl;
      } else {
        showLoadingSpinner()
        // Send a request to the server to fetch the order based on the ID
        fetch(`https://cryptomix.onrender.com/api/orders/${order_id}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              response.json().then((message)=>{
                const errorUrl = `http://127.0.0.1:5500/error-order.html?error=${message.error}`;
                window.location.href = errorUrl;
              })
            }
          })
          .then(order => {
            localStorage.setItem("order_id",order._id) 
            console.log(order)
            window.location.href = `mix${order.stage}.html`
          })
          .catch(error => {
            const errorUrl = `http://127.0.0.1:5500/error-order.html?error=${error}`;
            window.location.href = errorUrl;
          }).finally(()=>{
            hideLoadingSpinner()
          })
      }
    }
}else {
        
    const waitingListId = urlParams.get('waiting_list_id');
    if(waitingListId){
      processWaitingList(waitingListId);
    
      function processWaitingList(waiting_list_id) {
        const isValidIdFormat = /^[0-9a-fA-F]{24}$/.test(waiting_list_id);
        if (!isValidIdFormat) {
          const errorMessage = 'Invalid Waiting List ID format';
          const errorUrl = `http://127.0.0.1:5500/error-waiting-list.html?error=${encodeURIComponent(errorMessage)}`;
          window.location.href = errorUrl;
        } else {
          // Send a request to the server to fetch the waiting list based on the ID
          showLoadingSpinner()
          fetch(`https://cryptomix.onrender.com/api/orders/waiting/${waiting_list_id}`)
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                response.json().then((message)=>{
                  const errorUrl = `http://127.0.0.1:5500/error-waiting-list.html?error=${message.error}`;
                  window.location.href = errorUrl;
                })
              }
            })
            .then(waitingList => {
              localStorage.setItem("order_id", waitingList._id);
              window.location.href = `mix${waitingList.stage}.html`
            })
            .catch(error => {
              const errorUrl = `http://127.0.0.1:5500/error-waiting-list.html?error=${error}`;
              window.location.href = errorUrl;
            }).finally(()=>{
              hideLoadingSpinner()
            })
        }
      }
    }
}










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
        // Redirect to the appropriate page based on the stage
        window.location.href = `mix${order.stage}.html`;
    })
    .catch(error => {
      console.error(error);
    }).finally(()=>{
      hideLoadingSpinner()
    })
}else{


  const waiting_list_id = localStorage.getItem("waiting_list_id")
  if(waiting_list_id){
      showLoadingSpinner()
      fetch(`https://cryptomix.onrender.com/api/orders/${waiting_list_id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching order');
        }
      })
      .then(order => {
          // Redirect to the appropriate page based on the stage
          localStorage.removeItem("waiting_list_id");
          localStorage.setItem("order_id",order._id)
          window.location.href = `mix${order.stage}.html`;
      })
      .catch(error => {
        console.error(error);
      }).finally(()=>{
        hideLoadingSpinner()
      })
  }
  
}











    










const selectedImg = document.querySelector(".selector>img:nth-child(1)")
const selectedName = document.querySelector(".selector>div:nth-child(2)")

let selectedCurrency = "Ethereum";




const selector = document.querySelector(".selector")

const options = document.querySelectorAll(".option")

const dropdown = document.querySelector(".options")

const x = document.querySelector(".xcircle")

const bounds = document.querySelector(".bounds")

let opened = false

let isOrderCreated = false

selector.addEventListener("click", () => {
    if (opened) {
        opened = false
        dropdown.style.display = "none"
        return
    }
    dropdown.style.display = "flex"
    opened = true
})

x.addEventListener("click", () => {
    dropdown.style.display = "none"
})

options[0].addEventListener("click", () => {
    selectedImg.src = "img/btc.svg"
    selectedName.innerText = "BTC"
    setSelectedCurrency("Bitcoin");
    bounds.innerText = "You can mix between 0.00076 and 35 BTC"
})

options[1].addEventListener("click", () => {
    selectedImg.src = "img/ether.svg"
    selectedName.innerText = "ETH"
    setSelectedCurrency("Ethereum");
    bounds.innerText = "You can mix between 0.015 and 500 ETH"
})

options[2].addEventListener("click", () => {
    selectedImg.src = "img/tether.svg"
    selectedName.innerText = "TETHER"
    setSelectedCurrency("Tether");
    bounds.innerText = "You can mix between 20 and 1000000 TETHER"
})

options[3].addEventListener("click", () => {
    selectedImg.src = "img/usdc.svg"
    selectedName.innerText = "USDC"
    setSelectedCurrency("USD Coin (Ethereum)");
    bounds.innerText = "You can mix between 20 and 1000000 USD Coin"
})






const addressInner = `
<div>
    <div class="transfer-delay">2h 0min</div>

    <div class="amount-distribution">100%</div>
</div>

<input type="text" name="address" class="addressInput" placeholder="Receiving...">

<div class="bin">
    <img src="img/bin.svg">
</div>
`

let addressesNumber = 1

const addressesDiv = document.querySelector(".addresses")

const addAddressBtn = document.querySelector(".add-button")

const firstSlider = document.querySelector(".sliders-div>div:nth-child(1)")

const sliderDots = document.querySelectorAll(".sliderdot")

const sliderDots2 = document.querySelectorAll(".sliderdot2")

let bins

function percentages() {
    const percentages = document.querySelectorAll(".amount-distribution")
    for (let i = 0; i < percentages.length; i++) {
        percentages[i].innerText = `${Math.floor(100 / addressesNumber)}%`
    }
}

function disperseDots() {
    if (addressesNumber == 2) {
        for (let i = 0; i < sliderDots.length; i++) {
            sliderDots[i].style.display = "none"
        }
        for (let i = 0; i < 2 - 1; i++) {
            sliderDots[i].style.display = "block"
        }
        sliderDots[0].style.left = `${0.5 * slider2Width}px`
    }

    if (addressesNumber == 3) {
        for (let i = 0; i < sliderDots.length; i++) {
            sliderDots[i].style.display = "none"
        }
        for (let i = 0; i < 3 - 1; i++) {
            sliderDots[i].style.display = "block"
        }
        sliderDots[0].style.left = `${0.33 * slider2Width}px`
        sliderDots[1].style.left = `${0.77 * slider2Width}px`

    }

    if (addressesNumber == 4) {
        for (let i = 0; i < sliderDots.length; i++) {
            sliderDots[i].style.display = "none"
        }
        for (let i = 0; i < 4 - 1; i++) {
            sliderDots[i].style.display = "block"
        }
        sliderDots[0].style.left = `${0.25 * slider2Width}px`
        sliderDots[1].style.left = `${0.5 * slider2Width}px`
        sliderDots[2].style.left = `${0.75 * slider2Width}px`
    }

    if (addressesNumber == 5) {
        for (let i = 0; i < sliderDots.length; i++) {
            sliderDots[i].style.display = "none"
        }
        for (let i = 0; i < 5 - 1; i++) {
            sliderDots[i].style.display = "block"
        }
        sliderDots[0].style.left = `${0.2 * slider2Width}px`
        sliderDots[1].style.left = `${0.4 * slider2Width}px`
        sliderDots[2].style.left = `${0.6 * slider2Width}px`
        sliderDots[3].style.left = `${0.8 * slider2Width}px`
    }
}






function secondDots() {
    if (addressesNumber == 1) {
        sliderDots2[0].style.display = "block"
    }
    if (addressesNumber == 2) {
        for (let i = 0; i < sliderDots.length; i++) {
            sliderDots2[i].style.display = "none"
        }
        for (let i = 0; i < 2; i++) {
            sliderDots2[i].style.display = "block"
        }
    }

    if (addressesNumber == 3) {
        for (let i = 0; i < sliderDots.length; i++) {
            sliderDots2[i].style.display = "none"
        }
        for (let i = 0; i < 3; i++) {
            sliderDots2[i].style.display = "block"
        }
    }

    if (addressesNumber == 4) {
        for (let i = 0; i < sliderDots.length; i++) {
            sliderDots2[i].style.display = "none"
        }
        for (let i = 0; i < 4; i++) {
            sliderDots2[i].style.display = "block"
        }
    }

    if (addressesNumber == 5) {
        for (let i = 0; i < sliderDots.length; i++) {
            sliderDots2[i].style.display = "none"
        }
        for (let i = 0; i < 5; i++) {
            sliderDots2[i].style.display = "block"
        }
    }
}

function addAddress() {

    addressesNumber += 1
    if (addressesNumber > 1) {
        firstSlider.style.display = "flex"
    }

    disperseDots()

    secondDots()

    let newAddress = document.createElement("div")
    newAddress.classList.add("address")
    newAddress.innerHTML = addressInner
    addressesDiv.appendChild(newAddress)

    percentages()

    if (addressesNumber == 5) {
        addAddressBtn.style.display = "none"
    }

    const addresses = document.querySelectorAll(".address")
    delays = document.querySelectorAll(".transfer-delay")
    distributions = document.querySelectorAll(".amount-distribution")

    bins = document.querySelectorAll(".bin")

    for (let i = 0; i < bins.length; i++) {
        bins[i].addEventListener("click", () => {
            addressesDiv.removeChild(addresses[i + 1])
            addressesNumber -= 1
            disperseDots()
            secondDots()
            if (addressesNumber < 2) {
                firstSlider.style.display = "none"
            }
            if (addressesNumber < 5) {
                addAddressBtn.style.display = "flex"
            }
            percentages()
        })
    }
}

secondDots()

addAddressBtn.addEventListener("click", addAddress)


let clientX = 0
let touch=0
let isClicked = [false, false, false, false, false]

let bitenI = 0

const sliderLine = document.querySelectorAll(".slider")


let slider2Width = parseInt(sliderLine[1].offsetWidth)

window.addEventListener("resize", ()=>{
    let slider2Width = parseInt(sliderLine[1].offsetWidth)
    console.log(slider2Width)
})

let maxMinutes = 4320

let delays = document.querySelectorAll(".transfer-delay")
let distributions = document.querySelectorAll(".amount-distribution")


function getMouseLoc(event) {
    clientX = event.clientX
    isClicked = true
}
function getMouseLocTouch(event) {
    touch = event.touches[0].clientX
    isClicked = true
}

for (let i = 0; i < sliderDots2.length; i++) {
    sliderDots2[i].style.left = "1px"
}




for (let i = 0; i < sliderDots2.length; i++) {
    sliderDots2[i].addEventListener("touchstart", (event) => {
        touch = event.touches[0].clientX
        isClicked[i] = true
        let currLeft = parseInt(sliderDots2[i].style.left)

        window.addEventListener("touchmove", (event) => {
            if (isClicked[i]) {
                let newtouch = event.touches[0].clientX
                if ((newtouch - touch + currLeft) > 0 && (newtouch - touch + currLeft) < slider2Width) {
                    sliderDots2[i].style.left = `${newtouch - touch + currLeft}px`
                    let percent = (newtouch - touch + currLeft) / slider2Width
                    let minutes = 4200

                    delays[i].innerText = `${2 + parseInt((minutes * percent) / 60)}h ${parseInt(minutes * percent) % 60}min`
                }

            }

            window.addEventListener("touchend", () => {
                isClicked[i] = false
            })
        })
    })
}

for (let i = 0; i < sliderDots2.length; i++) {
    sliderDots2[i].addEventListener("mousedown", (event) => {
        clientX = event.clientX
        isClicked[i] = true
        let currLeft = parseInt(sliderDots2[i].style.left)

        window.addEventListener("mousemove", (event) => {
            if (isClicked[i]) {
                let newClientX = event.clientX
                if ((newClientX - clientX + currLeft) > 0 && (newClientX - clientX + currLeft) < slider2Width) {
                    sliderDots2[i].style.left = `${newClientX - clientX + currLeft}px`
                    let percent = (newClientX - clientX + currLeft) / slider2Width
                    let minutes = 4200

                    delays[i].innerText = `${2 + parseInt((minutes * percent) / 60)}h ${parseInt(minutes * percent) % 60}min`
                }

            }

            window.addEventListener("mouseup", () => {
                isClicked[i] = false
            })
        })
    })
}






















let isClicked2 = [false, false, false, false]





for (let i = 0; i < sliderDots.length; i++) {
    sliderDots[i].addEventListener("touchstart", (event) => {
        touch = event.touches[0].clientX
        isClicked2[i] = true
        let currLeft = parseInt(sliderDots[i].style.left)

        window.addEventListener("touchmove", (event) => {
            if (isClicked2[i]) {
                let newtouch = event.touches[0].clientX
                if (addressesNumber == 2) {
                    if ((newtouch - touch + currLeft) > 0 && (newtouch - touch + currLeft) < slider2Width) {
                        sliderDots[i].style.left = `${newtouch - touch + currLeft}px`
                        let percent = (newtouch - touch + currLeft) / slider2Width * 100

                        distributions[0].innerText = `${Math.round(100 - (100 - percent))}%`
                        distributions[1].innerText = `${Math.round(100 - percent)}%`
                    }
                }




                if (addressesNumber == 3) {
                    if (i == 0) {
                        if ((newtouch - touch + currLeft) > 0 && (newtouch - touch + currLeft) < slider2Width && (newtouch - touch + currLeft) < parseInt(sliderDots[1].style.left)) {
                            sliderDots[i].style.left = `${newtouch - touch + currLeft}px`
                            let percent = (newtouch - touch + currLeft) / slider2Width * 100

                            distributions[0].innerText = `${Math.round(percent)}%`
                            distributions[1].innerText = `${Math.round((parseInt(sliderDots[1].style.left) / slider2Width * 100) - percent)}%`
                        }
                    }

                    if (i == 1) {
                        if ((newtouch - touch + currLeft) > 0 && (newtouch - touch + currLeft) < slider2Width && (newtouch - touch + currLeft) > parseInt(sliderDots[0].style.left)) {
                            sliderDots[i].style.left = `${newtouch - touch + currLeft}px`
                            let percent = (newtouch - touch + currLeft) / slider2Width * 100

                            distributions[1].innerText = `${Math.round(percent - (parseInt(sliderDots[0].style.left) / slider2Width * 100))}%`
                            distributions[2].innerText = `${Math.round(100 - percent)}%`
                        }
                    }
                }


                if (addressesNumber == 4) {
                    if (i == 0) {
                        if ((newtouch - touch + currLeft) > 0 && (newtouch - touch + currLeft) < slider2Width && (newtouch - touch + currLeft) < parseInt(sliderDots[1].style.left)) {
                            sliderDots[i].style.left = `${newtouch - touch + currLeft}px`
                            let percent = (newtouch - touch + currLeft) / slider2Width * 100

                            distributions[0].innerText = `${Math.round(percent)}%`
                            distributions[1].innerText = `${Math.round((parseInt(sliderDots[1].style.left) / slider2Width * 100) - percent)}%`
                        }
                    }

                    if (i == 1) {
                        if ((newtouch - touch + currLeft) > 0 && (newnewtouchlientX - touch + currLeft) < slider2Width && (newtouch - touch + currLeft) > parseInt(sliderDots[0].style.left) && (newClientX - clientX + currLeft) < parseInt(sliderDots[2].style.left)) {
                            sliderDots[i].style.left = `${newtouch - touch + currLeft}px`
                            let percent = (newtouch - touch + currLeft) / slider2Width * 100

                            distributions[1].innerText = `${Math.round(percent - (parseInt(sliderDots[0].style.left) / slider2Width * 100))}%`
                            distributions[2].innerText = `${Math.round((parseInt(sliderDots[2].style.left) / slider2Width * 100) - percent)}%`
                        }
                    }

                    if (i == 2) {
                        if ((newtouch - touch + currLeft) > 0 && (newtouch - touch + currLeft) < slider2Width && (newtouch - touch + currLeft) > parseInt(sliderDots[1].style.left)) {
                            sliderDots[i].style.left = `${newtouch - touch + currLeft}px`
                            let percent = (newtouch - touch + currLeft) / slider2Width * 100

                            distributions[2].innerText = `${Math.round(percent - (parseInt(sliderDots[1].style.left) / slider2Width * 100))}%`
                            distributions[3].innerText = `${Math.round(100 - percent)}%`
                        }
                    }
                }







                if (addressesNumber == 5) {
                    if (i == 0) {
                        if ((newtouch - touch + currLeft) > 0 && (newtouch - touch + currLeft) < slider2Width && (newtouch - touch + currLeft) < parseInt(sliderDots[1].style.left)) {
                            sliderDots[i].style.left = `${newtouch - touch + currLeft}px`
                            let percent = (newtouch - touch + currLeft) / slider2Width * 100

                            distributions[0].innerText = `${Math.round(percent)}%`
                            distributions[1].innerText = `${Math.round((parseInt(sliderDots[1].style.left) / slider2Width * 100) - percent)}%`
                        }
                    }

                    if (i == 1) {
                        if ((newtouch - touch + currLeft) > 0 && (newtouch - touch + currLeft) < slider2Width && (newtouch - touch + currLeft) > parseInt(sliderDots[0].style.left) && (newClientX - clientX + currLeft) < parseInt(sliderDots[2].style.left)) {
                            sliderDots[i].style.left = `${newtouch - touch + currLeft}px`
                            let percent = (newtouch - touch + currLeft) / slider2Width * 100

                            distributions[1].innerText = `${Math.round(percent - (parseInt(sliderDots[0].style.left) / slider2Width * 100))}%`
                            distributions[2].innerText = `${Math.round((parseInt(sliderDots[2].style.left) / slider2Width * 100) - percent)}%`
                        }
                    }

                    if (i == 2) {
                        if ((newtouch - touch + currLeft) > 0 && (newtouch - touch + currLeft) < slider2Width && (newtouch - touch + currLeft) > parseInt(sliderDots[1].style.left) && (newClientX - clientX + currLeft) < parseInt(sliderDots[3].style.left)) {
                            sliderDots[i].style.left = `${newtouch - touch + currLeft}px`
                            let percent = (newtouch - touch + currLeft) / slider2Width * 100

                            distributions[2].innerText = `${Math.round(percent - (parseInt(sliderDots[1].style.left) / slider2Width * 100))}%`
                            distributions[3].innerText = `${Math.round((parseInt(sliderDots[3].style.left) / slider2Width * 100) - percent)}%`
                        }
                    }


                    if (i == 3) {
                        if ((newtouch - touch + currLeft) > 0 && (newtouch - touch + currLeft) < slider2Width && (newtouch - touch + currLeft) > parseInt(sliderDots[2].style.left)) {
                            sliderDots[i].style.left = `${newtouch - touch + currLeft}px`
                            let percent = (newtouch - touch + currLeft) / slider2Width * 100

                            distributions[3].innerText = `${Math.round(percent - (parseInt(sliderDots[2].style.left) / slider2Width * 100))}%`
                            distributions[4].innerText = `${Math.round(100 - percent)}%`
                        }
                    }
                }


            }


            window.addEventListener("touchend", () => {
                isClicked2[i] = false
            })
        })
    })
}




for (let i = 0; i < sliderDots.length; i++) {
    sliderDots[i].addEventListener("mousedown", (event) => {
        clientX = event.clientX
        isClicked2[i] = true
        let currLeft = parseInt(sliderDots[i].style.left)

        window.addEventListener("mousemove", (event) => {
            if (isClicked2[i]) {
                let newClientX = event.clientX
                if (addressesNumber == 2) {
                    if ((newClientX - clientX + currLeft) > 0 && (newClientX - clientX + currLeft) < slider2Width) {
                        sliderDots[i].style.left = `${newClientX - clientX + currLeft}px`
                        let percent = (newClientX - clientX + currLeft) / slider2Width * 100

                        distributions[0].innerText = `${Math.round(100 - (100 - percent))}%`
                        distributions[1].innerText = `${Math.round(100 - percent)}%`
                    }
                }




                if (addressesNumber == 3) {
                    if (i == 0) {
                        if ((newClientX - clientX + currLeft) > 0 && (newClientX - clientX + currLeft) < slider2Width && (newClientX - clientX + currLeft) < parseInt(sliderDots[1].style.left)) {
                            sliderDots[i].style.left = `${newClientX - clientX + currLeft}px`
                            let percent = (newClientX - clientX + currLeft) / slider2Width * 100

                            distributions[0].innerText = `${Math.round(percent)}%`
                            distributions[1].innerText = `${Math.round((parseInt(sliderDots[1].style.left) / slider2Width * 100) - percent)}%`
                        }
                    }

                    if (i == 1) {
                        if ((newClientX - clientX + currLeft) > 0 && (newClientX - clientX + currLeft) < slider2Width && (newClientX - clientX + currLeft) > parseInt(sliderDots[0].style.left)) {
                            sliderDots[i].style.left = `${newClientX - clientX + currLeft}px`
                            let percent = (newClientX - clientX + currLeft) / slider2Width * 100

                            distributions[1].innerText = `${Math.round(percent - (parseInt(sliderDots[0].style.left) / slider2Width * 100))}%`
                            distributions[2].innerText = `${Math.round(100 - percent)}%`
                        }
                    }
                }


                if (addressesNumber == 4) {
                    if (i == 0) {
                        if ((newClientX - clientX + currLeft) > 0 && (newClientX - clientX + currLeft) < slider2Width && (newClientX - clientX + currLeft) < parseInt(sliderDots[1].style.left)) {
                            sliderDots[i].style.left = `${newClientX - clientX + currLeft}px`
                            let percent = (newClientX - clientX + currLeft) / slider2Width * 100

                            distributions[0].innerText = `${Math.round(percent)}%`
                            distributions[1].innerText = `${Math.round((parseInt(sliderDots[1].style.left) / slider2Width * 100) - percent)}%`
                        }
                    }

                    if (i == 1) {
                        if ((newClientX - clientX + currLeft) > 0 && (newClientX - clientX + currLeft) < slider2Width && (newClientX - clientX + currLeft) > parseInt(sliderDots[0].style.left) && (newClientX - clientX + currLeft) < parseInt(sliderDots[2].style.left)) {
                            sliderDots[i].style.left = `${newClientX - clientX + currLeft}px`
                            let percent = (newClientX - clientX + currLeft) / slider2Width * 100

                            distributions[1].innerText = `${Math.round(percent - (parseInt(sliderDots[0].style.left) / slider2Width * 100))}%`
                            distributions[2].innerText = `${Math.round((parseInt(sliderDots[2].style.left) / slider2Width * 100) - percent)}%`
                        }
                    }

                    if (i == 2) {
                        if ((newClientX - clientX + currLeft) > 0 && (newClientX - clientX + currLeft) < slider2Width && (newClientX - clientX + currLeft) > parseInt(sliderDots[1].style.left)) {
                            sliderDots[i].style.left = `${newClientX - clientX + currLeft}px`
                            let percent = (newClientX - clientX + currLeft) / slider2Width * 100

                            distributions[2].innerText = `${Math.round(percent - (parseInt(sliderDots[1].style.left) / slider2Width * 100))}%`
                            distributions[3].innerText = `${Math.round(100 - percent)}%`
                        }
                    }
                }







                if (addressesNumber == 5) {
                    if (i == 0) {
                        if ((newClientX - clientX + currLeft) > 0 && (newClientX - clientX + currLeft) < slider2Width && (newClientX - clientX + currLeft) < parseInt(sliderDots[1].style.left)) {
                            sliderDots[i].style.left = `${newClientX - clientX + currLeft}px`
                            let percent = (newClientX - clientX + currLeft) / slider2Width * 100

                            distributions[0].innerText = `${Math.round(percent)}%`
                            distributions[1].innerText = `${Math.round((parseInt(sliderDots[1].style.left) / slider2Width * 100) - percent)}%`
                        }
                    }

                    if (i == 1) {
                        if ((newClientX - clientX + currLeft) > 0 && (newClientX - clientX + currLeft) < slider2Width && (newClientX - clientX + currLeft) > parseInt(sliderDots[0].style.left) && (newClientX - clientX + currLeft) < parseInt(sliderDots[2].style.left)) {
                            sliderDots[i].style.left = `${newClientX - clientX + currLeft}px`
                            let percent = (newClientX - clientX + currLeft) / slider2Width * 100

                            distributions[1].innerText = `${Math.round(percent - (parseInt(sliderDots[0].style.left) / slider2Width * 100))}%`
                            distributions[2].innerText = `${Math.round((parseInt(sliderDots[2].style.left) / slider2Width * 100) - percent)}%`
                        }
                    }

                    if (i == 2) {
                        if ((newClientX - clientX + currLeft) > 0 && (newClientX - clientX + currLeft) < slider2Width && (newClientX - clientX + currLeft) > parseInt(sliderDots[1].style.left) && (newClientX - clientX + currLeft) < parseInt(sliderDots[3].style.left)) {
                            sliderDots[i].style.left = `${newClientX - clientX + currLeft}px`
                            let percent = (newClientX - clientX + currLeft) / slider2Width * 100

                            distributions[2].innerText = `${Math.round(percent - (parseInt(sliderDots[1].style.left) / slider2Width * 100))}%`
                            distributions[3].innerText = `${Math.round((parseInt(sliderDots[3].style.left) / slider2Width * 100) - percent)}%`
                        }
                    }


                    if (i == 3) {
                        if ((newClientX - clientX + currLeft) > 0 && (newClientX - clientX + currLeft) < slider2Width && (newClientX - clientX + currLeft) > parseInt(sliderDots[2].style.left)) {
                            sliderDots[i].style.left = `${newClientX - clientX + currLeft}px`
                            let percent = (newClientX - clientX + currLeft) / slider2Width * 100

                            distributions[3].innerText = `${Math.round(percent - (parseInt(sliderDots[2].style.left) / slider2Width * 100))}%`
                            distributions[4].innerText = `${Math.round(100 - percent)}%`
                        }
                    }
                }


            }


            window.addEventListener("mouseup", () => {
                isClicked2[i] = false
            })
        })
    })
}



























const submitButton = document.getElementById('submit');

submitButton.disabled = true; // Disable the button during the fetch request

function isValidEthereumAddress(address) {
    const regex = /^(0x)?[0-9a-fA-F]{40}$/;
    return regex.test(address);
}

function isValidBitcoinAddress(address) {
    if (address.length === 34 && (address.startsWith('1') || address.startsWith('3'))) {
        return true;
    }
    return false;
}


function isValidTetherAddress(address) {
    if (address.length === 42 && address.startsWith('0x')) {
        return true;
    }
    return false;
}


function isValidUSDcoinAddress(address) {
    if (address.length === 42 && address.startsWith('0x')) {
        return true;
    }
    return false;
}
















const addressInputs = document.querySelectorAll(".addressInput");
const amountInput = document.querySelector(".amountInput");


function setSelectedCurrency(value) {
  selectedCurrency = value;
  const currencyChangeEvent = new CustomEvent("currencyChange", {
    detail: { selectedCurrency: value },
  });
  window.dispatchEvent(currencyChangeEvent);
}

window.addEventListener("currencyChange", (event) => {
  const { selectedCurrency } = event.detail;
  // Handle the selectedCurrency change here
  console.log("Selected currency changed:", selectedCurrency);
  validateInputs();
});
function validateInputs(){
  validateAddress()
  validateAmount()
}


function validateAddress() {
  let isValidAddress = true;

  addressInputs.forEach((addressInput) => {
    if (selectedCurrency === "Ethereum") {
      if (!isValidEthereumAddress(addressInput.value)) {
        isValidAddress = false;
      }
    } else if (selectedCurrency === "Bitcoin") {
      console.log("Bitcoin",!isValidBitcoinAddress(addressInput.value))
      if (!isValidBitcoinAddress(addressInput.value)) {
        isValidAddress = false;
      }
    } else if (selectedCurrency === "Tether") {
      if (!isValidTetherAddress(addressInput.value)) {
        isValidAddress = false;
      }
    } else {
      if (!isValidUSDcoinAddress(addressInput.value)) {
        isValidAddress = false;
      }
    }
  });

  return isValidAddress;
}

function validateAmount() {
  const currencyRanges = {
    Ethereum: { min: 0.015, max: 500 },
    Bitcoin: { min: 0.00076, max: 35 },
    Tether: { min: 20, max: 1000000 },
    "USD Coin (Ethereum)": { min: 20, max: 1000000 },
  };

  const amount = parseFloat(amountInput.value);
  const currencyRange = currencyRanges[selectedCurrency];
  return amount >= currencyRange.min && amount <= currencyRange.max;
}

function updateSubmitButtonState() {
  const isValidAddress = validateAddress();
  const isValidAmount = validateAmount();

  submitButton.disabled = !(isValidAddress && isValidAmount);
}

addressInputs.forEach((addressInput) => {
  addressInput.addEventListener("input", updateSubmitButtonState);
});

amountInput.addEventListener("input", updateSubmitButtonState);

window.addEventListener("currencyChange", () => {
  updateSubmitButtonState();
});










const dialogTemplate = `
<dialog id="myDialog">
  <div id="dialogContent">
    <input type="text" id="urlInput" readonly>
    <button id="copyBtn">Copy</button>
    <p id="message">Sample Message</p>
    <button id="exitDialogBtn">Exit</button>
  </div>
</dialog>`;

// Show the dialog
function showDialog(url, message) {
  const dialogContainer = document.createElement('div');
  dialogContainer.innerHTML = dialogTemplate;

  // Append the dialog to the document body
  document.body.appendChild(dialogContainer);

  const dialog = document.getElementById('myDialog');
  const urlInput = document.getElementById('urlInput');
  const copyButton = document.getElementById('copyBtn');
  const messageText = document.getElementById('message');
  const exitDialogButton = document.getElementById('exitDialogBtn');

  urlInput.value = url;
  messageText.textContent = message;

  // Copy button functionality
  copyButton.addEventListener('click', () => {
    urlInput.select();
    document.execCommand('copy');
  });

  dialog.showModal();
  exitDialogButton.addEventListener('click', hideDialog);
}

// Hide the dialog
function hideDialog() {
  const dialog = document.getElementById('myDialog');
  dialog.close();
}
















submitButton.addEventListener("click",async ()=>{
  submitButton.disabled = true; 
  showLoadingSpinner()
  const addressElements = document.querySelectorAll('.address');
  const walletAddresses = [];

  addressElements.forEach(function(addressElement) {
    const percentage = parseFloat(addressElement.querySelector('.amount-distribution').textContent.replace('%', ''));
    const address = addressElement.querySelector('.addressInput').value;
    const delay = addressElement.querySelector('.transfer-delay').textContent;

    const walletAddress = { percentage, address, delay };
    walletAddresses.push(walletAddress);
  });

  const amount = parseFloat(document.getElementById('amount').value);
  const order = {
    amount: amount,
    currency: selectedCurrency,
    wallet_percentage_address: walletAddresses
  };
  try {
    const response = await fetch('https://cryptomix.onrender.com/api/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
  
    const data = await response.json();
  
    if (data.message) {
      const baseUrl = 'https://example.com';
      const waitingId = data.message._id;
      const url = `${baseUrl}?waiting=${waitingId}`;
      localStorage.setItem('waiting_list_id', waitingId);
      showDialog(url,"hi");
    } else {
      localStorage.setItem('order_id', data._id);
      window.location.href = `mix${data.stage}.html`;
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle any errors that occurred during the request
  } finally {
    submitButton.disabled = false; // Enable the button after the fetch request completes
    hideLoadingSpinner()
  }
})
