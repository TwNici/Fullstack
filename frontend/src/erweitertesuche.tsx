
import {useState} from "react";
import Layout from "./Layout.tsx";

type suchType = {
    criteria: string;
    operator: string;
    userdata: string;
}

function Erweitertesuche() {

    const [suche, setSuche] = useState<suchType>({
        criteria: "",
        operator: "",
        userdata: "",
    })

    const [isNumber, setIsNumber] = useState<boolean>(false)

    const handleNumChange = (value: string) => {
        if (value === "Stock" || value === "Pultnummer"){
            setIsNumber(true);
        } else {
            setIsNumber(false);
        }
    }

    const handleChange = (name: string, value: string) => {
        setSuche({
            ...suche,
            [name]: value
        })
    }

    return (
        <div>
            <div id={"DivCanvasDel"}></div>
            <div id="suchleistencanvas" className={"shadow-and-radius"}>

                {/*}<form onSubmit={}>{*/}
                <input name={"criteria"} className={"shadow-and-radius"} id="suchleiste" placeholder="Suchkriterium..." type={"search"} onChange={(e) => {
                    e.preventDefault();
                    handleChange(e.target.name, e.target.value);
                }}/>
                {/*}</form>{*/}


                <select id="operator" name="operator" className={"shadow-and-radius"} onChange={(e) => {
                    e.preventDefault();
                    handleChange(e.target.name, e.target.value)}}>
                    <option value="=">=</option>
                    {isNumber && <option value=">"> {">"} </option>}
                    {isNumber && <option value=">="> {">="} </option>}
                    {isNumber && <option value="<"> {"<"} </option>}
                    {isNumber && <option value="<=">{"<="}</option>}
                    <option value="≠">≠</option>
                </select>
                <select className={"shadow-and-radius"} id="userdata" name="userdata" onChange={(e) => {
                    e.preventDefault();
                    handleNumChange(e.target.value)
                    handleChange(e.target.name, e.target.value);}}>
                    <option value="Nachname">Nachname</option>
                    <option value="Vorname"> Vorname</option>
                    <option value="UserID"> UserID</option>
                    <option value="Geschlecht"> Geschlecht </option>
                    <option value="Telefon">Telefon</option>
                    <option value="Ort">Ort</option>
                    <option value="Strasse">Strasse</option>
                    <option value="Privat Adresse">Privat Adresse</option>
                    <option value="Geschäfts Adresse">Geschäfts Adresse</option>
                    <option value="Stock">Stock</option>
                    <option value="Pultnummer">Pultnummer</option>
                    <option value="Gebäude">Gebäude</option>
                </select>
                <div id="treffertext" className={"shadow-and-radius"}>Treffer: </div>

            </div>
            <Layout />
            <div id="datencanvas">


                    </div>

            </div>
    );

}
export default Erweitertesuche