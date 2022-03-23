import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageCard from './components/ImageCard/ImageCard';
import SelectableButtons from './components/SelectableButtons/SelectableButtons';
import ErrorBox from './components/ErrorBox/ErrorBox';
import configData from "../config.json";


function App() {

  const [searchInput, setSearchInput] = useState("")
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [gifData, setGifData] = useState([]);
  const [searchMethod, setSearchMethod] = useState("")
  const [watsonSelectableOptions, setWatsonSelectableOptions] = useState([])
  const [currentSelectedButton, setCurrentSelectedButton] = useState("")
  const [currentSearchedWord, setcurrentSearchedWord] = useState("")

  // Call to backend api and apply results to hooks
  async function fetchData(data, method, primarySearch) {
    await fetch(`${configData.SERVER_URL}api/gif?input=${data}&method=${method}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => res.json())
      .then(
        (result) => {
          setIsLoading(true);
          if (result.success == "false") {
            setError(result.error.error)
            return
          }
          setGifData(result.data);
          setCurrentSelectedButton(result.lookingFor)
          if (primarySearch) {
            setWatsonSelectableOptions(result.watson)
          }
        },
        (error) => {
          setIsLoading(true);
          setError(error);
        }
      )
  }

  // Handles events with search selectable buttons
  const handleSelectedButton = (event) => {
    setIsLoading(false);
    setSearchInitiated(true);
    setcurrentSearchedWord(event.target.value)
    fetchData(event.target.value, "None", false);

  }

  // Handles search submit
  const ImageSearch = (e) => {
    e.preventDefault();   // prevents page refresh after form submit
    setIsLoading(false);
    setError([]);
    setSearchInitiated(true);
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
              watsonObject={watsonSelectableOptions}
              error={error}
              selectedButton={currentSelectedButton}
              handleSelectedButton={handleSelectedButton}
            >
            </SelectableButtons>

            {/* GIF table */}
            <ImageCard
              isInitiated={searchInitiated}
              error={error}
              isLoaded={isLoading}
              items={gifData}
            >
            </ImageCard>

          </div>
        </div>
      </Container>
    </Router>
  );
}



export default App;
