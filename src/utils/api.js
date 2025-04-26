import axios from "axios";

const API_KEY = "bce3cbb00bbb3c7ce77f45d43bd2e897";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchMovies = async (query, page) => {
  try {
    const response = await api.get(`/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        page: page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Ошибка при получении фильмов:", error);
    throw error;
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await api.get(`/movie/popular`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Ошибка при получении популярных фильмов:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении деталей фильма:", error);
    throw error;
  }
};
