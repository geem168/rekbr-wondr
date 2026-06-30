import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority"; // Import cva dari class-variance-authority
import { cn } from "../lib/utils"; // Import fungsi cn untuk menggabungkan kelas CSS

// Variasi untuk komponen Label
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

// Komponen Label
const Label = React.forwardRef(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)} // Gabungkan kelas default dan kelas tambahan
      {...props} // Sebarkan properti lainnya ke komponen Label
    />
  )
);

// Tentukan nama komponen untuk debugging
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
