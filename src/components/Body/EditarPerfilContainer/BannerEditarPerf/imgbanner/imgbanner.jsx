import React from "react";
import "./imgbanner.scss";

import banneredit from "../src/assets/img/editarperfil.png";

const imgbanner = () => {
    return (
    <figure className="imgbanner">
        <img src={ banneredit} alt="Baner" />
    </figure>)
}

export default imgbanner