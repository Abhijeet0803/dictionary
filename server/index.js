import express from "express";
import mongoose from "mongoose";
import https from "https";
import cors from 'cors';        

var app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())
//-------------------------- Oxford API -----------------------------------//
const app_id = "037ae613"; // insert your APP Id
const app_key = "ec86045665eec0c9fb0c28f9ce4e8205"; // insert your APP Key
const fields = "definitions,examples";
const strictMatch = "false";



let body = '';  //



//-----------------------Database---------------------------//

mongoose.connect("mongodb+srv://admin:admin@cluster0.rwluj.mongodb.net/wordsDB",{useNewUrlParser: true, useUnifiedTopology: true});

const wordSchema = new mongoose.Schema({
  name: String,
  meaning: []
})

const Word = mongoose.model("Word", wordSchema);

//----------------------API-------------------------------//

app.get("/api", (req, res)=>{
  Word.find((err,words) => {
    if(!err){
      //console.log(words);
      res.send(words);
    }
  });
})

app.post("/new", (req,res) => {

  //console.log(req.body.word);      
   const wordId = req.body.word;       // get the new word from frontend

  const options = {
    host: 'od-api.oxforddictionaries.com',
    port: '443',
    path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
    method: "GET",
    headers: {
      'app_id': app_id,
      'app_key': app_key
    }
  };

  https.get(options, (resp) => {            // Oxford api call
    let response ="";
    resp.on('data', (d) => {
        response += d;
    });
    resp.on('end', () => {
       // console.log(response);             //The definition and data will come here.
        body = response;                    //to use the available response globally
        let data = JSON.parse(response);
        const word = new Word({
          name: wordId,                                                   //creating new variable to store in mongoDB
          meaning: data.results[0].lexicalEntries[0].entries[0].senses
        })
        
        word.save();                                                        //saving in mongoDB
      // console.log(data.results[0].lexicalEntries[0].entries[0].senses)  // filtering the unnecessary data
      res.send({done:1});                                           // to send some response only no use after that.
    });
});


})

app.listen(4000, () => {                                // setting the server in port 4000
    console.log("server started");
});

//