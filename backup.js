// const endpointUrl_Turbo = "https://api.openai.com/v1/chat/completions";
// var apiKey = "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";
// var messages = [];

// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) 
// {
//     var currentUrl = tabs[0].url;
//     var systemPrompt = "You're a user-friendly tech assistant guiding people through websites, answering questions in a simple way. You must always offer step-by-step guidance, and prompt users to proceed to the next step by typing \"next\" when necessary. Only show 1 or 2 steps at a time to keep your responses short and concise. Never overwhelm your user with info since they probably have a basic understanding of tech. The current website you assisting with is: " + currentUrl;
//     messages.push({ role: "system", content: systemPrompt });
// });

// // Fetching message from AI using openAI fetch API
// async function getMessage()
// {
//     fetch(
//         endpointUrl_Turbo,
//         {
//             body: JSON.stringify
//             ({
//                 "model": "gpt-4", 
//                 "messages": messages, 
//                 "temperature": 0,
//                 "max_tokens":500
//             }),
//             method: "POST",
//             headers: 
//             {
//                 "content-type": "application/json",
//                 Authorization: "Bearer "+ apiKey,
//             },
//         }
//     ).then((response) => 
//     {
//         if (response.ok) 
//         {
//             response.json().then((json) => 
//             {
//                 let AIMessage = json['choices'][0]['message']['content'];
//                 addMessageToChatbox(AIMessage, false); 
//                 messages.push({ role: "assistant", content: AIMessage });
//             });
//         }
//     });
// }

// // Handle adding messages into chatbox
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
//         messageElement.classList.add('ai-message');
//     }

//     chatMessages.appendChild(messageElement);
// }

// // Handle the send button click event
// document.getElementById('send-button').addEventListener('click', function () 
// {
//     const userInput = document.getElementById('user-input');
//     const message = userInput.value;

//     if (message) 
//     {
//         addMessageToChatbox(message, true);
//         messages.push({ role: "user", content: message });
//         getMessage();
//         userInput.value = '';
//     }
// });