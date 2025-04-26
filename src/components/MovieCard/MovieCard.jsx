import React from "react";
import "./MovieCard.css";
import { Tag, Image, Card, Rate } from "antd";
import { format, parseISO } from "date-fns";

const truncateText = (text, limit) => {
  if (text.length <= limit) {
    return text;
  }

  const trimmedText = text.slice(0, limit);
  const lastSpaceIndex = trimmedText.lastIndexOf(" ");

  return lastSpaceIndex > 0
    ? trimmedText.slice(0, lastSpaceIndex) + "..."
    : trimmedText + "...";
};

const MovieCard = ({ data: movie }) => {
  const date = movie.release_date ? parseISO(movie.release_date) : null;
  const formattedDate = date ? format(date, "MMMM d, yyyy") : null;

  return (
    <Card
      className="movie-card"
      cover={
        <Image
          width={"183px"}
          height={"281px"}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      }
    >
      <div>
        <header className="movie-card__header">
          <h3>{movie.title}</h3>
          <span className="movie-card__vote-average">
            {movie.vote_average.toFixed(1)}
          </span>
        </header>

        <span>{formattedDate}</span>
        <div>
          <Tag>Action</Tag>
          <Tag>Drama</Tag>
        </div>
        <p className="movie-card__overview">
          {truncateText(movie.overview, 205)}
        </p>
        <Rate />
      </div>
    </Card>
  );
};

export default MovieCard;
