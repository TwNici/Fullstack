import Adressbuch from './Adressbuch.tsx';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Createmitarbeiter from "./createmitarbeiter.tsx";
import AdvancedSearch from "./AdvancedSearch.tsx";
import Loginpage from "./Loginpage.tsx";
import EditUserProfile from "./EditUserProfile.tsx";
import InfoOverview from "./InfoOverview.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from "./404Page.tsx";
import ForbiddenPage from "./403Page.tsx";
import React, {createContext, useState} from "react";
import AdjustProfile from "./AdjustProfile.tsx";
import SecuredRoute from "./SecuredRoute.tsx";
import Mitarbeiterlist from "./Mitarbeiterlist.tsx";
import MitarbeiterlistAdvanced from "./MitarbeiterlistAdvanced.tsx";

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
                <Route path="/createmitarbeiter" element={<SecuredRoute><ProtectedRoute><Createmitarbeiter /></ProtectedRoute></SecuredRoute>} />
                <Route path="/AdjustProfile" element={<SecuredRoute><ProtectedRoute>< AdjustProfile/></ProtectedRoute></SecuredRoute>} />
                <Route path="/AdvancedSearch" element={<ProtectedRoute>< AdvancedSearch/></ProtectedRoute>} />
                <Route path="/Login" element={<Loginpage navigate={navigate}/>}  />
                <Route path="/EditUserProfile" element={<ProtectedRoute>< EditUserProfile/></ProtectedRoute>} />
                <Route path="/InfoOverview" element={<ProtectedRoute><InfoOverview/></ProtectedRoute>} />
                <Route path="/Mitarbeiterlist" element={<ProtectedRoute><Mitarbeiterlist/></ProtectedRoute>} />
                <Route path="/MitarbeiterlistAdvanced" element={<ProtectedRoute><MitarbeiterlistAdvanced/></ProtectedRoute>} />
            </Routes>
            </UserContext.Provider>
        </div>
    );
}

export default App;
