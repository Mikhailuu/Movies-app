import { Fragment, useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import RatedMovieList from "./components/RatedMovieList";
import NetworkStatus from "./components/NetworkStatus";
import MovieSearch from "./components/MovieSearch";
import MoviePagination from "./components/MoviePagination";
import GuestSession from "./components/GuestSession";
import { Tabs } from "antd";
import { GenresProvider } from "./genres-context";
import { fetchedGenresList } from "./utils/api";

function App() {
  const [isLogged, setIsLogged] = useState(
    sessionStorage.getItem("sessionId") ? true : false
  );
  const [query, setQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(null);
  const [totalRated, setTotalRated] = useState(null);
  const [genres, setGenres] = useState(null);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const tabs = [
    {
      key: "1",
      label: "Search",
      children: (
        <Fragment>
          <MovieSearch setQuery={setQuery} />
          <MovieList
            query={query}
            activePage={activePage}
            setTotalMovies={setTotalMovies}
          />
          <MoviePagination total={totalMovies} onChange={handlePageChange} />
        </Fragment>
      ),
    },
    {
      key: "2",
      label: "Rated",
      children: (
        <Fragment>
          <RatedMovieList
            activePage={activePage}
            setTotalRated={setTotalRated}
          />
          <MoviePagination total={totalRated} onChange={handlePageChange} />
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      const data = () => {
        return fetchedGenresList();
      };
      const genres = await data();
      setGenres(genres);
    };

    fetchGenres();
  }, []);

  return (
    <GenresProvider value={genres}>
      <NetworkStatus />
      {isLogged ? (
        <Tabs defaultActiveKey="1" items={tabs} centered={true} />
      ) : (
        <GuestSession onLogged={setIsLogged} />
      )}
    </GenresProvider>
  );
}

export default App;
