const Graphic = ({ title, children }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-md w-full max-w-5xl mx-auto mb-6">
      <h3 className="text-white text-lg font-semibold mb-4">{title}</h3>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Graphic;
