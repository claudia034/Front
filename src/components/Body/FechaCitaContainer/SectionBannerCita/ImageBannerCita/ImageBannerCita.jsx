import React from "react";
import "./ImageBannerCita.scss";

import seleccionarFecha from "./../../../../../assets/imgseleccionarfecha.png";

const ImageBannerCita = () => {
    return (
    <figure className="imagebannercita">
        <img src={seleccionarFecha} alt="Baner" />
    </figure>)
}

export default ImageBannerCita