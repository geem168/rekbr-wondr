import React from "react";
import classNames from "classnames"; // Mengimpor classnames untuk penggunaan fungsi cn

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type} // Menetapkan tipe input (default: "text")
      className={classNames(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", // Kelas standar
        className // Kelas tambahan yang diteruskan melalui prop className
      )}
      ref={ref} // Menetapkan referensi untuk input
      {...props} // Meneruskan properti lainnya (misalnya value, onChange, placeholder)
    />
  );
});

Input.displayName = "Input"; // Menetapkan nama komponen

export { Input };
