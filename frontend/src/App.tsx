import Adressbuch from './Adressbuch.tsx';
import {Route, Routes} from "react-router-dom";
import Createmitarbeiter from "./createmitarbeiter.tsx";
import Profilanpassen from "./profilanpassen.tsx";
import Erweitertesuche from "./erweitertesuche.tsx";
import Loginpage from "./Loginpage.tsx";
import Editprofil from "./Editprofil.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';



export type FormInputType = {
    initialPW: string;
    rolle: string;
    stock?: number;
    geschaeftsadresse: string;
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
            <Routes>
                <Route path="/" element={<Adressbuch />} />
                <Route path="/createmitarbeiter" element={<Createmitarbeiter />} />
                <Route path="/profilanpassen" element={< Profilanpassen/>} />
                <Route path="/erweitertesuche" element={< Erweitertesuche/>} />
                <Route path="/Login" element={< Loginpage/>} />
                <Route path="/edit" element={< Editprofil/>} />
            </Routes>
        </div>
    );
}









export default App;
