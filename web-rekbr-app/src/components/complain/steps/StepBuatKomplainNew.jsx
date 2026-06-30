import React from 'react';
import { Check } from 'lucide-react';

const StepBuatKomplainNew = ({ waktuKomplain }) => {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className="w-7 h-7 flex items-center justify-center -ml-[2px]">
                    <div className="w-6 h-6 rounded-full box-border flex items-center justify-center bg-[#066afe] border-[#066afe]">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                <span className="text-base font-medium text-[#1c1c1c]">Buat Komplain</span>
                <span className="text-base font-bold text-gray-800">{waktuKomplain}</span>
            </div>
        </div>
    );
};

export default StepBuatKomplainNew; 