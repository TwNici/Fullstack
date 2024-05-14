

import React, { useState } from 'react';
import "./CSS/CoopGPT.css";
import './App.css';
import axios from "axios";
import Layout from "./Layout";




 const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
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
            const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
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
            <Layout />
            <header className="App-header">
                <div id={"positionCoopGpt"} className={"shadow-and-radius"}>
                    <h1 id={"h1titleCoopGpt"} className={"shadow-and-radius"}>Coop GPT</h1>

                    <div>
                        <select className={"shadow-and-radius btn-layout"} id="modelSelect" value={model} onChange={e => setModel(e.target.value)}>
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
                    <button id={"btnPositionQuestion"} className={"btn-layout shadow-and-radius"} onClick={fetchData} disabled={loading}>
                        {loading ? 'Laden...' : 'Frage Coop'}
                    </button>
                    <div id="response" className={"shadow-and-radius"}>
                        <pre>{response}</pre>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default App;
