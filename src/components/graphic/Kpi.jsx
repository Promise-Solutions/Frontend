const Kpi = ({ title, value }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl shadow-md p-6 text-white w-full max-w-sm transition-all duration-300 hover:scale-[1.02] hover:border-white/20">
      <h3 className="text-lg font-semibold text-[#9A3379] mb-1">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default Kpi;
