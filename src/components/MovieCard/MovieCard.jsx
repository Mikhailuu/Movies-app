import React, { useEffect, useState } from "react";
import "./MovieCard.css";
import { Tag, Image, Card, Rate, ConfigProvider, Grid } from "antd";
import { format, parseISO } from "date-fns";
import { addRating } from "../../utils/api";

const { useBreakpoint } = Grid;

const MovieCard = ({ data: movie, genres, setUserRatings }) => {
  const [colorVote, setColorVote] = useState("#E90000");
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const date = movie.release_date ? parseISO(movie.release_date) : null;
  const formattedDate = date ? format(date, "MMMM d, yyyy") : null;

  useEffect(() => {
    if (movie.vote_average > 3 && movie.vote_average <= 5)
      setColorVote("#E97E00");
    if (movie.vote_average > 5 && movie.vote_average < 7)
      setColorVote("#E9D100");
    if (movie.vote_average > 7) setColorVote("#66E900");
  }, [movie.vote_average]);

  const handleRateChange = (value) => {
    addRating(movie.id, value);
    setUserRatings((prev) => ({ ...prev, [movie.id]: value }));
  };

  return (
    <Card className={`movie-card ${isMobile ? "mobile" : ""}`}>
      <div className="movie-card__content">
        <div className="movie-card__poster">
          <Image
            height={"100%"}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fallback="../src/assets/images/fallbackImage.png"
          />
        </div>

        <div className="movie-card__info">
          <header className="movie-card__header">
            <h3 className="movie-card__title">{movie.title}</h3>
            <span
              className="movie-card__vote-average"
              style={{ borderColor: colorVote }}
            >
              {movie.vote_average.toFixed(1)}
            </span>
          </header>

          <div className="movie-card__meta">
            <span className="movie-card__date">{formattedDate}</span>
            <div className="movie-card__genres">
              {movie.genre_ids.map((id) => (
                <Tag key={id} className="movie-card__genre">
                  {genres.find((genre) => genre.id === id)?.name}
                </Tag>
              ))}
            </div>
          </div>

          <div className="movie-card__bottom">
            <p className="movie-card__overview">{movie.overview}</p>
            <ConfigProvider theme={{ components: { Rate: { starSize: 17 } } }}>
              <Rate
                className="movie-card__rating"
                count={10}
                allowHalf={true}
                value={
                  sessionStorage.getItem("movieRatings")
                    ? JSON.parse(sessionStorage.getItem("movieRatings"))[
                        movie.id
                      ]
                    : null
                }
                onChange={handleRateChange}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
