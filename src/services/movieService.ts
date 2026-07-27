import type { Movie } from '../types/movie.ts';
import axios from 'axios';

const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const url = 'https://api.themoviedb.org/3/search/movie';

  const { data } = await axios.get<TMDBResponse>(url, {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return data.results;
};
