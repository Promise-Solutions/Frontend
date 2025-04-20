// Importa os hooks useEffect e useState do React
import { useEffect, useState } from "react";
// Importa o ícone de busca
import icon from "../../../assets/icone-busca.png";

// Componente funcional para o filtro de busca de usuários
const CommandFilter = ({ id, placeholder, onSearch }) => {
  // Estado para controlar se o input está focado
  const [isFocused, setIsFocused] = useState(false);
  // Estado para armazenar o valor do input
  const [value, setValue] = useState("");

  // Função chamada ao alterar o valor do input
  const handleInputChange = (e) => {
    const newValue = e.target.value; // Obtém o novo valor do input
    setValue(newValue); // Atualiza o estado com o novo valor
    onSearch(newValue); // Chama a função de busca com o novo valor
  };

  // useEffect para adicionar e remover o evento de input dinamicamente
  useEffect(() => {
    const inputSearchCommand = document.getElementById("input_search_command"); // Updated ID
    const handleInput = () => {
      const filter = inputSearchCommand.value.toUpperCase(); // Convert input to uppercase
      const cards = document.querySelectorAll(".card_command"); // Select all command cards

      cards.forEach((card) => {
        const cardText = Array.from(card.querySelectorAll("span, h1, li")).map(
          (element) => element.textContent.toUpperCase()
        ); // Collect all visible text content
        if (cardText.some((text) => text.includes(filter))) {
          card.style.display = "block"; // Show card if any text matches the filter
        } else {
          card.style.display = "none"; // Hide card if no text matches
        }
      });
    };

    inputSearchCommand.addEventListener("input", handleInput); // Add input event listener

    // Remove o evento ao desmontar o componente
    return () => {
      inputSearchCommand.removeEventListener("input", handleInput); // Remove event listener on cleanup
    };
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <div
      className={`flex flex-row border-1 h-10 w-60 items-center transition-colors ease-in-out duration-100 ${
        isFocused ? "border-pink-zero" : "border-white" // Altera a cor da borda com base no foco
      }`}
    >
      <img src={icon} alt="Buscar" className="mx-2 w-[24px] h-[24px]" />{" "}
      {/* Ícone de busca */}
      <input
        id={id || "input_search_command"} // Updated default ID
        type="text" // Define o tipo como texto
        placeholder={placeholder} // Define o texto de placeholder
        className="outline-none" // Remove o contorno padrão
        value={value} // Define o valor do input
        onChange={handleInputChange} // Define o evento de mudança
        onFocus={() => setIsFocused(true)} // Define o evento de foco
        onBlur={() => setIsFocused(false)} // Define o evento de desfoco
      />
    </div>
  );
};

// Exporta o componente para ser usado em outras partes do projeto
export default CommandFilter;
