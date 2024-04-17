import { useNavigate } from 'react-router-dom';
import './App.css';

function Layout (){
    const navigate = useNavigate();

    const mitarbeiternav = () => {
        navigate("/createmitarbeiter");
    };
    const suchenav = () => {
        navigate("/");
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
                        Suche
                    </button>
                    <button className="adressbuchbutton" onClick={erweitertesuchenav}>
                        Erweiterte Suche
                    </button>
                    <button className="adressbuchbutton" onClick={mitarbeiternav}>
                        Neue Mitarbeiter eintragen
                    </button>
                    <button className="adressbuchbutton" onClick={profilanpassennav}>
                        Profil anpassen
                    </button>
                </div>
            <div id="uppercanvas"><h4>Adressbuch</h4> </div>
            <div className={"circles"}></div>
            <div className={"circles2"}></div>
            <div className={"circles3"}></div>
        </div>
    );
}

export default Layout;
