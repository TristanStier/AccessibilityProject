    const endpointUrl_Turbo = "https://api.openai.com/v1/chat/completions";
    var apiKey = "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";
    var systemPrompt="You are a personal tech assistant that aims to help people navigate websites. Given the context, provide answers to the questions.";
  
    fetch(
        endpointUrl_Turbo,
        {
         body: JSON.stringify({"model": "gpt-4", 
          "messages": [
              {
                role: "user",
                content: "Hello, what steps do I need to take to make a new repository on github?",            
              },
              {
                role: "system",
                content: systemPrompt,            
              }
           ], 
         "temperature": 0,
         "max_tokens":500}),
         method: "POST",
         headers: {
             "content-type": "application/json",
             Authorization: "Bearer "+ apiKey,
         },
             }
 ).then((response) => {
     if (response.ok) {
         response.json().then((json) => {           
             console.log(json['choices'][0]['message']['content']);         
           });
     }
 });