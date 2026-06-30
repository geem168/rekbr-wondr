import React from "react";
import VerticalStepComplain from "./VerticalStepComplain";

// Contoh mapping data informasi komplain dari table barang hilang (BE)
// const rekberInfo = {
//   id: "12345678901",
//   waktu: "17 Juni 2025",
//   nama: "Laptop Acer 2018...",
//   pembeli: "bayuseptyan43@gmail.com",
//   noResi: "JX3474124013",
//   ekspedisi: "J&T Express Indonesia"
// }

const InformasiKomplain = ({ info }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Komplain</h2>
        <div className="grid grid-cols-1 gap-4">
            <div>
                <p className="text-sm text-gray-500 mb-1">ID Komplain</p>
                <span className="text-sm font-medium text-gray-900">{info?.id || '-'}</span>
            </div>
            <div>
                <p className="text-sm text-gray-500 mb-1">Waktu Komplain</p>
                <span className="text-sm font-medium text-gray-900">{info?.waktu || '-'}</span>
            </div>
            <div>
                <p className="text-sm text-gray-500 mb-1">Nama Barang</p>
                <span className="text-sm font-medium text-gray-900">{info?.nama || '-'}</span>
            </div>
            <div>
                <p className="text-sm text-gray-500 mb-1">Pembeli</p>
                <span className="text-sm font-medium text-gray-900">{info?.pembeli || '-'}</span>
            </div>
            <div>
                <p className="text-sm text-gray-500 mb-1">No Resi</p>
                <span className="text-sm font-medium text-gray-900">{info?.noResi || '-'}</span>
            </div>
            <div>
                <p className="text-sm text-gray-500 mb-1">Ekspedisi</p>
                <span className="text-sm font-medium text-gray-900">{info?.ekspedisi || '-'}</span>
            </div>
        </div>
    </div>
);

const ComplainDetailSection = ({ complainTracking, rekberInfo }) => {
    return (
        <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Kiri: Vertical Step */}
            <div className="md:w-1/2 w-full flex justify-center">
                <VerticalStepComplain {...complainTracking} />
            </div>
            {/* Kanan: Informasi Komplain */}
            <div className="md:w-1/2 w-full">
                <InformasiKomplain info={rekberInfo} />
            </div>
        </div>
    );
};

export default ComplainDetailSection; 