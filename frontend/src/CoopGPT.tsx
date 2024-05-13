import React, { useState } from 'react';
import Layout from "./Layout.tsx";

const DatenAnfrage: React.FC = () => {
    const [model, setModel] = useState<string>('gpt-3.5-turbo');
    const [userQuery, setUserQuery] = useState<string>('');
    const [response, setResponse] = useState<string>('');

    const fetchData = async () => {
        const apiKey = "sk-proj-ToWTeU4JbcoYKAiU0SyNT3BlbkFJ7094Fd7JQbj1Io18cRS9";
        const data = {
            model: model,
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: userQuery }
            ]
        };

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const jsonData = await response.json();
            if (jsonData.error) {
                setResponse(`Fehler: ${jsonData.error.message}`);
            } else {
                setResponse(JSON.stringify(jsonData, null, 2));
            }
        } catch (error) {
            console.error('Error:', error);

        }
    };


    return (
        <div>
            <Layout />
            <div id={"left"}>
                <h1>Frage mich etwas (Coop GPT)</h1>
                <label htmlFor="modelSelect">Wähle ein Modell:</label>
                <select id="modelSelect" value={model} onChange={e => setModel(e.target.value)}>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                </select>
                <input
                    type="text"
                    id="userQuery"
                    placeholder="Stelle deine Frage"
                    value={userQuery}
                    onChange={e => setUserQuery(e.target.value)}
                />
                <button onClick={fetchData}>Frage Coop</button>
                <div id="response">{response}</div>
            </div>
        </div>
    );
};

export default DatenAnfrage;
