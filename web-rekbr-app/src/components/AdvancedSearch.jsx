import React, { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

const AdvancedSearch = ({
    Icon = Search,
    placeholder,
    value,
    onChange,
    disabled = false,
    loading = false,
    onClear,
    className = ''
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e) => {
        if (onChange && !disabled) {
            onChange(e.target.value);
        }
    };

    const handleClear = () => {
        if (onClear) {
            onClear();
        } else if (onChange) {
            onChange('');
        }
    };

    return (
        <div className={`w-full flex flex-col text-left text-[13px] text-darkslategray font-sf-pro ${className}`}>
            <div
                className={`
          w-full h-8 flex items-center gap-2 bg-white border rounded-lg overflow-hidden px-2 transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed border-gray-300' : 'border-dimgray'}
          ${isFocused && !disabled ? 'border-blue-500 ring-1 ring-blue-500' : ''}
        `}
            >
                {loading ? (
                    <Loader2 className="w-4 h-4 stroke-current animate-spin" />
                ) : (
                    Icon && <Icon className={`w-4 h-4 stroke-current ${disabled ? 'opacity-50' : ''}`} />
                )}

                <input
                    type='text'
                    value={value || ''}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    disabled={disabled || loading}
                    className={`
            flex-1 h-full bg-transparent outline-none text-[13px] leading-[18px] placeholder-dimgray
            ${disabled || loading ? 'cursor-not-allowed' : ''}
          `}
                />

                {value && !disabled && !loading && (
                    <button
                        onClick={handleClear}
                        className="p-0.5 hover:bg-gray-100 rounded transition-colors"
                        type="button"
                    >
                        <X className="w-3 h-3 stroke-current" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdvancedSearch; 