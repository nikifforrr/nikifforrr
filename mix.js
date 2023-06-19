const selectedImg = document.querySelector(".selector>img:nth-child(1)")
const selectedName = document.querySelector(".selector>div:nth-child(2)")

let selectedCurrency = "Ethereum"

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
    selectedCurrency = "Bitcoin"
    bounds.innerText = "You can mix between 0.00076 and 35 BTC"
})

options[1].addEventListener("click", () => {
    selectedImg.src = "img/ether.svg"
    selectedName.innerText = "ETH"
    selectedCurrency = "Ethereum"
    bounds.innerText = "You can mix between 0.015 and 500 ETH"
})

options[2].addEventListener("click", () => {
    selectedImg.src = "img/tether.svg"
    selectedName.innerText = "TETHER"
    selectedCurrency = "Tether"
    bounds.innerText = "You can mix between 20 and 1000000 TETHER"
})

options[3].addEventListener("click", () => {
    selectedImg.src = "img/usdc.svg"
    selectedName.innerText = "USDC"
    selectedCurrency = "USD Coin (Ethereum)"
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




























const batoni = document.querySelector(".button-div button")

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



batoni.addEventListener("click", () => {

    const addressInputs = document.querySelectorAll(".addressInput")

    const amountInput = document.querySelector(".amountInput")

    for (let i = 0; i < addressInputs.length; i++) {
        if (selectedCurrency == "Ethereum") {
            if (!isValidEthereumAddress(addressInputs[i].value)) {
                alert("Please enter a valid address")
                return
            }
        }
        else if (selectedCurrency == "Bitcoin") {
            if (!isValidBitcoinAddress(addressInputs[i].value)) {
                alert("Please enter a valid address")
                return
            }
        }
        else if (selectedCurrency == "Tether") {
            if (!isValidTetherAddress(addressInputs[i].value)) {
                alert("Please enter a valid address")
                return
            }
        }
        else {
            if (!isValidUSDcoinAddress(addressInputs[i].value)) {
                alert("Please enter a valid address")
                return
            }
        }
        document.getElementById('submit').addEventListener('click', async function(event) {
            event.preventDefault();
        
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
                console.log(data.message._id);
                // Show a message with the base_url + /waiting + _id
              } else {
                //store what you need
                if(data.stage === 2){
                  isOrderCreated = true
                }
                localStorage.setItem('order_id', data._id);
                localStorage.setItem('url', this.baseURI + '/' + data._id);
                localStorage.setItem('receive_wallet_address', data.receive_wallet_address);
              }
            } catch (error) {
              console.error('Error:', error);
              // Handle any errors that occurred during the request
            }
            });
        
    }


    localStorage.setItem("Currency", selectedCurrency)
    localStorage.setItem("Number of Addresses", addressesNumber)
    if (addressesNumber == 1) {
        localStorage.setItem(`Amount1`, distributions[0].innerText)
        localStorage.setItem(`Transfer Delay1`, delays[0].innerText)
        localStorage.setItem(`Address1`, addressInputs[0].value)
    }
    else if (addressesNumber == 2) {
        localStorage.setItem(`Amount1`, distributions[0].innerText)
        localStorage.setItem(`Transfer Delay1`, delays[0].innerText)
        localStorage.setItem(`Address1`, addressInputs[0].value)
        localStorage.setItem(`Amount2`, distributions[1].innerText)
        localStorage.setItem(`Transfer Delay2`, delays[1].innerText)
        localStorage.setItem(`Address2`, addressInputs[1].value)
    }
    else if (addressesNumber == 3) {
        localStorage.setItem(`Amount1`, distributions[0].innerText)
        localStorage.setItem(`Transfer Delay1`, delays[0].innerText)
        localStorage.setItem(`Address1`, addressInputs[0].value)
        localStorage.setItem(`Amount2`, distributions[1].innerText)
        localStorage.setItem(`Transfer Delay2`, delays[1].innerText)
        localStorage.setItem(`Address2`, addressInputs[1].value)
        localStorage.setItem(`Amount3`, distributions[2].innerText)
        localStorage.setItem(`Transfer Delay3`, delays[2].innerText)
        localStorage.setItem(`Address3`, addressInputs[2].value)
    }
    else if (addressesNumber == 4) {
        localStorage.setItem(`Amount1`, distributions[0].innerText)
        localStorage.setItem(`Transfer Delay1`, delays[0].innerText)
        localStorage.setItem(`Address1`, addressInputs[0].value)
        localStorage.setItem(`Amount2`, distributions[1].innerText)
        localStorage.setItem(`Transfer Delay2`, delays[1].innerText)
        localStorage.setItem(`Address2`, addressInputs[1].value)
        localStorage.setItem(`Amount3`, distributions[2].innerText)
        localStorage.setItem(`Transfer Delay3`, delays[2].innerText)
        localStorage.setItem(`Address3`, addressInputs[2].value)
        localStorage.setItem(`Amount4`, distributions[3].innerText)
        localStorage.setItem(`Transfer Delay4`, delays[3].innerText)
        localStorage.setItem(`Address4`, addressInputs[3].value)
    }
    else {
        localStorage.setItem(`Amount1`, distributions[0].innerText)
        localStorage.setItem(`Transfer Delay1`, delays[0].innerText)
        localStorage.setItem(`Address1`, addressInputs[0].value)
        localStorage.setItem(`Amount2`, distributions[1].innerText)
        localStorage.setItem(`Transfer Delay2`, delays[1].innerText)
        localStorage.setItem(`Address2`, addressInputs[1].value)
        localStorage.setItem(`Amount3`, distributions[2].innerText)
        localStorage.setItem(`Transfer Delay3`, delays[2].innerText)
        localStorage.setItem(`Address3`, addressInputs[2].value)
        localStorage.setItem(`Amount4`, distributions[3].innerText)
        localStorage.setItem(`Transfer Delay4`, delays[3].innerText)
        localStorage.setItem(`Address4`, addressInputs[3].value)
        localStorage.setItem(`Amount5`, distributions[4].innerText)
        localStorage.setItem(`Transfer Delay5`, delays[4].innerText)
        localStorage.setItem(`Address5`, addressInputs[4].value)
    }





    localStorage.setItem("amount", amountInput.value)
    if (isOrderCreated){
      window.location.href = "mix2.html"
    }
})