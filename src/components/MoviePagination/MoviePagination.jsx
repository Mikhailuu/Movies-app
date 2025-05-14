import { Pagination } from "antd";

const MoviePagination = ({ total, onChange }) => {
  return (
    <Pagination
      total={total}
      hideOnSinglePage={true}
      showSizeChanger={false}
      onChange={(page) => onChange(page)}
    />
  );
};

export default MoviePagination;
