//This is the component used to display the final resulting array of artists, as well as redisplay a new set of similar artists when a card is clicked.

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Card } from 'react-bootstrap';
import redirectButton from './redirectButton';
import './redirectButton';
import GrabRelated from './relatedArtistCards';
//onClick={() => GrabRelated(artist.name)} style={{cursor: 'pointer'}}
function ArtistCards(artists) {

    return (      
        <Container>
            <Row className='mx-2 row row-cols-4'>
            {artists.map((artist, i) => (
                <Card key={i}> 
                    {artist.images[0] && <Card.Img src={artist.images[0].url}/>}
                    <Card.Body>
                        <Card.Title>{artist.name}</Card.Title>
                        {redirectButton(artist.external_urls.spotify)}
                    </Card.Body>
                </Card>
            ))}
            </Row>
        </Container>
    );
}

export default ArtistCards;