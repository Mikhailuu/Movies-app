import { Fragment, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import NetworkStatus from "./components/NetworkStatus";
import MovieSearch from "./components/MovieSearch";
import MoviePagination from "./components/MoviePagination";

function App() {
  const [query, setQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [moviesPerPage] = useState(6);

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    setActivePage(pageNumber);
  };

  return (
    <Fragment>
      <NetworkStatus />
      <MovieSearch setQuery={setQuery} />
      <MovieList query={query} activePage={activePage} />
      <MoviePagination
        moviesPerPage={moviesPerPage}
        onChange={handlePageChange}
      />
    </Fragment>
  );
}

export default App;
