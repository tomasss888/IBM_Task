import './App.css';
import SearchBar from './commonElements/SearchBar';
import ImageCard from './commonElements/ImageCard';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Spinner, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [searchInput, setSearchInput] = useState("")
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitiated, setisInitiated] = useState(false);
  const [items, setItems] = useState([]);


  const fetchData = async () => {
    //return ['Title 1', 'Title 2', 'Title 3'];
    // ADD REAL API HERE
    // const API_KEY = '';
    //fetch((`localhost:3000/getImage?query={props.searchTerm}`);
    await fetch(`http://89.116.176.177:3578/api/getGIF?input=${searchInput}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result.json);

        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }

      )

  }



  const ImageSearch = () => {
    setIsLoaded(false);
    if (searchInput == null) return;
    setisInitiated(true);
    fetchData(searchInput);
  }



  return (

    <Router>
      <Container className="App">


        <h1>GIF Search</h1>
        <div className="search">
          <SearchBar saveSearchInput={setSearchInput} handleSearch={ImageSearch} />
          <div>
            <Row className="my-2" >

              {(!isInitiated) ? <p></p> : (!isLoaded) ? <div className="d-flex justify-content-center"><Spinner animation="border" /></div> : (items.map((data) => (

                <Col key={data.id}>
                  <ImageCard data={data}></ImageCard>
                </Col>

              )))}
            </Row>

          </div>
        </div>

      </Container>
    </Router>
  );
}



export default App;
