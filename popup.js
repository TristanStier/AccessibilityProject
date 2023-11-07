// Function to send a message to the content script
function sendMessageToContentScript(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }

        const activeTab = tabs[0];

        if (activeTab) {
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: (message) => {
                    // Send a message to the content script
                    chrome.runtime.sendMessage({ action: 'sendMessage', message });
                },
                args: [message],
            });
        } else {
            console.error("No active tab found.");
        }
    });
}

// Handle the send button click event
document.getElementById('send-button').addEventListener('click', function () {
    const userInput = document.getElementById('user-input');
    const message = userInput.value;

    if (message) {
        // Send the message to the content script
        sendMessageToContentScript(message);
        userInput.value = '';
        
        // Echo the message in the popup chatbox
        const chatMessages = document.getElementById('chat-messages');
        const userMessage = document.createElement('p');
        userMessage.innerText = `You: ${message}`;
        chatMessages.appendChild(userMessage);
    }
});
