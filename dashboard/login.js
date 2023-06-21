
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




if (access_token && refresh_token) {
  showLoadingSpinner()
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
        window.location.href = "dashboard.html"
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
            window.location.href = "dashboard.html"
          });
      }
    })
    .catch((error) => {
      console.log("Token verification or refresh failed:", error);
    });
} else {
  if (access_token) {
    showLoadingSpinner()
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
          window.location.href = "dashboard.html"
        } else {
          throw new Error("Token verification failed");
        }
      })
      .catch((error) => {
        console.log("Token verification failed:", error);
      });
  }

  if (refresh_token) {
    showLoadingSpinner()
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
        window.location.href = "dashboard.html"
      })
      .catch((error) => {
        console.log("Refresh token failed:", error);
      });
  }
}







const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the form submission

  const selectedRadio = document.querySelector('input[name="group1"]:checked');
  const dataType = selectedRadio.getAttribute('data-type');

  const usernameInput = document.getElementById('usernameInput');
  const passwordInput = document.getElementById('passwordInput');
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (dataType === 'login') {
      console.log(username,password);

    // Perform authentication with username and password
    fetch('https://cryptomix.onrender.com/api/auth/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        // Store access token and refresh token in local storage
        const { accessToken, refreshToken } = data.token;
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        window.location.href = "index.html"
        // Continue with any other actions after successful authentication
        console.log('Authentication successful');
      })
      .catch(error => {
        // Handle authentication error
        console.log('Authentication failed:', error);
      });
  } else if (dataType === 'create-admin') {
    // Perform admin creation with username and password
    fetch('https://cryptomix.onrender.com/api/auth/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        // Continue with any other actions after successful admin creation
        alert('Admin creation successful');
      })
      .catch(error => {
        // Handle admin creation error
        console.log('Admin creation failed:', error);
      });
  }
});