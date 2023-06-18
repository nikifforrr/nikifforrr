const howMuch = document.querySelector(".transfer span")

const idInput = document.querySelector(".idInput")
const urlInput = document.querySelector(".urlInput")
const addressInput = document.querySelector(".transferAddress")

idInput.value = "asdsdasdas"
urlInput.value = "asdsdasdas.com"
addressInput.value = "0x2E67350d53638B1a4c3b63740e1161dD1A6622CC"

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

console.log(addressesNumber)

let order

if(addressesNumber==1){
    orderr = {
        "Amount" : localStorage.getItem("amount"),
        "Currency" : localStorage.getItem("Currency"),
        "Number of addresses" : 1,
        "Address 1" : localStorage.getItem("Address1"),
        "Address 1 Distribution" : localStorage.getItem(`Amount1`),
        "Address 1 Transfer Delay" : localStorage.getItem(`Transfer Delay1`)
    }
}
else if(addressesNumber==2){
    orderr = {
        "Amount" : localStorage.getItem("amount"),
        "Currency" : localStorage.getItem("Currency"),
        "Number of addresses" : 1,
        "Address 1" : localStorage.getItem("Address1"),
        "Address 1 Distribution" : localStorage.getItem(`Amount1`),
        "Address 1 Transfer Delay" : localStorage.getItem(`Transfer Delay1`),
        "Address 2" : localStorage.getItem("Address2"),
        "Address 2 Distribution" : localStorage.getItem(`Amount2`),
        "Address 2 Transfer Delay" : localStorage.getItem(`Transfer Delay2`)
    }
}

else if(addressesNumber==3){
    orderr = {
        "Amount" : localStorage.getItem("amount"),
        "Currency" : localStorage.getItem("Currency"),
        "Number of addresses" : 1,
        "Address 1" : localStorage.getItem("Address1"),
        "Address 1 Distribution" : localStorage.getItem(`Amount1`),
        "Address 1 Transfer Delay" : localStorage.getItem(`Transfer Delay1`),
        "Address 2" : localStorage.getItem("Address2"),
        "Address 2 Distribution" : localStorage.getItem(`Amount2`),
        "Address 2 Transfer Delay" : localStorage.getItem(`Transfer Delay2`),
        "Address 3" : localStorage.getItem("Address3"),
        "Address 3 Distribution" : localStorage.getItem(`Amount3`),
        "Address 3 Transfer Delay" : localStorage.getItem(`Transfer Delay3`)
    }
}

else if(addressesNumber==4){
    orderr = {
        "Amount" : localStorage.getItem("amount"),
        "Currency" : localStorage.getItem("Currency"),
        "Number of addresses" : 1,
        "Address 1" : localStorage.getItem("Address1"),
        "Address 1 Distribution" : localStorage.getItem(`Amount1`),
        "Address 1 Transfer Delay" : localStorage.getItem(`Transfer Delay1`),
        "Address 2" : localStorage.getItem("Address2"),
        "Address 2 Distribution" : localStorage.getItem(`Amount2`),
        "Address 2 Transfer Delay" : localStorage.getItem(`Transfer Delay2`),
        "Address 3" : localStorage.getItem("Address3"),
        "Address 3 Distribution" : localStorage.getItem(`Amount3`),
        "Address 3 Transfer Delay" : localStorage.getItem(`Transfer Delay3`),
        "Address 4" : localStorage.getItem("Address4"),
        "Address 4 Distribution" : localStorage.getItem(`Amount4`),
        "Address 4 Transfer Delay" : localStorage.getItem(`Transfer Delay4`)
    }
}

else if(addressesNumber==5){
    orderr = {
        "Amount" : localStorage.getItem("amount"),
        "Currency" : localStorage.getItem("Currency"),
        "Number of addresses" : 1,
        "Address 1" : localStorage.getItem("Address1"),
        "Address 1 Distribution" : localStorage.getItem(`Amount1`),
        "Address 1 Transfer Delay" : localStorage.getItem(`Transfer Delay1`),
        "Address 2" : localStorage.getItem("Address2"),
        "Address 2 Distribution" : localStorage.getItem(`Amount2`),
        "Address 2 Transfer Delay" : localStorage.getItem(`Transfer Delay2`),
        "Address 3" : localStorage.getItem("Address3"),
        "Address 3 Distribution" : localStorage.getItem(`Amount3`),
        "Address 3 Transfer Delay" : localStorage.getItem(`Transfer Delay3`),
        "Address 4" : localStorage.getItem("Address4"),
        "Address 4 Distribution" : localStorage.getItem(`Amount4`),
        "Address 4 Transfer Delay" : localStorage.getItem(`Transfer Delay4`),
        "Address 5" : localStorage.getItem("Address5"),
        "Address 5 Distribution" : localStorage.getItem(`Amount5`),
        "Address 5 Transfer Delay" : localStorage.getItem(`Transfer Delay5`),
    }
}

let letter = JSON.stringify(orderr)

const letterBtn = document.querySelector(".letterBtnDiv a")

const file = 'data.json';

function createJSONFile(jsonData, fileName) {
    const blob = new Blob([letter], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    letterBtn.href = url;
  }

createJSONFile(letter, file);

letterBtn.download = file
