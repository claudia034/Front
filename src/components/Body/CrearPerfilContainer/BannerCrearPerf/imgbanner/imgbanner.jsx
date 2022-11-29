import React from "react";
import "./imgbanner.scss";

import banner from "./../../../../../assets/img/crearperfil.png";

const imgbanner = () => {
    return (
    <figure className="imgbanner">
        <img src={ banner} alt="Baner" />
    </figure>)
}

export default imgbanner