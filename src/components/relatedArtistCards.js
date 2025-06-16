//This compenent is similar to the artistCards component, but instead of displaying the final array of artists, it displays the related artists of a given artist.

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Card } from 'react-bootstrap';
import redirectButton from './redirectButton';
import './redirectButton';


function GrabRelated(name) {
    const CLIENT_ID_LAST = "9a465a305830ad34c3e433ea727c42b9";
    const CLIENT_ID_SPOT = "2bc99a46ab2347cd960c1795ad207b68";
    const CLIENT_SECRET_SPOT = "daca831dc5664361b4921e9c4b5665b7";
    const [token, setToken] = useState("");
    const [related, setRelated] = useState([])

    console.log('poggers');
    //grab spotify token
    useEffect(() => 
        {
      
          var authParams = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID_SPOT + '&client_secret=' + CLIENT_SECRET_SPOT
          }
      
          fetch("https://accounts.spotify.com/api/token", authParams)
            .then(result => result.json())
            .then(data => setToken(data.access_token))
        }, [])
    
    //create our search authorization
      var searchAuth = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
      }
      
      //create a list of related artists
      useEffect(() => {
          const fetchRelated = async () => {
              const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&api_key=${CLIENT_ID_LAST}&artist=${name}&format=json`;
              
              const response = await fetch(url);
              const data = await response.json();
              setRelated(data.similarartists.artist);
          };
      
          fetchRelated();
      }, [name, CLIENT_ID_LAST]);


  console.log();
}

export default GrabRelated;