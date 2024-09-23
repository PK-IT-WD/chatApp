document.addEventListener("DOMContentLoaded", () => {
    const userName = localStorage.getItem("userName");
    const messageForm = document.getElementById("messageForm");
    const messageInput = document.getElementById("messageInput");
    const messagesDiv = document.getElementById("messages");
  
    function fetchMessages() {
      fetch("/get-messages")
        .then(response => response.json())
        .then(messages => {
          messagesDiv.innerHTML = "";
          messages.forEach(msg => {
            const msgElement = document.createElement("div");
            msgElement.textContent = `${msg.userName}: ${msg.message}`;
            messagesDiv.appendChild(msgElement);
          });
        });
    }
  
    messageForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const message = messageInput.value;
  
      fetch("/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `userName=${encodeURIComponent(userName)}&message=${encodeURIComponent(message)}`
      }).then(() => {
        messageInput.value = "";
        fetchMessages();
      });
    });
  
    fetchMessages();
  });
  
