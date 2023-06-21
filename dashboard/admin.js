const access_token = localStorage.getItem("access_token");
const refresh_token = localStorage.getItem("refresh_token");

if(!access_token&&!refresh_token){
  window.location.href = "index.html"
}
const token = {
  token: access_token
}
const refreshToken = {
  refreshToken: refresh_token,
}

if (access_token && refresh_token) {
  fetch("https://cryptomix.onrender.com/api/auth/verify-token", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( token ),
  })
    .then((response) => {
      if (response.ok) {
        // Token is valid
        console.log("Token is valid");
      } else {
        // Token is invalid, try refreshing
        fetch("https://cryptomix.onrender.com/api/auth/refresh-token", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(refreshToken),
        })
          .then((response) => {
            if (response.ok) {
              // Refresh token success
              console.log("Token refreshed successfully");
            } else {
              // Refresh token failed, user needs to index again
              window.location.href = "./index.html"
            }
          }).then((data)=>{
            localStorage.setItem("access_token",data.accessToken)
            localStorage.setItem("refresh_token",data.refreshToken)
          })
          .catch((error) => {
            window.location.href = "./index.html"
          });
      }
    })
    .catch((error) => {
      console.log(error)

      window.location.href = "./index.html"
    });
}else {
  if (access_token) {
    fetch("https://cryptomix.onrender.com/api/auth/verify-token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(token),
    })
      .then((response) => {
        if (response.ok) {
          // Token is valid
          console.log("Token is valid");
        } else {
          // Token is invalid, try refreshing
          window.location.href = "./index.html"
        }
      })
      .catch((error) => {
        window.location.href = "./index.html"
      });
  }
  if (refresh_token) {
          // Token is invalid, try refreshing
          fetch("https://cryptomix.onrender.com/api/auth/refresh-token", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(refreshToken),
          })
            .then((response) => {
              if (response.ok) {
                // Refresh token success
                console.log("Token refreshed successfully");
              } else {
                window.location.href = "./index.html"
              }
            }).then((data)=>{
              localStorage.setItem("access_token",data.accessToken)
              localStorage.setItem("refresh_token",data.refreshToken)
            })
            .catch((error) => {
              window.location.href = "./index.html"
            });
  }
}





const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the form submission
  const usernameInput = document.getElementById('usernameInput');
  const passwordInput = document.getElementById('passwordInput');
  const username = usernameInput.value;
  const password = passwordInput.value;
    // Perform admin creation with username and password
    fetch('https://cryptomix.onrender.com/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}` 
      },
      body: JSON.stringify({ username,password })
    })
      .then(response => {
        // Continue with any other actions after successful admin creation
        alert('Admin creation successful');
      })
      .catch(error => {
        // Handle admin creation error
        console.log('Admin creation failed:', error);
      });
  
    })