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









let room_id
document.addEventListener('DOMContentLoaded', function() {
  const messagesList = document.getElementById('messagesList');

  const socket = new WebSocket('ws://cryptomix.onrender.com');
  let roomId = null;

  socket.addEventListener('open', () => {
    console.log('Connected to WebSocket server');
    // Connection is established, you can perform additional actions here
  });

  socket.addEventListener('close', () => {
    console.log('Disconnected from WebSocket server');
    // Connection is closed, you can handle this event if needed
  });

  socket.addEventListener('message', (event) => {

    try {
      let message;
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function () {
          const text = reader.result;
          try {
            message = JSON.parse(text);
            handleMessage(message);
          } catch (error) {
            console.log('Error parsing message:', error);
          }
        };
        reader.readAsText(event.data);
      } else {
        message = JSON.parse(event.data);
        handleMessage(message);
      }
    } catch (error) {
      console.log('Error handling message:', error);
    }
  });



  document.getElementById('sendBtn').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    // Create a chat message object
    const chatMessage = {
      type: 'chatMessage',
      text: message,
      roomId: room_id,
      role:"admin"
    };
    // Send the chat message to the server
    socket.send(JSON.stringify(chatMessage));

    // Clear the message input field
    messageInput.value = '';
  });
  
  function joinChatRoom(roomId) {
    // Send the joinChat event with the roomId to the server
    socket.send(JSON.stringify({ type: 'joinChat', roomId: roomId }));
    messagesList.innerHTML = ""
    // Fetch chat history
    fetch('https://cryptomix.onrender.com/api/chat/chatHistory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomId: roomId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.messages)) {
          data.messages.forEach((message) => {
            displayMessage(message.messages,message.role);
          });
        }
      })
      .catch((error) => {
        console.log('Error fetching chat history:', error);
      });
  }

  function handleMessage(message) {
    // Check the message type
    if (message.type === 'chatMessage') {
      displayMessage(message.text,message.role);
    }
  }

  function displayMessage(message,role) {
      const messageContainer = document.createElement('div');
      const messageText = document.createElement('p');
      messageText.textContent = message;
      if ( role === "admin" || role == "auto") {
        messageContainer.className = 'senderMessageContainer';
      } else if ( role === "user" ) {
        messageContainer.className = 'receiverMessageContainer';
      }

      messageContainer.appendChild(messageText);
      messagesList.appendChild(messageContainer);
      messagesList.scrollTop = messagesList.scrollHeight; // Auto-scroll to the latest message
    

  }














  const listContainer = document.getElementById('chat-rooms-list');

  // Fetch the list of active chat rooms
  fetch('https://cryptomix.onrender.com/api/chat')
    .then(response => response.json())
    .then(data => {
      // Process the list of active chat rooms
      const activeChatRooms = data.ChatRooms;
      if(data.ChatRooms[0]){
        // Clear the existing list items
        listContainer.innerHTML = '';
        // Insert each active chat room into the list container
        activeChatRooms.forEach((chatRoom, index) => {
          const listItem = `
            <li class="chat-room-item">
              <span class="chat-room-id" data-room-id="${chatRoom}">Room ${index + 1}</span>
            </li>
          `;
          listContainer.innerHTML += listItem;
        });
        // Add event listeners to each chat room item
        const chatRooms = listContainer.getElementsByClassName('chat-room-item');
        Array.from(chatRooms).forEach(item => {
          item.addEventListener('click', () => {
            const roomId = item.children[0].getAttribute('data-room-id');
            joinChatRoom(roomId);
            room_id = roomId
            // Perform any other actions you want with the roomId
          });
        });
      }

    })
    .catch(error => {
      console.log('Error fetching active chat rooms:', error);
    });
});



messageInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    sendBtn.click(); // Trigger click event on the send button
  }
});










