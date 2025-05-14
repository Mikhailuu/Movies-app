import "./RatedMovieList.css";
import React, { useState, useEffect, Fragment } from "react";
import Grid from "antd/es/card/Grid";
import { fetchedRatedMovies } from "../../utils/api";
import MovieCard from "../MovieCard";
import { Row, Col, Spin, Alert } from "antd";
import { GenresConsumer } from "../../genres-context";

const RatedMovieList = ({ activePage, setTotalRated }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRatings, setUserRatings] = useState(null);

  useEffect(() => {
    const loadRatedMovies = async () => {
      setLoading(true);
      try {
        const fetchedMovies = await fetchedRatedMovies(activePage);
        setMovies(fetchedMovies.results);
        setTotalRated(fetchedMovies.total_results);
      } catch (error) {
        setError(<Alert message={error.message} type={"error"} />);
      } finally {
        setLoading(false);
      }
    };
    loadRatedMovies();
  }, [activePage]);

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

export default RatedMovieList;
