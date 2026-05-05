import axios from 'axios';
import type { Movie } from '../types/movie';

interface FetchMoviesResponse {
  results: Movie[];
}

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<FetchMoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );
  return response.data.results;
};
