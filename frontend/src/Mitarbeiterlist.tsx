import Layout from "./Layout.tsx";
import {FormInputType, roleType, UserContext} from "./App.tsx";
import {useContext, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import "./CSS/Mitarbeiterlist.css"

function Mitarbeiterlist() {
    const [mitarbeiter, setMitarbeiter] = useState<FormInputType[]>([]);
    const [suchbegriff, setSuchbegriff] = useState('');
    const [gefilterteMitarbeiter, setGefilterteMitarbeiter] = useState<FormInputType[]>([]);
    const {setUserId} = useContext(UserContext)
    const [rolle, setRole] = useState<roleType>(roleType.USER);



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

    const AdressbuchTextClick = (userId: string) => {
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
            <div id="mitarbeiterlist-infocanvas" className={"shadow-and-radius"}><b>NameㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤNachnameㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤUserIDㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤTelefonnummerㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤOrtㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤGeschlechtㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤRolle</b></div>
            <div id="datencanvas-mitabeiterlist">
                {Array.isArray(gefilterteMitarbeiter) &&  gefilterteMitarbeiter.map((mitarbeiter, index) => (
                    <div className="canvas-container-mitabeiterlist flex-container-mitabeiterlist shadow-and-radius" key={index}>
                        <div id={"mdatentext-mitabeiterlist"}  onClick={() => {AdressbuchTextClick(mitarbeiter.userid)}}>
                            <p> <b>{mitarbeiter.name}ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ{mitarbeiter.nachname}ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ<i>({mitarbeiter.userid})ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</i>{mitarbeiter.telefonnummer}ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ{mitarbeiter.ort}ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ{mitarbeiter.geschlecht}ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</b>  {rolle == roleType.ADMIN && <b> {mitarbeiter.rolle}</b>}</p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Mitarbeiterlist;
