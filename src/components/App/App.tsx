import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

import SearchBar from '../SearchBar';
import MovieGrid from '../MovieGrid';
import Loader from '../Loader';
import './App.module.css';

import type { Movie } from '../../types/movie.ts';
import { fetchMovies } from '../../services/movieService.ts';
import ErrorMessage from '../ErrorMessage';
import MovieModal from '../MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (query: string) => {
    setMovies([]);
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchMovies(query);

      if (!data || data.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = async (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSubmit} />
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;
