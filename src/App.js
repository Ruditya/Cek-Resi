import React, { useState } from 'react';
import Axios from "axios";
import _ from "lodash";
import moment from "moment";
import "./index.css";

const App = () => {
  const [state , setState] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [cityName, setCityName] = useState("");
  const [apiKey,setApiKey] = useState("");

  React.useEffect(() => {
    // fetchData();
  }, []);

  const fetchData = () => {
    setError("");
    ;
    setLoading(true);
    Axios.get(`http://api.shipping.esoftplay.com/waybill/${cityName}&appid=${apiKey}&units=metric`)
      .then(res => {
        setState(res.data.value);
        setLoading(false);
      }).catch(err => {
        setError("Unable to get tracking information");
        console.log(err)
        setLoading(false);
      });

    // Axios.post("url", data, {headers: {
    //     "Content-Type": "multipart/form-data",
    //     "Content-Type": "application/json",
    //   }})
  };

  const displayInformation = () => {
    if (error) {
      return <p className={"danger"}>{error}</p>
    }

    if (_.isEmpty(state) && loading) {
      return <p>Loading tracking information</p>
    }

    if (_.isEmpty(state)) {
      return false
    }

    return (
      <>
        <p>{state.result.summary.receiver_name} </p>
        
        <div className={"divider"}/>
      </>
    )
  };

  
  return (
    <div class="container">
  <div class="row">
  <div class="col">
    <div class="cont">
      <h1 class={"title"}>Resi</h1>

      <div>
        {displayInformation()}
      </div>

      <p>Enter Waybill</p>
      <input onChange={event => setCityName(event.target.value)} className={"input"}/>
      <p>Enter Courier</p>
      <input onChange={event => setApiKey(event.target.value)} className={"input"}/>
      
      <button className={"button"} onClick={fetchData}>Track</button>
    </div>
  
  </div>

  </div>
  <div class="row">
  <div class="col">
    <div class="cont">
      <h1 class={"title"}>Ongkir</h1>

      <div>
        {displayInformation()}
      </div>

      <p>Enter Origin</p>
      <input onChange={event => setCityName(event.target.value)} className={"input"}/>
      <p>Enter Destination</p>
      <input onChange={event => setCityName(event.target.value)} className={"input"}/>
      <p>Enter Courier</p>
      <input onChange={event => setApiKey(event.target.value)} className={"input"}/>
      
      <button className={"button"} onClick={fetchData}>Cek Ongkir</button>
    </div>
  
  </div>

  </div>

  </div>
  
  );

  

  }

export default App;


