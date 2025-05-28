import Table from "../../../components/tables/Table";

const SubJobTable = ({ headers, data, messageNotFound }) => {
  return (
    <Table headers={headers} data={data} messageNotFound={messageNotFound} />
  );
};

export default SubJobTable;
