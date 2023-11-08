// // Function to send a message to the content script
// function sendMessageToContentScript(message) 
// {
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) 
//     {
//         if (chrome.runtime.lastError) 
//         {
//             console.error(chrome.runtime.lastError);
//             return;
//         }

//         const activeTab = tabs[0];

//         if (activeTab) 
//         {
//             chrome.scripting.executeScript
//             ({
//                 target: { tabId: activeTab.id },
//                 function:(message) => 
//                 {
//                     // Send a message to the content script
//                     chrome.tabs.sendMessage(activeTab.id, {"message": "sendMessage"});
//                 },
//                 args:[message],
//             });
//         }
//         else 
//         {
//             console.error("No active tab found.");
//         }
//     });
// }

// // Handle the send button click event
// document.getElementById('send-button').addEventListener('click', function () 
// {
    // const userInput = document.getElementById('user-input');
    // const message = userInput.value;

    // if (message) 
    // {
    //     sendMessageToContentScript(message);
    //     userInput.value = '';
    // }
// });

function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
    });
}

document.getElementById('send-button').addEventListener('click', function () {
    document.getElementById('send-button').addEventListener("click", popup());
});