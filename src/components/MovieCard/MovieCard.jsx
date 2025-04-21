import React from "react";
import "./MovieCard.css";
import { Tag, Image } from "antd";
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
    <div className="movie-card">
      <Image
        width={"183px"}
        height={"281px"}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-card__body">
        <h3>{movie.title}</h3>
        <span>{formattedDate}</span>
        <div>
          <Tag>Action</Tag>
          <Tag>Drama</Tag>
        </div>
        <p>{truncateText(movie.overview, 205)}</p>
      </div>
    </div>
  );
};

export default MovieCard;
