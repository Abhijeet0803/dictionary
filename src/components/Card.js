import React from "react";
import history from "../history";
import './card.css';

const Card = (props) => {

    

    const handleClick = () => {
        history.push(`/about?id=${props.id}`);      // passing the id using history 
    }

    return (
        <div className="card" onClick={handleClick}>
            <h4>{props.name}</h4>
            <p>{props.meaning}</p>
        </div>
    )
}

export default Card;