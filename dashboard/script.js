const input = document.querySelector(".filter")

input.addEventListener("input", (e)=>{
    const ids = document.querySelectorAll(".order>div:nth-child(1)")
    const orders = document.querySelectorAll(".order")
    const word = e.target.value.toLowerCase()

    for(let i=0; i<ids.length;i++){
        if(ids[i].innerText.toLowerCase().includes(word)){
            orders[i].style.display = "flex"
        }
        else{
            orders[i].style.display = "none"
        }
    }
})

































function fillOrderTemplate(orders) {
  const orderTemplates = [];

  orders.forEach(order => {
    const addressesContainer = document.createElement('div');
    addressesContainer.classList.add('addresses');

    const distributionsContainer = document.createElement('div');
    distributionsContainer.classList.add('distributions');

    const transferDelaysContainer = document.createElement('div');
    transferDelaysContainer.classList.add('transfer-delays');

    order.wallet_percentage_address.forEach(item => {
      const addressElement = document.createElement('div');
      addressElement.textContent = item.address;
      addressesContainer.appendChild(addressElement);

      const distributionElement = document.createElement('div');
      distributionElement.textContent = `${item.percentage}%`;
      distributionsContainer.appendChild(distributionElement);

      const transferDelayElement = document.createElement('div');
      transferDelayElement.textContent = item.delay;
      transferDelaysContainer.appendChild(transferDelayElement);
    });

    const orderItemTemplate = `
        <div id="order_id">${order._id}</div>
        <div id="amount">${order.amount}</div>
        <div id="currency">${order.currency}</div>
        ${addressesContainer.outerHTML}
        ${distributionsContainer.outerHTML}
        ${transferDelaysContainer.outerHTML}
        <div id="stage">${order.stage}</div>
        <div>
          <button id="Advance">Advance</button>
        </div>
    `;

    orderTemplates.push(orderItemTemplate);
  });

  return orderTemplates;
}

// Fetch orders from the API
fetch('https://cryptomix.onrender.com/api/orders')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error fetching orders');
    }
  })
  .then(orders => {
    const ordersDiv = document.querySelector('.orders-div');
    
    // Generate order templates
    const orderTemplates = fillOrderTemplate(orders);
    
    // Append order templates to the orders div
    orderTemplates.forEach(orderTemplate => {
      const orderElement = document.createElement('div');
      orderElement.classList.add("order")
      orderElement.innerHTML = orderTemplate;
      ordersDiv.appendChild(orderElement);

      const advanceButton = orderElement.querySelector('#Advance');
      const orderIdElement = orderElement.querySelector('#order_id');
      const stageElement = orderElement.querySelector('#stage');

      advanceButton.addEventListener('click', () => {
        const token = 'your_auth_token';

        fetch(`https://cryptomix.onrender.com/api/orders/admin-approve/${orderIdElement.textContent}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        })
          .then(response => {
            if (response.ok) {
              stageElement.innerText = parseInt(stageElement.textContent) + 1;
              return response.json();
            } else {
              return response.json().then(error => {
                console.error(error);
              });
            }
          })
          .then(data => {
            // Handle the response data
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
      });
    });
  })
  .catch(error => {
    console.error(error);
  });
