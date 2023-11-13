const endpointUrl_Turbo = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";
let messages = [];
let systemPrompt = "";
let currentUrl = "";

function resetMessages(url)
{
  systemPrompt = "You're a user-friendly tech assistant guiding people through websites, answering questions in a simple way. You must always offer step-by-step guidance and prompt users to proceed to the next step by typing \"next\" when necessary. Only show 1 or 2 steps at a time to keep your responses short and concise. Never overwhelm your user with info since they probably have a basic understanding of tech. The current website you are assisting with is: " + url;
  messages.push({ role: "system", content: systemPrompt });
  loadMessagesForCurrentUrl();
}

// Load previous messages from storage when the extension is opened
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) 
{
  currentUrl = tabs[0].url;
  resetMessages(currentUrl);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) 
{
  if (tab.active && changeInfo.url) 
  {
    currentUrl = changeInfo.url;
    resetMessages(currentUrl);
  }
});

function loadMessagesForCurrentUrl() 
{
  chrome.storage.sync.get(currentUrl, function (data) 
  {
    if (data[currentUrl]) 
    {
      messages = data[currentUrl];
      
      // Display previous messages in the chatbox, excluding the first "system" message
      for (let i = 1; i < messages.length; i++) 
      {
        addMessageToChatbox(messages[i].content, messages[i].role);
      }
    }
  });
}

// Fetching message from AI using openAI fetch API
async function getMessage() 
{
  fetch(endpointUrl_Turbo, 
  {
    body: JSON.stringify
    ({
      model: "gpt-4",
      messages: messages,
      temperature: 0,
      max_tokens: 500,
    }),
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + apiKey,
    },
  }).then((response) => 
  {
    if (response.ok) 
    {
      response.json().then
      ((json) => {
        let AIMessage = json["choices"][0]["message"]["content"];
        addMessageToChatbox(AIMessage, "assistant");
        messages.push({ role: "assistant", content: AIMessage });

        // Save the updated messages to storage for the current website
        const messagesForUrl = {};
        messagesForUrl[currentUrl] = messages;
        chrome.storage.sync.set(messagesForUrl);
      });
    }
  });
}

// Handle adding messages into chatbox
function addMessageToChatbox(message, role) 
{
  const chatMessages = document.getElementById("chat-messages");
  const messageElement = document.createElement("p");
  messageElement.innerText = message;

  if (role === "user") 
  {
    messageElement.classList.add("user-message");
  } 
  else if (role === "assistant") 
  {
    messageElement.classList.add("ai-message");
  } 
  else 
  {
    messageElement.classList.add("system-message");
  }

  chatMessages.appendChild(messageElement);
}

// Handle the send button click event
document.getElementById("send-button").addEventListener("click", function () 
{
  const userInput = document.getElementById("user-input");
  const message = userInput.value;

  if (message) 
  {
    addMessageToChatbox(message, "user");
    messages.push({ role: "user", content: message });
    getMessage();
    userInput.value = "";
  }
});

// Handle the clear memory button click event
document.getElementById("clear-memory-button").addEventListener("click", function () 
{
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.innerHTML = "";
  chrome.storage.sync.remove(currentUrl, function () 
  {
    var systemMessage = "Memory cleared for the current website.";
    addMessageToChatbox(systemMessage, "system");
  });

  // Reset the messages array
  messages = [];
  messages.push({ role: "system", content: systemPrompt });
});