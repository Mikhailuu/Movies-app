import { Tabs } from "antd";
import MovieList from "./MovieList";

const MovieTabs = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const tabs = [
    {
      key: "1",
      label: "Search",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "Rated",
      children: "rated movies",
    },
  ];

  return <Tabs defaultActiveKey="1" items={tabs} onChange={onChange} />;
};

export default MovieTabs;
