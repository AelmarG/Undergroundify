import { Button } from 'react-bootstrap';

function redirectButton(artistLink)
{
    const redirectHandler = () => {
        window.open(artistLink);
    };

    return (
        <Button onClick={redirectHandler}>See Artist</Button>
    )
}

export default redirectButton;