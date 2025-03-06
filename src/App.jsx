import React, { useState, useEffect } from "react";
import MovieCard from "./moviecard";
import SearchIcon from './assets/search.svg';
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <div className="header">
        <div className="button-container">
        <button className="theme-toggle" onClick={toggleDarkMode}>
        <i className={`bi ${darkMode ? "bi-toggle-on" : "bi-toggle-off"}`}></i>
        </button>
        </div>
      
      <h1>Movie Pedia</h1>
      </div>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
