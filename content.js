// // Function to add a message to the chatbox
// function addMessageToChatbox(message, isUserMessage) 
// {
//     const chatMessages = document.getElementById('chat-messages');
//     const messageElement = document.createElement('p');
//     messageElement.innerText = message;

//     if (isUserMessage) 
//     {
//         messageElement.classList.add('user-message');
//     } 
//     else 
//     {
//         messageElement.classList.add('echo-message');
//     }

//     chatMessages.appendChild(messageElement);
// }

// chrome.runtime.onMessage.addListener
// (
//     function(request, sender, sendResponse) 
//     {
//         if (request.message === 'sendMessage') 
//         {
//             const message = request.message;
//             addMessageToChatbox(message, true);
//             addMessageToChatbox(message, false);
//         }
//     }
// );

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "start" ) {
            start();
        }
    }
);

function start(){
    alert("started");
}