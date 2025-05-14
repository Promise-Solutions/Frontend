const Kpi = ({ title, value, width, height }) => {
  return (
    <div className={`w-[${width}] h-[${height}] bg-white/5 border-1 border-pink-zero  shadow-md p-6 text-white w-full max-w-sm transition-all duration-100 hover:scale-[1.02] hover:border-cyan-zero`}>
      <h3 className="text-lg font-semibold text-pink-zero mb-1">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default Kpi;
