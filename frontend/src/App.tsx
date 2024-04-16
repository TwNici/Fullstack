import Adressbuch from './Adressbuch.tsx';
import {Route, Routes} from "react-router-dom";
import Createmitarbeiter from "./createmitarbeiter.tsx";



const App = () => {
    return(
                <Routes>
                    <Route path={"/"} element={<Adressbuch/>}/>
                    <Route path={"/createmitarbeiter"} element={<Createmitarbeiter/>}/>
                    <Route path={"/profilanpassen"} element={<Createmitarbeiter/>}/>
                    <Route path={"/erweitertesuche"} element={<Createmitarbeiter/>}/>
                </Routes>
    );
}









export default App;
