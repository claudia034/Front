import React from "react";
import "./Image.scss";

import img from "../src/assets/img/perfil.png";

const Image = () => {
    return (
    <figure className="image">
        <img src={img} alt="Imagen Donación" />
    </figure>)
}

export default Image