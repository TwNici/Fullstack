import Adressbuch from './Adressbuch.tsx';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Createmitarbeiter from "./createmitarbeiter.tsx";
import Profilanpassen from "./profilanpassen.tsx";
import Erweitertesuche from "./erweitertesuche.tsx";
import Loginpage from "./Loginpage.tsx";
import Editprofil from "./Editprofil.tsx";
import AllInfos from "./Allinfos.tsx";
import CoopGPT from "./CoopGPT.tsx"
import MobilefirstLayouttest from "./mobilefirstLayouttest.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from "./404Page.tsx";
import ForbiddenPage from "./403Page.tsx";
import React, {createContext, useState} from "react";

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



export const ProtectedRoute = ({children}: {
    children: JSX.Element;
}) => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
        return <Navigate to="/forbidden" replace/>;
    }

    return children;


};







export type AuthenticationResponse = {
    token: string;
}

type UserContextType = {
    userId: string;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType>({
    setUserId(): void {
    }, userId: ""
});

const App = () => {
    const [userIdForBigPicture, setUserIdForBigPicture] = useState<string>("")
    const navigate = useNavigate();



    return (
        <div>
            <UserContext.Provider value={{userId: userIdForBigPicture, setUserId: setUserIdForBigPicture}}>
            <Routes>
                <Route path="/forbidden" element={<ForbiddenPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="/" element={<ProtectedRoute><Adressbuch/></ProtectedRoute>} />
                <Route path="/createmitarbeiter" element={<ProtectedRoute><Createmitarbeiter /></ProtectedRoute>} />
                <Route path="/profilanpassen" element={<ProtectedRoute>< Profilanpassen/></ProtectedRoute>} />
                <Route path="/erweitertesuche" element={<ProtectedRoute>< Erweitertesuche/></ProtectedRoute>} />
                <Route path="/Login" element={<Loginpage navigate={navigate}/>}  />
                <Route path="/edit" element={<ProtectedRoute>< Editprofil/></ProtectedRoute>} />
                <Route path="/allinfos" element={<ProtectedRoute><AllInfos/></ProtectedRoute>} />
                <Route path="/CoopGPT" element={<ProtectedRoute><CoopGPT /></ProtectedRoute>} />
                <Route path="/mobilefirstLayouttest" element={<ProtectedRoute><MobilefirstLayouttest /></ProtectedRoute>} />
            </Routes>
            </UserContext.Provider>
        </div>
    );
}

export default App;
