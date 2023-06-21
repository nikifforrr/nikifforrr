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
    fetch('https://cryptomix.onrender.com/api/auth/admin/authenticate', {
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
    fetch('https://cryptomix.onrender.com/api/auth/admin/admin', {
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