import {NavigateFunction} from "react-router-dom";
import {useState} from "react";
import axios, {AxiosResponse} from "axios";
import {AuthenticationResponse} from "./App.tsx";


type LoginProps = {
    navigate: NavigateFunction;
}

type AuthenticationRequestType = {
    "userid": string;
    "password": string;
}

export default function Login(navigate: LoginProps) {

    const [formData, setFormData] = useState<AuthenticationRequestType>({
        "userid": "",
        "password": ""
    });

    const HandleChange = (name: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = () => {
        axios.post("/api/authenticate", formData).then(
            (res: AxiosResponse<AuthenticationResponse>) => {
                if (res.data.token){
                    localStorage.setItem("jwt", res.data.token);
                    navigate.navigate("/");
                }
            }
        )
    }

    return <>
        <div id="AdressbuchCanvas">
            <form className="LoginInputfelder" onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
                <div id="AdressbuchBild"></div>
                <label htmlFor="EmailLogin">UserID:</label>
                <input id="EmailLogin" type="text" name="userid" required onChange={(e) => {e.preventDefault(); HandleChange(e.target.name, e.target.value)}}/>

                <label htmlFor="PasswortLogin">Passwort:</label>
                <input id="PasswortLogin" type="password" name="password" required onChange={(e) => {e.preventDefault(); HandleChange(e.target.name, e.target.value)}}/>

                <button className="adressbuchbutton" type="submit">Login</button>
            </form>
        </div>
    </>
}


