import React from "react";

const FormFiled = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <label className="flex flex-col flex-1 w-full">
      {labelName && (
        <span className="font-epilogue text-[14px] text-[#808191] font-medium leading-[22px] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={7}
          placeholder={placeholder}
          className="py-[15px] sm:px[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[10px] sm:min-w-[300px] rounded-[10px]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[10px] sm:min-w-[300px] rounded-[10px]"
        />
      )}
    </label>
  );
};

export default FormFiled;
