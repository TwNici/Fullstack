import axios, {AxiosResponse} from 'axios';
import {useContext, useEffect, useState} from "react";
import Layout from "./Layout.tsx";
import {FormInputType, roleType, UserContext} from "./App.tsx";
import "./CSS/AdvancedSearch.css";
import { useNavigate} from "react-router-dom";
import "./CSS/Mitarbeiterlist.css"
type suchType = {
    criteria: string;
    operator: string;
    userdata: keyof FormInputType;
};

function MitarbeiterlistAdvanced() {
    const [suche, setSuche] = useState<suchType>({
        criteria: "",
        operator: "=",
        userdata: "nachname"
    });
    const [isNumber, setIsNumber] = useState<boolean>(false);
    const [mitarbeiter, setMitarbeiter] = useState<FormInputType[]>([]);
    const [gefilterteMitarbeiter, setGefilterteMitarbeiter] = useState<FormInputType[]>([]);
    const {setUserId} = useContext(UserContext)
    const [rolle ] = useState<roleType>(roleType.USER);
    useEffect(() => {
        axios.get('/api/user/mitarbeiter', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        })
            .then((response: AxiosResponse<FormInputType[]>) => {
                setMitarbeiter(response.data);
                setGefilterteMitarbeiter(response.data);
            })
            .catch(error => {
                console.error('Error backend', error);
            });
    }, []);

    const handleNumChange = (value: keyof FormInputType) => {
        if (value === "stock" || value === "pultnummer") {
            setIsNumber(true);
        } else {
            setIsNumber(false);
        }
    };

    const handleChange = (name: string, value: string) => {
        setSuche({
            ...suche,
            [name]: value
        });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const { criteria, operator, userdata } = suche;

        const gefiltert = mitarbeiter.filter(m => {
            let data = m[userdata];

            if (data == null) {
                return false;
            }

            if (isNumber && !isNaN(Number(data))) {
                data = Number(data);
            } else {
                data = data.toString().toLowerCase();
            }

            const criteriaLower = criteria.toLowerCase();

            switch (operator) {
                case '=':
                    return data === criteriaLower;
                case '≠':
                    return data !== criteriaLower;
                case '>':
                    return data > criteriaLower;
                case '>=':
                    return data >= criteriaLower;
                case '<':
                    return data < criteriaLower;
                case '<=':
                    return data <= criteriaLower;
                default:
                    return false;
            }
        });

        setGefilterteMitarbeiter(gefiltert);
    };

    const navigate = useNavigate();


    const suchenav = (event: React.ChangeEvent<HTMLSelectElement>) => {
        navigate(event.target.value);
    };
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
                        name="criteria"
                        className={"shadow-and-radius"}
                        id="suchleiste"
                        placeholder="Suchkriterium..."
                        type="search"
                        onChange={(e) => {
                            e.preventDefault();
                            handleChange(e.target.name, e.target.value);
                        }}
                    />
                    <select
                        id="operator"
                        name="operator"
                        className={"shadow-and-radius"}
                        onChange={(e) => {
                            e.preventDefault();
                            handleChange(e.target.name, e.target.value);
                        }}
                    >
                        <option value="=">=</option>
                        {isNumber && <option value=">">{">"}</option>}
                        {isNumber && <option value=">=">{">="}</option>}
                        {isNumber && <option value="<">{"<"}</option>}
                        {isNumber && <option value="<=">{"<="}</option>}
                        <option value="≠">≠</option>
                    </select>
                    <select
                        className={"shadow-and-radius"}
                        id="userdata"
                        name="userdata"
                        onChange={(e) => {
                            e.preventDefault();
                            handleNumChange(e.target.value as keyof FormInputType);
                            handleChange(e.target.name, e.target.value);
                        }}
                    >
                        <option value="nachname">Nachname</option>
                        <option value="name">Vorname</option>
                        <option value="userid">UserID</option>
                        <option value="geschlecht">Geschlecht</option>
                        <option value="telefonnummer">Telefon</option>
                        <option value="ort">Ort</option>
                        <option value="strasse">Strasse</option>
                        <option value="privatAdresse">Privat Adresse</option>
                        <option value="geschaeftsAdresse">Geschäfts Adresse</option>
                        <option value="stock">Stock</option>
                        <option value="pultnummer">Pultnummer</option>
                        <option value="gebaeude">Gebäude</option>
                    </select>
                    <button id={"suchenButtonErweitert"} className={"btn-layout shadow-and-radius"} type="submit">Suchen</button>
                </form>
                <select onChange={suchenav} id="optionset-list" className="btn-layout shadow-and-radius">
                    <option>List</option>
                    <option value="/AdvancedSearch">Visitenkarte</option>
                </select>

                <div id="treffertext" className={"shadow-and-radius"}>Treffer: {gefilterteMitarbeiter.length}</div>

            </div>
            <div id="mitarbeiterlist-infocanvas" className={"shadow-and-radius"}><b>NameㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤNachnameㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤUserIDㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤTelefonnummerㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤOrtㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤGeschlechtㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤRolle</b></div>

            <div id="datencanvas-mitabeiterlist">
                {gefilterteMitarbeiter.map((mitarbeiter, index) => (
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

export default MitarbeiterlistAdvanced;
