import React, { useEffect, useState } from "react";
import {
  Router,
  Switch,
  Route
} from "react-router-dom";
import history from "./history";
import axios from "axios";
import Home from "./components/Home";
import About from "./components/About";
import NewWord from "./components/NewWord";

export default function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    //console.log("before",data);
    const res = await axios('http://localhost:4000/api');
    //console.log("after", res.data);
    setData(res.data.reverse());
  }

useEffect(() => {
    fetchData();
  },[loading]);

  //console.log(data);

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/about">
            <About data={data} />
          </Route>
          <Route path="/new">
            <NewWord setLoading={setLoading}/>
          </Route>
          <Route path="/">
            <Home data={data} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
