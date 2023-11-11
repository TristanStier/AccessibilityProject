const endpointUrl_Turbo = "https://api.openai.com/v1/chat/completions";
var apiKey = "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";
var systemPrompt="You are a personal tech assistant that aims to help people navigate websites. Given the context, provide answers to the questions. Make your responses a step by step guide. For example, if there are 8 steps to a solution, say step 1 and then ask the user to write \"next\" in order to get step 2 etc.";
var messages = [
    {
        role: "system",
        content: "You are a personal tech assistant that aims to help people navigate websites. Given the context, provide answers to the questions. Make your responses a step by step guide. For example, if there are 8 steps to a solution, say step 1 and then ask the user to write \"next\" in order to get step 2 etc.",
    }
];

async function getMessage()
{
    fetch(
        endpointUrl_Turbo,
        {
            body: JSON.stringify
            ({
                "model": "gpt-4", 
                "messages": messages, 
                "temperature": 0,
                "max_tokens":500
            }),
            method: "POST",
            headers: 
            {
                "content-type": "application/json",
                Authorization: "Bearer "+ apiKey,
            },
        }
    ).then((response) => 
    {
        if (response.ok) 
        {
            response.json().then((json) => 
            {
                let AIMessage = json['choices'][0]['message']['content'];
                addMessageToChatbox(AIMessage, false);     
                messages.push({ role: "assistant", content: AIMessage });  
            });
        }
    });
}

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
        addMessageToChatbox(message, true);
        messages.push({ role: "user", content: message });
        getMessage();
        userInput.value = '';
    }
});