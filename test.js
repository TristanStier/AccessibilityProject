async function sendFetch(message) 
{
    const apiKey = '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';
    const data = 
    {
        prompt: `${message}`,
        max_tokens: 50,
    };

    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';

    try 
    {
        const response = await fetch(apiUrl, 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) 
        {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const responseJson = await response.json();
        console.log(responseJson.choices[0].text);
    }
    catch (error) 
    {
        console.error('Error:', error);
    }
}

sendFetch("Translate this to french: Hello I speak bad english");