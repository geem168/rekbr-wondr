import React from "react";

const MultiSelectDropdown = ({ placeholder, options, value, onChange }) => {
  const handleToggle = (val) => {
    const exists = value.includes(val);
    if (exists) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className='w-full flex flex-col text-left text-[13px] text-darkslategray font-sf-pro'>
      <select
        value=''
        onChange={(e) => handleToggle(e.target.value)}
        className='w-full h-8 bg-white border border-dimgray rounded-lg px-2 text-[13px] outline-none'
      >
        <option value=''>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {value.length > 0 && (
        <div className='mt-1 flex flex-wrap gap-1'>
          {value.map((val) => {
            const label = options.find((o) => o.value === val)?.label || val;
            return (
              <span
                key={val}
                className='flex items-center border border-blue-600 text-blue-600 rounded-full px-2 py-[2px] text-[11px] leading-none'
              >
                {label}
                <button
                  onClick={() => handleToggle(val)}
                  className='ml-1 font-bold text-xs'
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
