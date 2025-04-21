import "./MovieList.css";
import React, { useState, useEffect } from "react";
import Grid from "antd/es/card/Grid";
import { fetchMovies } from "../../utils/api";
import MovieCard from "../MovieCard";
import { Row, Col } from "antd";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const fetchedMovies = await fetchMovies("The way back");
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Files load error: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <Grid>
      <h1>Фильмы</h1>
      <Row className="movie-list" gutter={[36, 36]}>
        {movies.map((movie) => (
          <Col key={movie.id}>
            <MovieCard data={movie} />
          </Col>
        ))}
      </Row>
    </Grid>
  );
};

export default MovieList;
