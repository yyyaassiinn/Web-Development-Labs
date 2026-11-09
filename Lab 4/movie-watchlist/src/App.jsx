
import { useState } from "react";
import "./App.css";


function MovieList({ movies, onRemove, onUpdate }) {

  if (movies.length === 0) {
    return <p className="empty-message">
      No movies yet. Add your first movie!
    </p>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

function MovieCard({ movie, onRemove, onUpdate }) {

  function handleRating(rating) {
    onUpdate(movie.id, { rating });
  }

  function handleReview(e) {
    onUpdate(movie.id, { review: e.target.value });
  }

  return (
    <div className="movie-card">

      <div className="movie-header">
        <h2>{movie.title}</h2>

        <button
          className="delete-btn"
          onClick={() => onRemove(movie.id)}
        >
          delete
        </button>
      </div>

      <div className="rating">
        <p>Your Rating:</p>

        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className="star-btn"
            onClick={() => handleRating(star)}
          >
            {star <= movie.rating ? "⭐" : "☆"}
          </button>
        ))}

        <span>{movie.rating}/5</span>
      </div>

      <p className="emoji-rating">
        {"⭐".repeat(movie.rating)}
      </p>

      <textarea
        placeholder="Write your review..."
        value={movie.review}
        onChange={handleReview}
      />

    </div>
  );
}

function MovieForm({ onAddMovie }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") return;

    onAddMovie({
      title: title.trim(),
      review: "",
      rating: 0
    });

    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <input
        type="text"
        placeholder="Enter movie title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">Add Movie</button>
    </form>
  );
}

function App() {
  const [movies, setMovies] = useState([]);

  function addMovie(movie) {
    setMovies((prevMovies) => [
      ...prevMovies,
      { ...movie, id: crypto.randomUUID() }
    ]);
  }

  function removeMovie(id) {
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== id)
    );
  }

  function updateMovie(id, updatedData) {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id
          ? { ...movie, ...updatedData }
          : movie
      )
    );
  }

  return (
    <div className="app">
      <header>
        <h1>My Movie Watchlist</h1>
        <p>Keep track of the movies you've watched!</p>
      </header>

      <MovieForm onAddMovie={addMovie} />

      <div className="movie-stats">
        <h3>Total Movies: {movies.length}</h3>
      </div>

      <MovieList
        movies={movies}
        onRemove={removeMovie}
        onUpdate={updateMovie}
      />
    </div>
  );
}

export default App;
