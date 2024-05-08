import Adressbuch from './Adressbuch.tsx';
import {Route, Routes, useNavigate} from "react-router-dom";
import Createmitarbeiter from "./createmitarbeiter.tsx";
import Profilanpassen from "./profilanpassen.tsx";
import Erweitertesuche from "./erweitertesuche.tsx";
import Loginpage from "./Loginpage.tsx";
import Editprofil from "./Editprofil.tsx";
import AllInfos from "./Allinfos.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';

export enum roleType {
    ADMIN = "ADMIN",
    USER = "USER",
}


export type FormInputType = {
    initialPW: string;
    rolle: roleType;
    stock: number;
    geschaeftsadresse: string;
    ort: string;
    userid: string;
    pultnummer: number;
    gebaeude: string;
    telefonnummer: string;
    name: string;
    nachname: string;
    geschlecht: string;
    bildUrl: string;
};

export type UserInfo = {
    rolle: roleType;
    stock: number;
    geschaeftsadresse: string;
    ort: string;
    userid: string;
    pultnummer: number;
    gebaeude: string;
    telefonnummer: string;
    name: string;
    nachname: string;
    geschlecht: string;
    bildUrl: string;
}

export type AuthenticationResponse = {
    token: string;
}

const App = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Routes>
                <Route path="/" element={<Adressbuch />} />
                <Route path="/createmitarbeiter" element={<Createmitarbeiter />} />
                <Route path="/profilanpassen" element={< Profilanpassen/>} />
                <Route path="/erweitertesuche" element={< Erweitertesuche/>} />
                <Route path="/Login" element={<Loginpage navigate={navigate}/>}  />
                <Route path="/edit" element={< Editprofil/>} />
                <Route path="/allinfos" element={<AllInfos />} />
            </Routes>
        </div>
    );
}









export default App;
