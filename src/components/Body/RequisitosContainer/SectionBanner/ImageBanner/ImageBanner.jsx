import React from "react";
import "./ImageBanner.scss";

import imagen from "./../../../../../assets/img/requisitos.png";

const ImageBanner = () => {
    return (
    <figure className="imagebanner">
        <img src={imagen} alt="Baner" />
    </figure>)
}

export default ImageBanner