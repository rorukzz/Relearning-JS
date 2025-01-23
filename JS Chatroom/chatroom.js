document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('send');
  
    function addMessage(username, content) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message';
  
      const usernameSpan = document.createElement('span');
      usernameSpan.className = 'username';
      usernameSpan.textContent = username;
  
      const contentSpan = document.createElement('span');
      contentSpan.className = 'content';
      contentSpan.textContent = `: ${content}`;
  
      messageDiv.appendChild(usernameSpan);
      messageDiv.appendChild(contentSpan);
  
      messagesDiv.appendChild(messageDiv);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  
    sendButton.addEventListener('click', () => {
      const username = usernameInput.value.trim();
      const message = messageInput.value.trim();
  
      if (username && message) {
        addMessage(username, message);
        messageInput.value = '';
        messageInput.focus();
      }
    });
  
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendButton.click();
      }
    });
  });
  