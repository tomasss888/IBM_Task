import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';
import ImageCard from './components/ImageCard';
import SelectableButtons from './components/SelectableButtons';
import ErrorBox from './components/ErrorBox';
import configData from "../config.json";


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

  // Call to backend api and apply results to hooks
  async function fetchData(data, method, primarySearch) {
    await fetch(`${configData.SERVER_URL}api/getGIF?input=${data}&method=${method}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          if (result.success == "false") {
            setError(result.error.error)
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
        }
      )
  }

  // Handles events with search selectable buttons
  const handleSelectedButton = (event) => {
    setIsLoaded(false);
    setisInitiated(true);
    setcurrentSearchedWord(event.target.value)
    fetchData(event.target.value, "None", false);

  }

  // Handles search submit
  const ImageSearch = (e) => {
    e.preventDefault();   // prevents page refresh after form submit
    setIsLoaded(false);
    setError([]);
    setisInitiated(true);
    fetchData(searchInput, searchMethod, true);
  }

  return (

    <Router>
      <Container className="App">

        <h1>GIF Search</h1>
        <div className="search">

          {/* Searchbar */}
          <SearchBar
            saveSearchInput={setSearchInput}
            handleSearch={ImageSearch}
            saveSearchMethod={setSearchMethod}
          >
          </SearchBar>

          <div>

            {/* Error message box */}
            <ErrorBox
              error={error}
            >
            </ErrorBox>

            {/* Selectable buttons for watson based search */}
            <SelectableButtons
              watsonObject={watsonObject}
              error={error}
              selectedButton={selectedButton}
              handleSelectedButton={handleSelectedButton}
            >
            </SelectableButtons>

            {/* GIF table */}
            <ImageCard
              isInitiated={isInitiated}
              error={error}
              isLoaded={isLoaded}
              items={items}
            >
            </ImageCard>

          </div>
        </div>
      </Container>
    </Router>
  );
}



export default App;
