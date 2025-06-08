import { useState } from "react";
import { Search } from "lucide-react";

export default function StockFilter({ id, placeholder, onSearch }) {
  const [valorBusca, setValorBusca] = useState("");

  const handleChange = (event) => {
    const novoValor = event.target.value;
    setValorBusca(novoValor);
    onSearch(novoValor);
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={valorBusca}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}
