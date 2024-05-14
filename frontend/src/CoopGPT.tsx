import React, { useState } from 'react';

import './App.css';
import axios from "axios";

const App: React.FC = () => {
    const [model, setModel] = useState<string>('gpt-3.5-turbo');
    const [userQuery, setUserQuery] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        const data = {
            model: model,
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: userQuery }
            ]
        };

        try {
            setLoading(true);
            const response = await axios.post('/api/openai', data);
            setResponse(response.data.choices[0].message.content);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
                setResponse(`Fehler: ${error.response?.data.message}`);
            } else {
                console.error('Unexpected error:', error);
                setResponse('Fehler: Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Coop GPT</h1>
                <div>
                    <label htmlFor="modelSelect">Modell</label>
                    <select id="modelSelect" value={model} onChange={e => setModel(e.target.value)}>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        <option value="gpt-4">GPT-4</option>
                    </select>
                </div>
                <div>
                    <input
                        type="text"
                        id="userQuery"
                        placeholder="Stelle deine Frage"
                        value={userQuery}
                        onChange={e => setUserQuery(e.target.value)}
                    />
                </div>
                <button onClick={fetchData} disabled={loading}>
                    {loading ? 'Laden...' : 'Frage Coop'}
                </button>
                <div id="response">
                    <pre>{response}</pre>
                </div>
            </header>
        </div>
    );
};

export default App;
