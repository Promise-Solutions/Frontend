import CardSubJob from "../cards/CardSubJob";
import { IoCloseCircle } from 'react-icons/io5';

const ModalAllSubJobs = ({ subJobs, jobId, handleChangeSubJobStatus, closeModal, setEditingSubJob }) => {
    return (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-10">
            <div className="flex flex-col justify-start items-center border-2 border-pink-zero h-140 w-280  rounded-2xl bg-[#080007] ">
                <div className="flex w-full px-6 justify-between mt-5">
                    <p className="text-cyan-zero text-[20px] font-semibold">Subserviços totais</p>
                    <IoCloseCircle onClick={closeModal} className="text-cyan-zero text-2xl cursor-pointer hover:text-cyan-900 transition duration-[0.2s]"/>
                </div>
            <div className="flex flex-wrap justify-center p-5 gap-2 overflow-x-hidden overflow-y-auto mt-1  max-w-[99%]">        
                {subJobs.length > 0 ? (
                    subJobs.map((subJob) => (
                        <CardSubJob
                            key={subJob.id}
                            data={{ ...subJob, jobId: jobId} }
                            onEdit={() => setEditingSubJob(subJob)}
                            onUpdateStatus={handleChangeSubJobStatus}
                        />
                    ))
                ) : (
                    <p className="text-center w-full text-gray-400">
                    Nenhum subserviço encontrado
                    </p>
                )}
                </div>
            </div>
        </div>
    );
}

export default ModalAllSubJobs;