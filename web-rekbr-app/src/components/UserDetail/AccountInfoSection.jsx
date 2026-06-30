import React from "react";
import { formatDateTime } from "../lib/dateFormat";

export const AccountInfoSection = ({ userInfo }) => {
  const accountData = [
    {
      label: "Email Pengguna",
      value: userInfo.email,
      rightLabel: "Tanggal Pendaftaran",
      rightValue: formatDateTime(userInfo.createDate)
    },
    {
      label: "Status KYC",
      value: userInfo.kycStatus,
      isStatus: true,
      rightLabel: "Tanggal Submit KYC",
      rightValue: formatDateTime(userInfo.kycSubmittedAt)
    },
    {
      label: "ID Pengguna",
      value: userInfo.usersId,
      rightLabel: "Tanggal Diterima",
      rightValue: formatDateTime(userInfo.updateDate)
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Akun</h2>
      
      <div className="space-y-4">
        {accountData.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">{item.label}</p>
              <div className="flex items-center">
                {item.isStatus ? (
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.value === "verified"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        item.value === "verified"
                          ? "bg-green-400"
                          : "bg-red-400"
                      }`}
                    ></span>
                    {item.value}
                  </span>
                ) : (
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                )}
              </div>
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
