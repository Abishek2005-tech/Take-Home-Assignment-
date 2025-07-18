

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListMovies.css'; 

const ListMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="list-movies-container">
      <h1>Movie List</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movies/${movie.id}`}>
              <h2>{movie.title}</h2>
              <p>{movie.tagline}</p>
              {/* Assuming vote_average is directly available and needs to be displayed out of 10 */}
              <p>Rating: {movie.vote_average ? (movie.vote_average).toFixed(1) : 'N/A'} / 10</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListMovies;
