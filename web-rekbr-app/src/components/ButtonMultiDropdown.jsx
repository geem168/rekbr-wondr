import React from 'react';
import { X } from "lucide-react";

const ButtonMultiDropdown = ({
  placeholder,
  options,
  selectedValues = [],
  onSelectionChange,
  isDisabled = false
}) => {
  const toggleSelect = (item) => {
    if (selectedValues.includes(item)) {
      onSelectionChange(selectedValues.filter((i) => i !== item));
    } else {
      onSelectionChange([...selectedValues, item]);
    }
  };

  const removeItem = (item) => {
    onSelectionChange(selectedValues.filter((i) => i !== item));
  };

  return (
    <div className="w-full flex flex-col text-left text-[13px] text-darkslategray font-sf-pro gap-2">
      <select
        onChange={(e) => {
          const selectedValue = e.target.value;
          if (selectedValue && !selectedValues.includes(selectedValue)) {
            onSelectionChange([...selectedValues, selectedValue]);
          }
          e.target.value = ""; // reset select ke placeholder setelah select
        }}
        disabled={isDisabled}
        className={`w-full h-8 bg-white border border-dimgray rounded-lg px-2 text-[13px] outline-none ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>

      {/* Selected Tags */}
      <div className="flex flex-wrap gap-1">
        {selectedValues.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center border border-blue-600 text-blue-600 rounded-full px-2 py-[2px] text-[11px] leading-none bg-blue-50"
          >
            <div className="text-[11px] leading-none overflow-hidden text-ellipsis whitespace-nowrap">
              {item}
            </div>
            <button
              className="ml-1 font-bold text-xs hover:text-blue-800 transition-colors"
              onClick={() => removeItem(item)}
              disabled={isDisabled}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonMultiDropdown;
