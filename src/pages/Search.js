//This is the Search page, where users can search for artists by genre and popularity

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, Button, Row, Card, Form } from 'react-bootstrap';
import NavBar from '../components/navBar';
import { useState, useEffect } from 'react';
import "../App.css"
import artistCards from '../components/artistCards';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
console.log("Client ID: " + CLIENT_ID);
console.log("Client Secret: " + CLIENT_SECRET); 

function Searcher() {
  
  //Creating array for all the displayed artists
  const [finalArtists, setFinalArtists] = useState([]);

  //Setting Up Search Values 
  const [searchVals, setSearch] = useState({
    artist: ''
  });

  //Function that changes the search values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch((prevSearchVals) => ({
      ...prevSearchVals,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchVals);
  };

  const [accessToken, setToken] = useState("");

  //Grabbing Spotify API Token
  useEffect(() => 
  {

    var authParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then(result => result.json())
      .then(data => setToken(data.access_token))
  }, [])

  //Search Function
  async function search() 
  {
    let buffer = [];

    console.log("Search for: " + JSON.stringify(searchVals));

    //Get artists from genre search
    var searchAuth = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    //Revisit this stupid shit
    var artistSearch = await fetch(`https://api.spotify.com/v1/search?q=${searchVals.genre}&type=artist&limit=50`, searchAuth,)
      .then(response => response.json())
      .then(data => {return data.artists.items})
    
    //
    
    //Fill the buffer with the artist search (user's searched artist will probably be first)
    for(let i=0; i < artistSearch.length; i++)
    {
      buffer.push(artistSearch[i])
    }

    setFinalArtists(buffer);

  
    //Revisit this
    if (finalArtists.length == 0)
    {
      return (<div><Container>No Artists Found</Container></div>);
    }

  }

  return (
    <div>
        <NavBar />
        <Container>
            <Form>
                <InputGroup className='mb-3'>
                    <Form.Control 
                        aria-label='genre' 
                        onChange={handleInputChange}
                        value={searchVals.genre}
                        name='genre'
                        type='text'
                        placeholder='Type In A Genre'
                    />
                    <Button onClick={() => {search()}}>
                        Search
                    </Button>
                </InputGroup>
            </Form>
        </Container>
        {artistCards(finalArtists)}
    </div>
);
}

export {CLIENT_ID, CLIENT_SECRET};
export default Searcher;