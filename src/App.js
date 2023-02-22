import React, { useState, useEffect } from "react";
import useFetch from "./hook/useFetch";
const Movie = ({ poster, title, onClick }) => {
  return (
    <div className="movie" title={title} onClick={onClick}>
      <img src={poster} alt={title} />
    </div>
  );
};

const MovieInfo = ({ imdbID }) => {
  const { isLoading, apiData, isError } = useFetch(
    `https://www.omdbapi.com/?i=${imdbID}&apikey=74c7894b`
  );
  if (isLoading || !apiData) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error in fetch data...</div>;
  }

  const { Title, Year, Poster, Actors, imdbRating, Plot } = apiData;

  return (
    <div className="movie-info">
      <img src={Poster} alt={Title} />
      <p>{Title}</p>
      <span>{Year}</span>
      <span className="actors">{Actors}</span>
      <span className="rating">{imdbRating}</span>
      <span className="plot">{Plot}</span>
    </div>
  );
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { isLoading, apiData, isError } = useFetch(
    "https://www.omdbapi.com/?s=Batman&apikey=74c7894b"
  );

  console.log(apiData);

  const handleMovieClick = (imdbID) => {
    setSelectedMovie(imdbID);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const result = e.target[0].value;
    if (!result) return;
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${result}&apikey=74c7894b`
      );
      const data = await res.json();
      const movie = await data?.Search.filter((el) => el.Type === "movie");
      setMovies(movie);
      setSelectedMovie(null);
    } catch (error) {
      setMovies([]);
    }
  };

  const handleMovieInfoClose = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    console.log("APP useEffect");
    if (apiData && apiData.Search) {
      const movie = apiData.Search.filter((el) => el.Type === "movie");
      setMovies(movie);
    }
  }, [apiData]);
  console.log("APP rendered");
  return (
    <div className="App">
      <form className="search" onSubmit={handleSearchSubmit}>
        <input type="text" placeholder="Search movie" />
        <button type="submit">Search</button>
      </form>
      <div className="container">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error in fetch data...</div>
        ) : (
          movies.map((movie) => (
            <Movie
              key={movie.imdbID}
              poster={movie.Poster}
              title={movie.Title}
              onClick={() => handleMovieClick(movie.imdbID)}
            />
          ))
        )}
      </div>
      <div
        className={`info_container ${selectedMovie ? "" : "hidden"}`}
        onClick={handleMovieInfoClose}
      >
        {selectedMovie && <MovieInfo imdbID={selectedMovie} />}
      </div>
    </div>
  );
};

export default App;
