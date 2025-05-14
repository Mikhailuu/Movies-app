import "./MovieSearch.css";
import { Input } from "antd";
import { debounce } from "lodash";

const MovieSearch = ({ setQuery }) => {
  const onLabelChange = (e) => {
    if (e.target.value === "") return;
    setQuery(e.target.value);
  };

  const debounced = debounce(onLabelChange, 500);

  return (
    <form className="movie-search">
      <Input placeholder="Type to search..." autoFocus onChange={debounced} />
    </form>
  );
};

export default MovieSearch;
