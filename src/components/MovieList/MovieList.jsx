import "./MovieList.css";
import React, { useState, useEffect, Fragment } from "react";
import Grid from "antd/es/card/Grid";
import { fetchMovies } from "../../utils/api";
import MovieCard from "../MovieCard";
import { Row, Col, Spin, Alert } from "antd";

const MovieList = ({ query, activePage }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    const loadMovies = async () => {
      setLoading(true);
      try {
        const fetchedMovies = await fetchMovies(query, activePage);
        if (fetchedMovies.length === 0) {
          setError(
            <Alert message={"Поиск не дал результатов"} type={"warning"} />
          );
        } else {
          setMovies(fetchedMovies.toSpliced(6));
        }
      } catch (error) {
        setError(<Alert message={error.message} type={"error"} />);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [isFirstRender, query, activePage]);

  const ListView = () => {
    return (
      <Fragment>
        {movies.map((movie) => (
          <Col key={movie.id}>
            <MovieCard data={movie} />
          </Col>
        ))}
      </Fragment>
    );
  };

  const Spinner = () => {
    return <Spin></Spin>;
  };

  const spinner = loading ? <Spin /> : null;
  const content = !loading ? <ListView /> : null;
  const errorMessage = error ? error : null;

  return (
    <Grid>
      <Row className="movie-list" gutter={[36, 36]}>
        {spinner}
        {content}
        {errorMessage}
      </Row>
    </Grid>
  );
};

export default MovieList;
