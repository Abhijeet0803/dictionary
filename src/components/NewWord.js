import React, { useState } from "react";
import axios from "axios";
import history from "../history";
import "./new.css"

const NewWord = (props) => {

    const [newWord, setNewWord] = useState("");                 // to store the value of new word entered by user

    const handleChange = (e) => {
        setNewWord(e.target.value);                             
    }

    const postword = async(word) =>{                                    // function to send the post request to backend server with new word
         await axios.post('http://localhost:4000/new', {
            word: newWord,
          }).then(response => {
              //console.log(response)
              props.setLoading(prev => !prev);
          })
          
    }

    const handleAdd = (e) => {                  // function to add the word in mongo db and go back to home page
        if(newWord){
            postword(newWord);
            history.push(`/`);
        }
        
    }

    const handleBack = (e) => {                 // On back button click go to home page 
        history.push(`/`)
    }

    return(
        <div className="bigbox">
        <div className="form">
            <h2>Add in Dictionary</h2>
                <input type="text" placeholder="New Word" onChange={handleChange} required/>
                <div className="buttons">
                    <button type="button" onClick={handleBack}>Back</button>
                    <button type="submit" onClick={handleAdd}>Add</button>
                </div>
        </div>
        </div>
    )
}

export default NewWord;