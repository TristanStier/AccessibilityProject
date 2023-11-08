// Handle adding messages into chatbox
function addMessageToChatbox(message, isUserMessage) 
{
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    messageElement.innerText = message;

    if (isUserMessage) 
    {
        messageElement.classList.add('user-message');
    } 
    else 
    {
        messageElement.classList.add('ai-message');
    }

    chatMessages.appendChild(messageElement);
}

// Handle the send button click event
document.getElementById('send-button').addEventListener('click', function () 
{
    const userInput = document.getElementById('user-input');
    const message = userInput.value;

    if (message) 
    {
        addMessageToChatbox(message, false);
        addMessageToChatbox(message, true);
        userInput.value = '';
    }
});