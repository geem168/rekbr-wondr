import React from "react";

export const PersonalDataSection = () => {
  const personalData = [
    {
      label: "Nomor Identitas",
      value: "1273040311020000",
      rightLabel: "Nama Lengkap",
      rightValue: "IRGI MUTTAQIN FAHREZI"
    },
    {
      label: "Tanggal Lahir",
      value: "03 November 2000",
      rightLabel: "Jenis Kelamin",
      rightValue: "Laki Laki"
    },
    {
      label: "Agama",
      value: "Islam",
      rightLabel: "Status Perkawinan",
      rightValue: "Lajang"
    },
    {
      label: "Alamat Sesuai KTP",
      value: "Jl. Lada No.1",
      rightLabel: "Provinsi",
      rightValue: "DKI Jakarta"
    },
    {
      label: "Kecamatan",
      value: "Taman Sari",
      rightLabel: "Kelurahan / Desa",
      rightValue: "Pinangsia"
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Diri</h2>
      
      <div className="space-y-4">
        {personalData.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">{item.label}</p>
              <p className="text-sm font-medium text-gray-900">{item.value}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">{item.rightLabel}</p>
              <p className="text-sm font-medium text-gray-900">{item.rightValue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};