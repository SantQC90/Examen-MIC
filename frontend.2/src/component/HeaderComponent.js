import React from "react";

export const HeaderComponent = () =>{
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div>
                    <a href="/" className="navbar-brand">Inmuebles</a>
                    <a href="/" className="navbar-brand">Arriendo</a>
                    <a href="/" className="navbar-brand">Clientes</a>
                    <a href="/" className="navbar-brand">Pagos</a>
                </div>
            </nav>
        </div>
    )
}
export default HeaderComponent;