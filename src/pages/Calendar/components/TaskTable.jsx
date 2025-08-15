import Table from "../../../components/tables/Table";

const TaskTable = ({ headers, data, messageNotFound }) => {
  return (
    <Table headers={headers} data={data} messageNotFound={messageNotFound} />
  );
};

export default TaskTable;
