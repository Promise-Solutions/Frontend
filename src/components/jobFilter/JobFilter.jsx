// Importa os hooks useEffect e useState do React
import { useEffect, useState } from "react";
// Importa o ícone de busca
import icon from "../../assets/icone-busca.png";

// Componente funcional para o filtro de busca de atendimentos
const jobFilter = ({ id, placeholder, onSearch }) => {
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
    const inputSearchJob = document.getElementById("input_search_job"); // Obtém o elemento do input pelo ID
    const handleInput = () => {
      const filter = inputSearchJob.value.toUpperCase(); // Converte o valor do input para maiúsculas
      const cards = document.querySelectorAll(".card_job"); // Seleciona todos os elementos com a classe "card_user"

      if (filter.trim() === "") {
        // Se o input estiver vazio, exibe todos os cards
        cards.forEach((card) => {
          card.style.display = "block";
        });
        return;
      }

      // Filtra os cards com base no valor do input
      cards.forEach((card) => {
        const title = card
          .querySelector(".card_job_title") // Seleciona o nome do atendimento no card
          .textContent.toUpperCase().trim(); // Converte o texto para maiúsculas
        card.style.display = title.includes(filter) ? "block" : "none"; // Exibe ou oculta o card
      });
    };

    inputSearchJob.addEventListener("input", handleInput); // Adiciona o evento de input

    // Remove o evento ao desmontar o componente
    return () => {
      inputSearchJob.removeEventListener("input", handleInput);
    };
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <div
      className={`flex flex-row border-1 h-10 w-60 items-center transition-colors ease-in-out duration-100 ${
        isFocused ? "border-[#9A3379]" : "border-white" // Altera a cor da borda com base no foco
      }`}
    >
      <img src={icon} alt="Buscar" className="mx-2 w-[24px] h-[24px]" />{" "}
      {/* Ícone de busca */}
      <input
        id={id} // Define o ID do input
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
export default jobFilter;
