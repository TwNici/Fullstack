import Adressbuch from './Adressbuch.tsx';
import {Route, Routes} from "react-router-dom";
import Createmitarbeiter from "./createmitarbeiter.tsx";
import Profilanpassen from "./profilanpassen.tsx";
import Erweitertesuche from "./erweitertesuche.tsx";
import Layout from "./Layout.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';



export type FormInputType = {
    stock?: number;
    geschaeftsadresse: string;
    privatadresse: string;
    strasse: string;
    ort: string;
    userid?: string;
    pultnummer?: number;
    gebaeude: string;
    telefonnummer: string;
    id?: number;
    name: string;
    nachname: string;
    geschlecht: string;
    bildUrl: string;
    newUserid?: string;
};

const App = () => {

    return (
        <div>
            <Layout />
            <Routes>
                <Route path="/" element={<Adressbuch />} />
                <Route path="/createmitarbeiter" element={<Createmitarbeiter />} />
                <Route path="/profilanpassen" element={< Profilanpassen/>} />
                <Route path="/erweitertesuche" element={< Erweitertesuche/>} />
            </Routes>
        </div>
    );
}









export default App;
