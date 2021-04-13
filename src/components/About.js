import React from "react";
import {useLocation} from "react-router-dom";
import history from "../history";
import {withRouter} from 'react-router';
import './about.css';

const About = (props) => {

    const id = new URLSearchParams(useLocation().search).get("id");      // gettting the id from the url 
    const data = props.data;
    const details = data.filter(ele => id===ele._id);                   // searching the word in data using filter method

    const handleClick = (e) => {
        history.push(`/`)                                               // on back button click go to home page 
    }
    

    return (
        <div className="big">
            <h2 className="title">{details[0].name}</h2>
            <div className="aboutBox">
                {details[0].meaning.map(ele =>(
                    <div key={ele._id}>
                        <p>{ele.definitions}</p>
                        <ul>
                        {(ele.examples || []).map(ex => (
                           <li key={ex.text}>{ex.text}</li> 
                        ))}
                        </ul>
                    </div>
                ) )}
            </div>
            <button className="back" type="button" onClick={handleClick} >Back</button>
        </div>
    )
}

export default withRouter(About);