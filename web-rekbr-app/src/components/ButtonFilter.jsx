import React from "react";
import { Funnel } from "lucide-react";

const ButtonFilter = ({ children, variant = "primary", onClick, className = "" }) => {
  const baseClasses = "relative h-8 flex items-center text-center text-sm font-sf-pro cursor-pointer";

  const variantClasses = {
    primary: "text-[#fff] bg-[#0250d9] shadow-[0px_1px_0px_rgba(0,0,0,0.15)_inset,0px_0.5px_2px_rgba(0,0,0,0.35)_inset,2px_2px_5px_rgba(0,0,0,0.08)_inset]",
    secondary: "text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200"
  };

  return (
    <div className={`${baseClasses} ${className}`} onClick={onClick}>
      <div className={`flex items-center gap-2 h-8 px-4 py-px rounded-lg overflow-hidden ${variantClasses[variant]}`}>
        {variant === "primary" && <Funnel className="w-3 h-3 fill-current" />}
        <div className="leading-[19px]">{children}</div>
      </div>
    </div>
  );
};

export default ButtonFilter;