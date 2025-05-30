import "./MovieList.css";
import React, { useState, useEffect, Fragment } from "react";
import Grid from "antd/es/card/Grid";
import { fetchMovies } from "../../utils/api";
import MovieCard from "../MovieCard";
import { Row, Col, Spin, Alert } from "antd";
import { GenresConsumer } from "../../genres-context";

const MovieList = ({ query, activePage, setTotalMovies }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [userRatings, setUserRatings] = useState(null);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    const loadMovies = async () => {
      setLoading(true);
      setHasSearched(true);
      try {
        const fetchedMovies = await fetchMovies(query, activePage);
        setMovies(fetchedMovies.results);
        setTotalMovies(fetchedMovies.total_results);
        console.log(fetchedMovies.total_results);
      } catch (error) {
        setError(<Alert message={error.message} type={"error"} />);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [query, activePage]);

  useEffect(() => {
    const savedRatings = sessionStorage.getItem("movieRatings");

    if (savedRatings) {
      setUserRatings(JSON.parse(savedRatings));
    }
  }, []);

  useEffect(() => {
    if (userRatings)
      sessionStorage.setItem("movieRatings", JSON.stringify(userRatings));
  }, [userRatings]);

  const ListView = () => {
    return (
      <GenresConsumer>
        {(genres) => {
          return (
            <Fragment>
              {movies.map((movie) => (
                <Col key={movie.id}>
                  <MovieCard
                    data={movie}
                    genres={genres}
                    setUserRatings={setUserRatings}
                    userRate={userRatings ? userRatings[movie.id] : null}
                  />
                </Col>
              ))}
            </Fragment>
          );
        }}
      </GenresConsumer>
    );
  };

  const spinner = loading ? <Spin /> : null;
  const content = !loading ? <ListView /> : null;
  const errorMessage = error ? error : null;
  const noResult =
    hasSearched && !loading && movies.length === 0 ? (
      <Alert message="Поиск не дал результатов" type="warning" />
    ) : null;

  return (
    <Grid>
      <Row className="movie-list" gutter={[36, 36]}>
        {spinner}
        {content}
        {errorMessage}
        {noResult}
      </Row>
    </Grid>
  );
};

export default MovieList;
