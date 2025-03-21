import icon from "../../assets/icone-busca.png"

const userFilter = ({ placeholder }) => {
  return (
    <div className="flex flex-row border-1 border-white h-10 w-60 items-center">
      <img src={icon} alt="Buscar" className="mx-2 w-[24px] h-[24px]" />
      <input
        id="input_search_user"
        type="text"
        placeholder={placeholder}
        className="outline-none"
      />
    </div>
  );
};

export default userFilter;
