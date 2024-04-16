import { useNavigate } from 'react-router-dom';
import './App.css';

function MainPage() {
    const navigate = useNavigate();


    const mitarbeiternav = () => {
        navigate("/createmitarbeiter");
    };
    const suchenav = () => {
        navigate("/adressbuch");
    };
    const erweitertesuchenav = () => {
        navigate("/erweitertesuche");
    };
    const profilanpassennav = () => {
        navigate("/profilanpassen");
    };
    return (

        <div>


            <div id="leftcanvas" className="button-vertical">
            <button className="adressbuchbutton" onClick={suchenav}>
                <span>Suche</span></button>
            <button className="adressbuchbutton" onClick={erweitertesuchenav}>
                <span>Erweiterte Suche</span></button>
            <button className="adressbuchbutton" onClick={mitarbeiternav}>
                <span>Neue Mitarbeiter eintragen</span></button>
            <button className="adressbuchbutton" onClick={profilanpassennav}>
                <span>Profil anpassen</span></button>
            </div>

        </div>



    );

}

export default MainPage;
