import dayjs from "dayjs";
import Table from "../../../components/tables/Table";
import { getStatusTranslated } from "../../../hooks/translateAttributes";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../constants/routers";

const SubJobTable = ({ headers, data, messageNotFound }) => {
  const navigate = useNavigate();

  const formattedSubJobs = data.map((subJob) => ({
    ...subJob,
    date: subJob.date ? dayjs(subJob.date).format("DD/MM/YYYY") : "",
    startTime: subJob.startTime ? subJob.startTime.slice(0, 5) : "",
    expectedEndTime: subJob.expectedEndTime ? subJob.expectedEndTime.slice(0, 5) : "",
    status: getStatusTranslated(subJob.status),
    action: <PrimaryButton text="Acessar serviço" onClick={() => navigate(ROUTERS.getJobDetail(subJob.fkService))}/>
  }));

  return (
    <Table headers={headers} data={formattedSubJobs} messageNotFound={messageNotFound} />
  );
};

export default SubJobTable;
