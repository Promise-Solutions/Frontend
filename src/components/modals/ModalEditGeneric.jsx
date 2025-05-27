import React, { useState, useEffect } from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import ConfirmButton from "../buttons/confirmButton/ConfirmButton";
import CancelButton from "./modalConfirmDelete/cancelButton";

const ModalEditGeneric = ({
  title = "Editar",
  initialData = {},
  inputs = [],
  buttons = [],
  widthModal = "auto"
}) => {

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-10">
      <div className={`bg-[#1E1E1E98] border-1 border-pink-zero text-white p-6 shadow-lg w-${widthModal} max-w-[700px]`}>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form>
          <div className="flex flex-col gap-4">
            {inputs}
          </div>
          <div className="mt-4 flex justify-end gap-4">
            {buttons}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditGeneric;
