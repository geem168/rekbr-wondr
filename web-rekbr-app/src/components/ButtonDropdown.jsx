import { ChevronDown } from "lucide-react";

const ButtonDropdown = ({ placeholder, options, value, onChange }) => {
  return (
    <div className='w-full flex flex-col text-left text-[13px] text-darkslategray font-sf-pro'>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full h-8 bg-white border border-dimgray rounded-lg px-2 text-[13px] outline-none'
      >
        <option value=''>{placeholder}</option>
        {options.map((option, idx) => {
          const isObject = typeof option === "object" && option !== null;
          const label = isObject ? option.label : option;
          const val = isObject ? option.value : option;

          return (
            <option key={idx} value={val}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ButtonDropdown;
