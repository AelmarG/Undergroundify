import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/navBar';
import "../App.css"
import { Container } from 'react-bootstrap';

function Home() {
    return (
        <div className="page-wrapper">
            <NavBar />
            <div id="home">
                <Container>
                    <h1>Home</h1>
                    <p>Welcome to Undergroundify!</p>
                </Container>
            </div>
        </div>
    );
}

export default Home;