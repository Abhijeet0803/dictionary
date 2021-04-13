import React, { useState } from "react";
import {withRouter} from 'react-router';
import history from "../history";
import "./home.css"
import Card from "./Card";


const Home = (props) => {
    
    const [filterWord, setFilterWord] = useState("");                  // stores the value enterd in searchbar

    const handleChange = (e) => {
           setFilterWord(e.target.value);
    }

    

     const data = props.data; 
     

     //console.log(data);
    

    const filterData = data.filter( ele => ele.name.includes(filterWord.toLowerCase()));            // filtering the data based on search bar

    return (
        <div className="wrapper">
            <nav>
                <h2 className="heading">Vocab</h2>
                <input type="text" placeholder="Search..." onChange={handleChange}></input>
            </nav>
            <div className="main">
            {filterData.map(word => <Card key={word.id} name={word.name} meaning={word.meaning[0].definitions} id={word._id} />)}
            </div>
            <div className="button">
            <button type="button" onClick={ () => history.push(`/new`)}>New Word</button>
            </div>
            
        </div>
    )
}

export default withRouter(Home);