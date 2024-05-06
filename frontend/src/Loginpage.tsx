



function Login() {
    return (
        <div id="AdressbuchCanvas">
            <form className="LoginInputfelder">
                <div id="AdressbuchBild"></div>
                <label htmlFor="EmailLogin">Email:</label>
                <input id="EmailLogin" type="email" name="email" required />

                <label htmlFor="PasswortLogin">Passwort:</label>
                <input id="PasswortLogin" type="password" name="password" required />

                <button className="adressbuchbutton" type="submit">Login</button>
            </form>
        </div>
    );
}


export default Login;