import React from "react";
import ReactSVG from "react-svg";
import "./scss/cardHeader.scss";

import editActive from "../images/edit-active.svg";
import edit from "../images/edit.svg";

export interface ICardHeader {
  onClick?: () => void;
  title: string;
  editing?: boolean;
}

const CardHeader: React.FC<ICardHeader> = ({ title, editing, onClick }) => (
  <div className="card-header">
    <div>{title}</div>
    {onClick ? (
      <div className="card-header__button" onClick={onClick}>
        <ReactSVG path={editing ? editActive : edit} />
      </div>
    ) : (
      ""
    )}
  </div>
);

export default CardHeader;
