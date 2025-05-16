// UserFilter.jsx
import { useEffect, useState } from "react";
import icon from "../../../assets/icone-busca.png";

const UserFilter = ({ id, placeholder, onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  useEffect(() => {
    const inputSearchUser = document.getElementById("input_search_user");
    const handleInput = () => {
      const filter = inputSearchUser.value.toUpperCase();
      const filterNumbers = inputSearchUser.value.replace(/\D/g, ""); // Remove tudo que não for número
      const cards = document.querySelectorAll(".card_user");

      cards.forEach((card) => {
        const name =
          card.querySelector(".card_user_name")?.textContent.toUpperCase() ||
          "";
        const email =
          card.querySelector(".card_user_email")?.textContent.toUpperCase() ||
          "";
        const contact =
          card
            .querySelector(".card_user_contact")
            ?.textContent.replace(/\D/g, "") || ""; // Remove tudo que não for número
        const clientType =
          card
            .querySelector(".card_user_clientType")
            ?.textContent.toUpperCase() || "";

        if (
          name.includes(filter) ||
          email.includes(filter) ||
          contact.includes(filterNumbers) ||
          clientType.includes(filter)
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    };

    inputSearchUser.addEventListener("input", handleInput);

    return () => {
      inputSearchUser.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <div
      className={`flex flex-row border-1 h-10 w-60 items-center transition-colors ease-in-out duration-100 ${
        isFocused ? "border-pink-zero" : "border-white"
      }`}
    >
      <img src={icon} alt="Buscar" className="mx-2 w-[24px] h-[24px]" />
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className="outline-none"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default UserFilter;
