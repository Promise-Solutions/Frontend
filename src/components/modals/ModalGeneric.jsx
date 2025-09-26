import React from "react";

const ModalGeneric = ({
  title = "Editar",
  subTitle,
  inputs = [],
  buttons = [],
  widthModal="w-auto",
  borderVariant = "add"
}) => {

  const borderStyle = {
    edit: "border-yellow-zero",
    add: "border-pink-zero"
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-99">
      <div
        className={`bg-[#1E1E1E98] border-1 ${borderStyle[borderVariant]} text-white p-6 shadow-lg ${widthModal} max-w-[700px] transition-all duration-300 transform animate-fade-in-modal`}
      >
        <h2 className="text-xl font-bold mb-4">
          {title}
          {subTitle && (
            <>
              <br/>
              <span className="text-yellow-zero text-[14px]">
                {subTitle}
              </span>
            </>
          )}
        </h2>
        <form>
          <div className="flex flex-col gap-4">
            {inputs.map((input, index) =>
              React.cloneElement(input, { key: input.key || index })
            )}
          </div>
          <div className="mt-4 flex justify-end gap-4">
            {buttons.map((button, index) =>
              React.cloneElement(button, { key: button.key || index })
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalGeneric;
