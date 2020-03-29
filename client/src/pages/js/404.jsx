import React from "react";
import flaticon from "../images/404.png";
import "../styles/404.scss";

function NotFoundPage() {
  return (
    <div className="not-found">
      <img
        src={flaticon}
        alt="Icône représentant une erreur 404"
        height="300px"
        width="300px"
      />
      <h2>Et tu croyais aller où comme ça ? Aller ! Demi tour !</h2>
    </div>
  );
}

export default NotFoundPage;
