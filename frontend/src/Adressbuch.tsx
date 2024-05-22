import axios, {AxiosResponse} from 'axios';
import './App.css';
import {useContext, useEffect, useState} from "react";
import Layout from "./Layout.tsx";
import {FormInputType, roleType, UserContext} from "./App.tsx";
import {useNavigate} from 'react-router-dom';
import "./CSS/AdressbuchSide.css"

function Adressbuch() {
    const [mitarbeiter, setMitarbeiter] = useState<FormInputType[]>([]);
    const [suchbegriff, setSuchbegriff] = useState('');
    const [gefilterteMitarbeiter, setGefilterteMitarbeiter] = useState<FormInputType[]>([]);
    const {setUserId} = useContext(UserContext)
    const [rolle, setRole] = useState<roleType>(roleType.USER);

    const formatBase64Image = (data: string): string => {
        if (data && !data.startsWith('data:image')) {
            return `data:image/png;base64,${data}`;
        }
        return data;
    };

    useEffect(() => {
        axios.get("/api/user/getrole", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        }).then((res: AxiosResponse<roleType>) => {
            setRole(res.data);
        })
        axios.get('/api/user/mitarbeiter', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        })
            .then((response: AxiosResponse<FormInputType[]>) => {
                setMitarbeiter(response.data);
                console.log(response.data)
                setGefilterteMitarbeiter(response.data);
            })
            .catch(error => {
                console.error('FR to backend:', error);
            });
    }, []);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const gefiltert = mitarbeiter.filter(m => {
            const fullName = `${m.name.toLowerCase()} ${m.nachname.toLowerCase()}`;
            return (
                fullName.includes(suchbegriff.toLowerCase()) ||
                m.name.toLowerCase().includes(suchbegriff.toLowerCase()) ||
                m.nachname.toLowerCase().includes(suchbegriff.toLowerCase()) ||
                m.userid.toLowerCase().includes(suchbegriff.toLowerCase())
            );
        });
        setGefilterteMitarbeiter(gefiltert);
    };


        const navigate = useNavigate();

    const AdressbuchBildClick = (userId: string) => {
        setUserId(userId);
        navigate("/InfoOverview");
    };

    return (
        <div>
            <Layout />
            <div id={"DivCanvasDel"}></div>
            <div id="suchleistencanvas" className={"shadow-and-radius"}>
                <form onSubmit={handleSubmit}>
                    <input
                        id="suchleiste"
                        className={"shadow-and-radius"}
                        type="search"
                        placeholder="Mitarbeiter Suchen..."
                        value={suchbegriff}
                        onChange={(e) => setSuchbegriff(e.target.value)}

                    />
                    <button id={"suchenButtonAdressbuch"} className={"btn-layout shadow-and-radius"} type="submit">Suchen</button>
                </form>
                <div id="treffertext" className={"shadow-and-radius"}>Treffer: {gefilterteMitarbeiter.length}</div>
            </div>
            <div id="datencanvas">
                {Array.isArray(gefilterteMitarbeiter) &&  gefilterteMitarbeiter.map((mitarbeiter, index) => (
                    <div className="canvas-container flex-container shadow-and-radius" key={index}>
                        <div id={"mdatentext"} className={"shadow-and-radius"} onClick={() => {AdressbuchBildClick(mitarbeiter.userid)}}>
                            {mitarbeiter.bildUrl && <img  src={formatBase64Image(mitarbeiter.bildUrl)} className={"shadow-and-radius"} id="BildAdressbuch" alt="BILD"/>}
                            <p> <b>{mitarbeiter.name} {mitarbeiter.nachname} <i>({mitarbeiter.userid}) </i> </b></p>
                            <p>Tele: {mitarbeiter.telefonnummer}</p>
                            <p>Ort: {mitarbeiter.ort}</p>
                            <p>Geschlecht: {mitarbeiter.geschlecht}</p>
                            {rolle == roleType.ADMIN && <p>Rolle: {mitarbeiter.rolle}</p>}


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Adressbuch;
