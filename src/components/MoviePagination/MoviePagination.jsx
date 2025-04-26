import { Pagination } from "antd";

const MoviePagination = ({ onChange }) => {
  return (
    <Pagination
      defaultCurrent={1}
      total={50}
      onChange={(page) => onChange(page)}
    />
  );
};

export default MoviePagination;
