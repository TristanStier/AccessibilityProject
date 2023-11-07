// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'sendMessage') {
        const message = request.message;
        
        // Log the received message to the console for testing
        console.log(`Message from popup: ${message}`);

        // Display the received message in the web page
        const chatMessages = document.getElementById('chat-messages'); // Assuming your chatbox has an element with this ID
        const userMessage = document.createElement('p');
        userMessage.innerText = `You: ${message}`;
        chatMessages.appendChild(userMessage);
    }
});
