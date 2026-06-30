import React from "react";
import { AlertCircle, CheckCircle, XCircle, Megaphone } from "lucide-react";
import VerticalStep from "./VerticalStep";
import { formatDateTime } from "../../lib/dateFormat";

const statusLabels = {
  menungguPembayaran: "Status: Menunggu Pembayaran",
  menungguResi: "Status: Menunggu Resi",
  dalamPengiriman: "Status: Dalam Pengiriman",
  menungguPersetujuanAdmin: "Status: Menunggu Persetujuan Admin",
  pengajuanKonfirmasi: "Status: Menunggu Konfirmasi Buyer",
  pengajuanDitolak: "Status: Pengajuan Ditolak",
  barangDiterima: "Status: Barang Diterima",
  rekberBatal: "Status: Rekber Dibatalkan",
};

const labelToApiKeyMap = {
  "Waktu bikin rekber": "createTime",
  "Waktu buyer bayar": "paymentTime",
  "Deadline pembayaran": "payementDeadline",
  "Deadline pengiriman seller": "shipmentDeadline",
  "Waktu seller memberikan resi": "shipmentTime",
  "Seller pengajuan konfirmasi": "fundReleaseRequestTime",
  "Admin meneruskan pengajuan": "fundReleaseResolveTime",
  "Deadline konfirmasi buyer": "buyerConfirmDeadline",
  "Waktu buyer konfirmasi diterima": "buyerConfirmTime",
  "Rekber dibatalkan oleh seller": "cancelTime",
};

const trackingData = {
  menungguPembayaran: {
    badge: {
      text: "Menunggu Pembayaran",
      bgColor: "#f9e3b6",
      textColor: "#000000",
      icon: AlertCircle,
    },
    steps: [
      { label: "Waktu bikin rekber", status: "completed" },
      { label: "Menunggu pembayaran buyer dalam 3 jam", status: "current" },
    ],
  },
  menungguResi: {
    badge: {
      text: "Menunggu Resi",
      bgColor: "#f9e3b6",
      textColor: "#000000",
      icon: AlertCircle,
    },
    steps: [
      { label: "Waktu bikin rekber", status: "completed" },
      { label: "Waktu buyer bayar", status: "completed" },
      { label: "Menunggu resi seller dalam 2 x 24 jam", status: "current" },
    ],
  },
  dalamPengiriman: {
    badge: {
      text: "Dalam Pengiriman",
      bgColor: "#f9e3b6",
      textColor: "#000000",
      icon: AlertCircle,
    },
    steps: [
      { label: "Waktu bikin rekber", status: "completed" },
      { label: "Waktu buyer bayar", status: "completed" },
      { label: "Waktu seller memberikan resi", status: "completed" },
      { label: "Dalam pengiriman", status: "current" },
    ],
  },
  menungguPersetujuanAdmin: {
    badge: {
      text: "Dalam Pengiriman",
      bgColor: "#f9e3b6",
      textColor: "#000000",
      icon: AlertCircle,
    },
    steps: [
      { label: "Waktu bikin rekber", status: "completed" },
      { label: "Waktu buyer bayar", status: "completed" },
      { label: "Waktu seller memberikan resi", status: "completed" },
      { label: "Seller pengajuan konfirmasi", status: "completed" },
      { label: "Menunggu persetujuan admin", status: "current" },
    ],
  },
  pengajuanKonfirmasi: {
    badge: {
      text: "Dalam Pengiriman",
      bgColor: "#f9e3b6",
      textColor: "#000000",
      icon: AlertCircle,
    },
    steps: [
      { label: "Waktu bikin rekber", status: "completed" },
      { label: "Waktu buyer bayar", status: "completed" },
      { label: "Waktu seller memberikan resi", status: "completed" },
      { label: "Seller pengajuan konfirmasi", status: "completed" },
      { label: "Admin meneruskan pengajuan", status: "completed" },
      {
        label: "Buyer cek dan konfirmasi sebelum 1 x 24 jam",
        status: "current",
      },
    ],
  },
  pengajuanDitolak: {
    badge: {
      text: "Dalam Pengiriman",
      bgColor: "#f9e3b6",
      textColor: "#000000",
      icon: AlertCircle,
    },
    steps: [
      { label: "Waktu bikin rekber", status: "completed" },
      { label: "Waktu buyer bayar", status: "completed" },
      { label: "Waktu seller memberikan resi", status: "completed" },
      { label: "Seller pengajuan konfirmasi", status: "completed" },
      { label: "Admin menolak pengajuan", status: "current" },
    ],
  },
  barangDiterima: {
    badge: {
      text: "Barang Diterima Buyer",
      bgColor: "#e6f4ea",
      textColor: "#1e4620",
      icon: CheckCircle,
    },
    steps: [
      { label: "Waktu bikin rekber", status: "completed", isSuccess: true },
      { label: "Waktu buyer bayar", status: "completed", isSuccess: true },
      {
        label: "Waktu seller memberikan resi",
        status: "completed",
        isSuccess: true,
      },
      {
        label: "Seller pengajuan konfirmasi",
        status: "completed",
        isSuccess: true,
      },
      {
        label: "Admin meneruskan pengajuan",
        status: "completed",
        isSuccess: true,
      },
      {
        label: "Waktu buyer konfirmasi diterima",
        status: "current",
        isSuccess: true,
      },
    ],
  },
  rekberBatal: {
    badge: {
      text: "Rekber Dibatalkan",
      bgColor: "#fde8e8",
      textColor: "#b91c1c",
      icon: XCircle,
    },
    steps: [
      { label: "Waktu bikin rekber", status: "completed" },
      { label: "Rekber dibatalkan oleh seller", status: "current" },
    ],
  },
  pengembalianDana: {
    badge: {
      text: "Rekber Selesai (Pengembalian Dana)",
      bgColor: "#e6f4ea",
      textColor: "#1e4620",
      icon: CheckCircle,
    },
    steps: [
      { label: "Waktu bikin rekber", status: "completed", isSuccess: true },
      { label: "Waktu buyer bayar", status: "completed", isSuccess: true },
      {
        label: "Waktu seller memberikan resi",
        status: "completed",
        isSuccess: true,
      },
      {
        label: "Complain diajukan oleh buyer",
        status: "completed",
        isSuccess: true,
      },
      {
        label: "Pengembalian Dana",
        status: "completed",
        isSuccess: true,
      },
    ],
  },
  komplain: {
    badge: {
      text: "Komplain Rekber",
      bgColor: "#fca5a5",
      textColor: "#991b1b",
      icon: Megaphone,
    },
    steps: [
      { label: "Waktu bikin rekber", status: "completed", },
      { label: "Waktu buyer bayar", status: "completed",},
      {
        label: "Waktu seller memberikan resi",
        status: "completed",
      },
      {
        label: "Complain diajukan oleh buyer",
        status: "current",
      },
    ],
  },
};

// Helper ambil timestamp
const getTimestampFromTimeInfo = (label, timeInfo) => {
  const key = labelToApiKeyMap[label];
  return key ? timeInfo[key] : null;
};

const TrackingDemo = ({ currentStatus, timeInfo }) => {
  const currentData = trackingData[currentStatus];

  if (!currentData) {
  return (
    <div className="p-6">
      <span className="text-sm text-red-500">Status rekber tidak valid. Sekarang : {currentStatus}</span>
    </div>
  );
}

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Badge Status */}
      <div className="mb-4">
        <span
          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
          style={{
            backgroundColor: currentData.badge.bgColor,
            color: currentData.badge.textColor,
          }}
        >
          {currentData.badge.icon && (
            <currentData.badge.icon className="w-3 h-3 mr-2" />
          )}
          {currentData.badge.text}
        </span>
      </div>

      {/* Tracking Steps */}
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-[#1c1c1c]">
          Tracking Rekber
        </h3>

        <div className="flex flex-col gap-0">
          {currentData.steps.map((step, index) => {

            const apiKey = labelToApiKeyMap[step.label];
            const timestamp =
              apiKey && timeInfo ? formatDateTime(timeInfo[apiKey]) : "-";

            return (
              <VerticalStep
                key={index}
                status={step.status}
                label={step.label}
                timestamp={timestamp}
                isLast={index === currentData.steps.length - 1}
                showConnector={index < currentData.steps.length - 1}
                isSuccess={step.isSuccess}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackingDemo;
