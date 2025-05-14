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
    return response.data;
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

export const createGuestSession = async () => {
  try {
    const response = await api.get(
      "https://api.themoviedb.org/3/authentication/guest_session/new",
      {
        params: {
          accept: "application/json",
          api_key: API_KEY,
        },
      }
    );
    sessionStorage.setItem("sessionId", response.data.guest_session_id);
    return response.data;
  } catch (error) {
    console.error("Ошибка гостевой сессии: ", error);
    throw error;
  }
};

export const addRating = async (movie_id, rate) => {
  try {
    const response = await axios.post(
      `https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=${API_KEY}&guest_session_id=${sessionStorage.getItem(
        "sessionId"
      )}`,
      {
        value: rate,
      }
    );
    if (response.status === 201) console.log("rated");
  } catch (error) {
    console.error("Ошибка добавлния рейтинга: ", error);
    throw error;
  }
};

export const fetchedRatedMovies = async (page) => {
  try {
    const response = await api.get(
      `/guest_session/${sessionStorage.getItem(
        "sessionId"
      )}/rated/movies?language=en-US&sort_by=created_at.asc`,
      {
        params: {
          accept: "application/json",
          api_key: API_KEY,
          page: page,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при получении фильмов:", error);
    throw error;
  }
};

export const fetchedGenresList = async () => {
  try {
    const response = await api.get(`/genre/movie/list`, {
      params: {
        accept: "application/json",
        api_key: API_KEY,
        language: "en",
      },
    });

    return response.data.genres;
  } catch (error) {
    console.error("Ошибка при получении жанров:", error);
    throw error;
  }
};
