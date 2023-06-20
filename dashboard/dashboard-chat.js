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
    console.log('Received message:', event.data);

    try {
      let message;
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function () {
          const text = reader.result;
          console.log(text)
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

  document.getElementById('joinBtn').addEventListener('click', () => {
    roomId = document.getElementById('roomIdInput').value;
    if (socket.readyState === WebSocket.OPEN) {
      console.log(roomId)
      joinChatRoom(roomId);
    } else {
      console.log('WebSocket connection is not open');
    }
  });

  document.getElementById('sendBtn').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    // Create a chat message object
    const chatMessage = {
      type: 'chatMessage',
      text: message,
      roomId: roomId,
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
            displayMessage(message);
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
      displayMessage(message.text);
    }
  }

  function displayMessage(message) {
    const listItem = document.createElement('li');
    listItem.textContent = message;
    messagesList.appendChild(listItem);
    console.log('Received chat message:', message);
  }














  const listContainer = document.getElementById('chat-rooms-list');

  // Fetch the list of active chat rooms
  fetch('https://cryptomix.onrender.com/api/chat')
    .then(response => response.json())
    .then(data => {
      // Process the list of active chat rooms
      const activeChatRooms = data.ChatRooms;
      console.log(data.ChatRooms)
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
          // Perform any other actions you want with the roomId
        });
      });
    })
    .catch(error => {
      console.log('Error fetching active chat rooms:', error);
    });
});














