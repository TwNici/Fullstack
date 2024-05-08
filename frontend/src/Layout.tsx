import { To, useNavigate} from 'react-router-dom';
import './App.css';

function Layout() {
    const navigate = useNavigate();
    const handleChange = (event: { target: { value: To; }; }) => {
        navigate(event.target.value);
    };
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
            <div id="uppercanvas"><h4 onClick={suchenav}>Adressbuch</h4> <h6 id="Profillist">
                <select onChange={handleChange} className="adressbuchbutton" id={"dropdownLAYOUT"}>
                    <option value="">Profil</option>
                    <option value="/edit">Profil bearbeiten</option>
                    <option value="/Login">Logout</option>

                </select></h6></div>
            <div className={"circles"}></div>
            <div className={"circles2"}></div>
            <div className={"circles3"}></div>
        </div>
    );
}

export default Layout;
