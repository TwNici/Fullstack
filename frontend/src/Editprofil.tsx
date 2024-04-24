import Layout from "./Layout.tsx";

function Editprofil() {
    return(
        <div>
            <Layout />
            <div id="editdatencanvasPW" className="canvas">
                <div className="InputfelderDesign" >
                <label><h5 id="PWresetPOS">Passwort Reset</h5></label>
                <input id="InputFelderEdit1" placeholder="Neues Passwort" type="Password" />
                <input id="InputFelderEdit2" placeholder="Neues Passwort Widerholen" type="Password" />
                </div>
            </div>
            <div id="editdatencanvasPICTURE" className="canvas">
                <label htmlFor="dragDropEdit" className="adressbuchbutton">Bild Hochladen / PNG</label>
                <input  id="dragDropEdit" type="file" name="bildUrl" required />
            </div>

            <div id="showeditPicture" className="canvas"></div>
            <div id="showeditProfil" className="canvas" ></div>
        </div>
    );
}

export default Editprofil;