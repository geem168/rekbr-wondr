import React from 'react';

const InputSearch = ({ Icon, placeholder, value, onChange, disabled = false }) => {
  const handleChange = (e) => {
    if (onChange && !disabled) {
      // Handle both direct value and event object
      if (typeof onChange === 'function') {
        if (e && e.target) {
          onChange(e.target.value);
        } else {
          onChange(e);
        }
      }
    }
  };

  return (
    <div className='w-full flex flex-col text-left text-[13px] text-darkslategray font-sf-pro'>
      <div className={`w-full h-8 flex items-center gap-2 bg-white border border-dimgray rounded-lg overflow-hidden px-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {Icon && <Icon className={`w-4 h-4 stroke-current ${disabled ? 'opacity-50' : ''}`} />}
        <input
          type='text'
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`flex-1 h-full bg-transparent outline-none text-[13px] leading-[18px] placeholder-dimgray ${disabled ? 'cursor-not-allowed' : ''}`}
        />
      </div>
    </div>
  );
};

export default InputSearch;
