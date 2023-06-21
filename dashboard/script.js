
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






const access_token = localStorage.getItem("access_token");
const refresh_token = localStorage.getItem("refresh_token");


showLoadingSpinner()
if (!access_token && !refresh_token) {
  // Redirect to the login page
  window.location.href = "login.html";
}

if (access_token && refresh_token) {
  fetch("https://cryptomix.onrender.com/api/auth/verify-token", {
    method: "POST",
    body: JSON.stringify({
      token: access_token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Token is valid");
      } else {
        // Token is invalid, try refreshing
        return fetch("https://cryptomix.onrender.com/api/auth/refresh-token", {
          method: "POST",
          body: JSON.stringify({
            refreshToken: refresh_token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Refresh token failed");
            }
          })
          .then((data) => {
            localStorage.setItem("access_token", data.accessToken);
            localStorage.setItem("refresh_token", data.refreshToken);
            console.log("Token refreshed successfully");
          });
      }
    })
    .catch((error) => {
      console.log("Token verification or refresh failed:", error);
      // Redirect to the login page
      // window.location.href = "login.html";
    });
} else {
  if (access_token) {
    fetch("https://cryptomix.onrender.com/api/auth/verify-token", {
      method: "POST",
      body: JSON.stringify({
        token: access_token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Token is valid");
        } else {
          throw new Error("Token verification failed");
        }
      })
      .catch((error) => {
        console.log("Token verification failed:", error);
        // Redirect to the login page
        // window.location.href = "login.html";
      });
  }

  if (refresh_token) {
    fetch("https://cryptomix.onrender.com/api/auth/refresh-token", {
      method: "POST",
      body: JSON.stringify({
        refreshToken: refresh_token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Refresh token failed");
        }
      })
      .then((data) => {
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
        console.log("Token refreshed successfully");
      })
      .catch((error) => {
        console.log("Refresh token failed:", error);
        // Redirect to the login page
        // window.location.href = "login.html";
      });
  }
}






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
setTimeout(() => {
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
        showLoadingSpinner()
        fetch(`https://cryptomix.onrender.com/api/orders/admin-approve/${orderIdElement.textContent}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
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
          }).finally(()=>{
            hideLoadingSpinner()
          });
      });
    });
  })
  .catch(error => {
    console.error(error);
  }).finally(()=>{
    hideLoadingSpinner()
  });

}, 3000);
// Fetch orders from the API
