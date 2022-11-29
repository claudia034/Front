import React from "react";
import "./ImageBannerCita.scss";

import image from "../src/assets/img/seleccionarfecha.png";

const ImageBannerCita = () => {
    return (
    <figure className="imagebannercita">
        <img src={image} alt="Baner" />
    </figure>)
}

export default ImageBannerCita