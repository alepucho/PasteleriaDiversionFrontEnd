import { AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/userService";
import Logo from "../assets/Logomamita.jpg";
import "./Header.css";

export default function Header() {
    const isLoggedIn = localStorage.getItem("access_token") !== null;

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }
    return (
        <>
            <header>
                <div className="pasteleria-navbar">
                    <AppBar position="static">
                        <Toolbar>
                            <div className="image-container">
                                <img src={Logo} alt="Pastelería Diversion Logo" height={100} />
                            </div>
                        </Toolbar>
                        <Toolbar>
                            <Button color="inherit" href="/">Inicio</Button>
                            <Button color="inherit" href="/clientes">Clientes</Button>
                            {isLoggedIn && (
                                <>
                                    <Button color="inherit" href="/add-pedido">Crear Pedido</Button>
                                    <Button color="inherit" href="/add-cliente">Crear Cliente</Button>
                                    <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
                                </>
                            )}
                            {!isLoggedIn && (
                                <Button color="inherit" href="/login">Iniciar Sesión</Button>
                            )}
                        </Toolbar>
                    </AppBar>
                </div>
            </header>
        </>
    );
}