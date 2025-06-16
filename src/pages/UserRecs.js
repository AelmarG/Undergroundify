//This is the User Recommendations page, where users will be recommended artists based on their most listened to artists

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, Button, Row, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import NavBar from '../components/navBar';
import "../App.css"
import ArtistCards from '../components/artistCards';


function UserRecs()
{   
    //Setting up important variables
    const CLIENT_ID_SPOT = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET_SPOT = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const CLIENT_ID_LAST = process.env.REACT_APP_LASTFM_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:3000/personal-recs";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = 'token';
    const SCOPE = 'user-top-read';

    const [token, setToken] = useState("");
    const [finalArtists, setFinalArtists] = useState([]);

    useEffect(() => {

        //Setting up hash variable where token is located and token variable in local storage
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token")

        //If there is no token but there is a hash, set the token to the access token in the hash
        if(!token && hash)
        {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
        }

        //Clear the hash, store the token in local storage, and set the token for future use
        window.location.hash="";
        window.localStorage.setItem("token", token);
        setToken(token);
        
    },[]);

    //Logs out by removing token from local storage and resetting the token to an empty string
    function logout()
    {
        setToken("");
        window.localStorage.removeItem("token");
    }

    //User recommendation function

    async function recommend()
    {
        
        let buffer = [];

        //have our search ready
        var searchAuth = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
        }   

        //grab the recent top artists from the current user
        var topList = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term", searchAuth,)
            .then(response => response.json())
            .then(data => {return data.items})


        //go through the top ten artists
        for (let i=0; i < 10; i++)
        {
            //grab the spotify id of the current artist
            let currentArtist = topList[i].name;
            console.log("Current Artist:", currentArtist);
            
            // Construct the URL
            const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&api_key=${CLIENT_ID_LAST}&artist=${currentArtist}&format=json`;
            console.log("Fetching URL:", url);
            
            //create a list of related artists
            var related = await fetch(url,)
                .then(response => {return response.json();})
                .then(data => {return data.similarartists.artist;});
            console.log(related);
            
            //go through the top 5 related artists and add them to the buffer if they are not already added
            if (related && Array.isArray(related)) {
                for (let j = 0; j < 5 && j < related.length; j++) {
                    let currentRelated = related[j];
    
                    // Avoid duplicates
                    if (!topList.some(artist => artist.name === currentRelated.name) &&
                        !buffer.some(artist => artist.name === currentRelated.name)) {
                            var artistSearch = await fetch(`https://api.spotify.com/v1/search?q=${currentRelated.name}&type=artist&limit=50`, searchAuth,)
                                    .then(response => response.json())
                                    .then(data => {return data.artists.items})
    
                        buffer.push(artistSearch[0]);
                        console.log("Added to buffer:", currentRelated.name);
                    }
                }
            } 

        }
            
            
        
        setFinalArtists(buffer);
        console.log("Final Artists have been set");

    }
    
    return (
        <div>
                <NavBar/>
                <Container>
                    {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID_SPOT}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login To Spotify</a>
                    
                    :  <Button onClick={() => {logout()}}>Logout</Button> 
                    }
                </Container>
                <Container>
                    {token ? 
                    <Button onClick={() => recommend()}>Give Recommendations</Button>
                    :<Container></Container>}
                </Container>

                {ArtistCards(finalArtists)}


            </div>
    )
}

export default UserRecs;