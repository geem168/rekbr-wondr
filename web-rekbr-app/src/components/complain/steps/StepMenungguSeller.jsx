import React from 'react';
import { Check, Clock } from 'lucide-react';

const StepMenungguSeller = ({ waktuKomplain }) => {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className="w-7 h-7 flex items-center justify-center -ml-[2px]">
                    <div className="w-6 h-6 rounded-full box-border flex items-center justify-center bg-[#066afe] border-[#066afe]">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                </div>
                <div className="w-0.5 h-12 bg-[#066afe] ml-[1px]"></div>
            </div>
            <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                <span className="text-base font-medium text-[#1c1c1c]">Buat Komplain</span>
                <span className="text-base font-bold text-gray-800">{waktuKomplain}</span>
            </div>
        </div>
    );
};

const StepMenungguSellerWaiting = () => {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className="w-7 h-7 flex items-center justify-center -ml-[2px]">
                    <div className="w-6 h-6 rounded-full box-border flex items-center justify-center border-2 border-[#066afe] bg-white">
                        <div className="w-3 h-3 rounded-full bg-[#066afe] animate-spin"></div>
                    </div>
                </div>
                <div className="w-0.5 h-12 bg-[#c9c9c9] ml-[1px]"></div>
            </div>
            <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                <span className="text-base font-medium text-[#066afe] font-bold">Menunggu Persetujuan Seller</span>
                <span className="text-base font-bold text-gray-800">Menunggu seller untuk menyetujui atau menolak komplain</span>
            </div>
        </div>
    );
};

const StepMenungguSellerComplete = ({ waktuKomplain, waktuSellerSetuju }) => {
    return (
        <>
            <StepMenungguSeller waktuKomplain={waktuKomplain} />
            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <div className="w-7 h-7 flex items-center justify-center -ml-[2px]">
                        <div className="w-6 h-6 rounded-full box-border flex items-center justify-center bg-[#066afe] border-[#066afe]">
                            <Check className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1 pb-6 -mt-1 ml-2">
                    <span className="text-base font-medium text-[#1c1c1c]">Seller Menyetujui</span>
                    <span className="text-base font-bold text-gray-800">{waktuSellerSetuju}</span>
                </div>
            </div>
        </>
    );
};

export default StepMenungguSeller;
export { StepMenungguSellerWaiting, StepMenungguSellerComplete }; 