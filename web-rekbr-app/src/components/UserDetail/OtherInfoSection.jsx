import React from "react";

export const OtherInfoSection = () => {
  const otherData = [
    {
      label: "Nama Ibu Kandung",
      value: "Srikandi Malajaya",
      fullWidth: true
    },
    {
      label: "Kode POS",
      value: "22534",
      rightLabel: "Pendidikan Terakhir",
      rightValue: "Sarjana"
    },
    {
      label: "Nama Usaha",
      value: "CV Merdeka Harga Mati",
      rightLabel: "Bidang Usaha",
      rightValue: "Teknologi"
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Lainnya</h2>
      
      <div className="space-y-4">
        {otherData.map((item, index) => (
          <div key={index} className={item.fullWidth ? "w-full" : "grid grid-cols-2 gap-8"}>
            <div>
              <p className="text-sm text-gray-500 mb-1">{item.label}</p>
              <p className="text-sm font-medium text-gray-900">{item.value}</p>
            </div>
            
            {!item.fullWidth && (
              <div>
                <p className="text-sm text-gray-500 mb-1">{item.rightLabel}</p>
                <p className="text-sm font-medium text-gray-900">{item.rightValue}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};