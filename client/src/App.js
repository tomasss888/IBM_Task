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
import { Spinner, Container, Row, Col, ButtonGroup, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [searchInput, setSearchInput] = useState("")
  const [error, setError] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitiated, setisInitiated] = useState(false);
  const [items, setItems] = useState([]);
  const [searchMethod, setSearchMethod] = useState("")
  const [watsonObject, setwatsonObject] = useState([])
  const [selectedButton, setselectedButton] = useState("")
  const [currentSearchedWord, setcurrentSearchedWord] = useState("")


  async function fetchData(data, method, primarySearch) {
    await fetch(`http://demo.therejoice.co.uk/api/getGIF?input=${data}&method=${method}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);

          if (result.success == "false") {
            setError(result.error.error.meta)
            return
          }

          setItems(result.data);
          setselectedButton(result.lookingFor)
          if (primarySearch) {
            setwatsonObject(result.watson)
          }

        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }

      )
  }


  const handleSelectedButton = (event) => {
    console.log(event.target.value)
    setIsLoaded(false);
    setisInitiated(true);
    setcurrentSearchedWord(event.target.value)
    fetchData(event.target.value, "None", false);

  }



  const ImageSearch = () => {
    setIsLoaded(false);
    setError([]); // reset error message
    if (searchInput == null) return;
    setisInitiated(true);
    fetchData(searchInput, searchMethod, true);
  }



  return (

    <Router>
      <Container className="App">


        <h1>GIF Search</h1>
        <div className="search">

          {/* Searchbar */}
          <SearchBar saveSearchInput={setSearchInput} handleSearch={ImageSearch} saveSearchMethod={setSearchMethod} />

          <div>

            {/* Error message box */}
            {(Object.keys(error).length > 1) ? (
              <Alert variant="danger">
                <p>
                  {error.status} - {error.msg}
                </p>
              </Alert>
            ) : <></>}


            {/* Selectable buttons for watson based search */}
            <Row className="my-2" >
              <ButtonGroup onClick={e => handleSelectedButton(e)}>
                {(watsonObject.length === undefined || !watsonObject.length > 1 || error === undefined) ? <></> : (watsonObject.map((data) => (
                  <Button
                    key={data.text}
                    value={data.text}
                    variant={(selectedButton === data.text) ? 'secondary' : 'outline-secondary'}
                  >
                    {data.text}
                  </Button>
                )))}
              </ButtonGroup>
            </Row>

            {/* GIF table */}
            <Row className="my-2" >
              {(!isInitiated || !error === null) ? <p></p> : (!isLoaded) ? <div className="d-flex justify-content-center"><Spinner animation="border" /></div> : (items.map((data) => (
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
