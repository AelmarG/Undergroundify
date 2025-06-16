import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, Button, Row, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";

import Searcher from "./pages/Search";

import UserRecs from './pages/UserRecs';

function App() {


  return (
    <>
        {/* This is the alias of BrowserRouter i.e. Router */}
        <Router>
            <Routes>
                {/* Route for home */}
                <Route
                    exact
                    path="/"
                    element={<Home />}
                />

                {/* Route for search */}
                <Route 
                    path="/search"
                    element={<Searcher />}  
                />

                {/* Route for personalized recommendations */}
                {<Route 
                    path="/personal-recs"
                    element={<UserRecs />}
                /> }

                {/* <Redirect to="/" /> */}
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
            </Routes>
        </Router>
    </>
);
}

export default App;