import React, { useEffect, useState, useCallback } from "react";
import RekberInfoSection from "../components/RekberDetail/RekberInfoSection";
import TrackingDemo from "../components/RekberDetail/TrackingRekber/TrackingDemo";
import bniLogo from "../assets/bni.png";
import contohResi from "../assets/contoh-resi.png";
import buktiPengajuan from "../assets/bukti-pengajuan.png";
import Breadcrumb from "../components/BreadCrumb";
import {
  getTransactionById,
  postFundRelease,
} from "../services/transaksi.service";
import { useParams } from "react-router-dom";

// Helper untuk parsing tanggal dari string trackingData
function parseDateFromStep(stepTimestamp) {
  // Format: "9 Juni 2025, 15:30 WIB"
  if (!stepTimestamp) return null;
  const [tglBlnThn, jamMenit] = stepTimestamp.replace(" WIB", "").split(", ");
  const [tgl, bln, thn] = tglBlnThn.split(" ");
  const bulanArr = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const monthIdx = bulanArr.findIndex((b) => b === bln);
  const [jam, menit] = jamMenit.split(":");
  return new Date(
    Number(thn),
    monthIdx,
    Number(tgl),
    Number(jam),
    Number(menit)
  );
}

// Komponen Informasi Pengiriman
const InformasiPengiriman = ({ shippingInfo }) => (
  <div className='bg-white rounded-lg border border-gray-200 p-6 mt-6'>
    <h2 className='text-lg font-semibold text-gray-900 mb-4'>
      Informasi Pengiriman
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-6'>
      <div>
        <p className='text-sm text-gray-500 mb-1'>No Resi</p>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium text-gray-900 tracking-widest select-all'>
            {shippingInfo.noResi}
          </span>
          <button
            className='text-xs text-blue-600 hover:underline'
            onClick={() => navigator.clipboard.writeText(shippingInfo.noResi)}
          >
            Salin
          </button>
        </div>
      </div>
      <div>
        <p className='text-sm text-gray-500 mb-1'>Ekspedisi</p>
        <span className='text-sm font-medium text-gray-900'>
          {shippingInfo.ekspedisi}
        </span>
      </div>
    </div>
    <div>
      <p className='text-sm text-gray-500 mb-1'>Bukti Pengiriman</p>
      <span className='text-sm font-medium text-gray-900'>
        {shippingInfo.buktiFile.filename}
      </span>
      <div className='mt-4 mb-4'>
        <img
          src={shippingInfo.buktiFile.url}
          alt='Bukti Resi'
          className='rounded-lg w-full max-w-xl border mx-auto'
        />
      </div>
      <div className='flex gap-3 justify-center'>
        <a
          href={`${
            import.meta.env.VITE_API_BASE_URL
          }/download?url=${encodeURIComponent(
            shippingInfo.buktiFile.url
          )}&filename=bukti.jpg`}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4'
            />
          </svg>
          Download
        </a>
        <a
          href={shippingInfo.buktiFile.url}
          target='_blank'
          rel='noopener noreferrer'
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <circle cx='12' cy='12' r='3' />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.4 15A7.97 7.97 0 0020 12c0-4.418-3.582-8-8-8S4 7.582 4 12c0 1.042.2 2.037.56 2.95'
            />
          </svg>
          Preview
        </a>
      </div>
    </div>
  </div>
);

const InformasiPengajuan = ({
  submissionInfo,
  onSetuju,
  onTolak,
  showKonfirmasi,
  setShowKonfirmasi,
  konfirmasiType,
  onKonfirmasi,
  currentStatus,
}) => (
  <div className='bg-white rounded-lg border border-gray-200 p-6 mt-6'>
    <h2 className='text-lg font-semibold text-gray-900 mb-4'>
      Informasi Pengajuan
    </h2>
    <div className='mb-4'>
      <p className='text-sm text-gray-500 mb-1'>Alasan Permintaan Konfirmasi</p>
      <span className='text-sm font-medium text-gray-900'>
        {submissionInfo.alasan}
      </span>
    </div>
    {!(
      currentStatus === "pengajuanKonfirmasi" ||
      currentStatus === "pengajuanDitolak" ||
      currentStatus === "barangDiterima"
    ) && (
      <div className='flex gap-3 mb-4'>
        <button
          onClick={onTolak}
          className='bg-pink-100 text-pink-700 px-4 py-2 rounded font-medium'
        >
          Tolak
        </button>
        <button
          onClick={onSetuju}
          className='bg-blue-700 text-white px-4 py-2 rounded font-medium'
        >
          Setujui
        </button>
      </div>
    )}
    <div className='mb-4'>
      <p className='text-sm text-gray-500 mb-1'>Permintaan Konfirmasi Buyer</p>
      <span className='text-sm font-medium text-gray-900'>
        {submissionInfo.buktiFile.filename}
      </span>
      <div className='mt-4 mb-4'>
        <img
          src={submissionInfo.buktiFile.url}
          alt='Bukti Pengajuan'
          className='rounded-lg w-full max-w-xl border mx-auto'
        />
      </div>
      <div className='flex gap-3 justify-center'>
        <a
          href={`${
            import.meta.env.VITE_API_BASE_URL
          }/download?url=${encodeURIComponent(
            submissionInfo.buktiFile.url
          )}&filename=bukti.jpg`}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4'
            />
          </svg>
          Download
        </a>
        <a
          href={submissionInfo.buktiFile.url}
          target='_blank'
          rel='noopener noreferrer'
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <circle cx='12' cy='12' r='3' />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19.4 15A7.97 7.97 0 0020 12c0-4.418-3.582-8-8-8S4 7.582 4 12c0 1.042.2 2.037.56 2.95'
            />
          </svg>
          Preview
        </a>
      </div>
    </div>

    {/* Status refund */}
    {currentStatus === "pengembalianDana" && (
      <div className='mt-4 text-sm text-red-600 font-semibold text-center'>
        Dana transaksi telah dikembalikan ke buyer.
      </div>
    )}

    {/* Popup konfirmasi */}
    {showKonfirmasi && (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50'>
        <div className='bg-white rounded-lg p-6 shadow-lg max-w-sm w-full'>
          <p className='mb-4 text-center text-base font-semibold'>
            {konfirmasiType === "setuju"
              ? "Setujui permintaan konfirmasi ini?"
              : "Tolak permintaan konfirmasi ini?"}
          </p>
          <div className='flex gap-3 justify-center'>
            <button
              onClick={() => onKonfirmasi(true)}
              className='bg-blue-700 text-white px-4 py-2 rounded font-medium'
            >
              Ya
            </button>
            <button
              onClick={() => onKonfirmasi(false)}
              className='bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium'
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

const mapApiStatusToCurrentStatus = (apiStatus) => {
  switch (apiStatus) {
    case "pending_payment":
      return "menungguPembayaran";
    case "waiting_shipment":
      return "menungguResi";
    case "shipped":
      return "dalamPengiriman";
    case "completed":
      return "barangDiterima";
    case "canceled":
      return "rekberBatal";
    case "fund_release_requested":
      return "menungguPersetujuanAdmin";
    case "refunded":
      return "pengembalianDana";
    case "complain":
      return "komplain";
    default:
      return "menungguPembayaran";
  }
};

const mapFundReleaseStatus = (requested, status) => {
  if (requested) {
    // Kalau ada request pencairan
    if (status === "approved") return "Diterima";
    if (status === "rejected") return "Ditolak";
    return "Diajukan"; // default kalau requested true tapi statusnya belum approved/rejected
  }
  return "Tanpa Pengajuan"; // kalau requested false
};

const RekberDetailPage = () => {
  const [data, setData] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("menungguPembayaran");
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [konfirmasiType, setKonfirmasiType] = useState(null);
  const [pengajuanStatus, setPengajuanStatus] = useState("Permintaan Ditinjau");
  const [waktuAdminSetuju, setWaktuAdminSetuju] = useState(null);
  const [initialRekberInfo, setInitialRekberInfo] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [submissionInfo, setSubmissionInfo] = useState(null);
  const [timeInfo, setTimeInfo] = useState(null);
  const [isFundReleaseRequested, setIsFundReleaseRequested] = useState(false);

  const { transactionId } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const res = await getTransactionById(transactionId);
      const item = res.data;
      setData(item);

      setInitialRekberInfo({
        virtualAccount: item.virtualAccount,
        transactionId: item.id,
        productName: item.itemName,
        bill: {
          total: `Rp. ${Number(item.totalAmount).toLocaleString("id-ID")},00`,
          product: `Rp. ${Number(item.itemPrice).toLocaleString("id-ID")},00`,
          insurance: `Rp. ${Number(item.insuranceFee).toLocaleString(
            "id-ID"
          )},00`,
          serviceFee: `Rp. ${Number(item.platformFee).toLocaleString(
            "id-ID"
          )},00`,
        },
        seller: {
          email: item.sellerEmail,
          userId: "RBK-0000001",
          bank: {
            name: item.withdrawalBank.bankName,
            logo: item.withdrawalBank.logoUrl,
            accountNumber: item.withdrawalBank.accountNumber,
          },
        },
        buyer: {
          email: item.buyerEmail,
          userId: "RBK-0000010",
          status:
            item.status === "pending_payment" ? "Belum Transfer" : item.status,
        },
      });

      setTimeInfo({
        createTime: item.createdAt,
        paymentTime: item.paidAt,
        payementDeadline: item.paymentDeadline,
        shipmentDeadline: item.shipmentDeadline,
        shipmentTime: item.shipment.shipmentDate,
        fundReleaseRequestTime: item.fundReleaseRequest.requestedAt,
        fundReleaseResolveTime: item.fundReleaseRequest.resolvedAt,
        buyerConfirmDeadline: item.buyerConfirmDeadline,
        buyerConfirmTime: item.buyerConfirmedAt,
      });

      setShippingInfo({
        noResi: item.shipment.trackingNumber || "null",
        ekspedisi: item.shipment.courier || "null",
        buktiFile: {
          url: item.shipment.photoUrl || contohResi,
          filename: item.shipment.photoUrl ? "resi.jpg" : "contoh-resi.jpg",
        },
      });

      setSubmissionInfo({
        alasan: "Barang diterima pembeli dapat dilakukan pencairan dana",
        noResi: item.shipment.trackingNumber || "null",
        ekspedisi: item.shipment.courier || "null",
        buktiFile: {
          url: item.fundReleaseRequest.evidenceUrl || buktiPengajuan,
          filename: item.fundReleaseRequest.evidenceUrl
            ? "bukti-pengajuan.jpg"
            : "contoh-pengajuan.jpg",
        },
        statusPengajuan: mapFundReleaseStatus(
          item.fundReleaseRequest.requested,
          item.fundReleaseRequest.status
        ),
        waktuAdminSetuju: item.fundReleaseRequest.resolvedAt,
      });

      setIsFundReleaseRequested(item.fundReleaseRequest.requested);

      // Debugging log di sini
      if (item.status === "completed") {
        // Prioritaskan status 'completed'
        setCurrentStatus("barangDiterima");
      } else if (item.fundReleaseRequest.requested) {
        const fundStatus = item.fundReleaseRequest.status;
        const statusMap = {
          pending: "menungguPersetujuanAdmin",
          approved: "pengajuanKonfirmasi",
          rejected: "pengajuanDitolak",
        };
        setCurrentStatus(
          statusMap[fundStatus] || mapApiStatusToCurrentStatus(item.status)
        );
      } else {
        setCurrentStatus(mapApiStatusToCurrentStatus(item.status));
      }
    } catch (error) {
      console.error("Gagal ambil data transaksi:", error);
    }
  }, [transactionId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    console.log("currentStatus:", currentStatus);
  }, [currentStatus]);

  if (!initialRekberInfo) {
    return (
      <div className='text-center py-8 text-gray-500'>
        Memuat data transaksi...
      </div>
    );
  }

  const waktuBikinRekber = timeInfo.createTime;
  const waktuBuyerBayar = timeInfo.paymentTime;

  // Untuk status pengajuan, label dan badge kuning/abu-abu
  let pengajuanBadge = null;
  let effectivePengajuanStatus = pengajuanStatus;
  let buyerKonfirmasiDeadline = null;
  if (currentStatus === "menungguPersetujuanAdmin") {
    effectivePengajuanStatus = "Permintaan Ditinjau";
  } else if (currentStatus === "pengajuanKonfirmasi" && waktuAdminSetuju) {
    effectivePengajuanStatus = "Pengajuan Diterima";
    buyerKonfirmasiDeadline = new Date(
      new Date(waktuAdminSetuju).getTime() + 24 * 60 * 60 * 1000
    );
  }
  if (
    ["menungguPersetujuanAdmin", "pengajuanDitolak"].includes(currentStatus)
  ) {
    pengajuanBadge = effectivePengajuanStatus ? (
      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
        {effectivePengajuanStatus}
      </span>
    ) : null;
  } else if (currentStatus === "pengajuanKonfirmasi") {
    pengajuanBadge = (
      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'>
        Pengajuan Diterima
      </span>
    );
  } else if (currentStatus === "dalamPengiriman") {
    pengajuanBadge = (
      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700'>
        Tanpa Pengajuan
      </span>
    );
  } else if (currentStatus === "pengembalianDana") {
    pengajuanBadge = (
      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-200 text-green-800'>
        Dana Dikembalikan
      </span>
    );
  } else if (currentStatus === "komplain") {
    pengajuanBadge = (
      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-300 text-red-800'>
        Komplain
      </span>
    );
  }
  let deadlineLabel = "Buyer transfer sebelum";
  let deadlineDate = null;
  let deadlineBadge = null;
  if (currentStatus === "menungguPembayaran") {
    deadlineLabel = "Buyer transfer sebelum";
    // deadlineDate = waktuBikinRekber
    //   ? new Date(
    //       parseDateFromStep(waktuBikinRekber).getTime() + 3 * 60 * 60 * 1000
    //     )
    //   : null;
    deadlineDate = timeInfo.paymentDeadline;
  } else if (currentStatus === "menungguResi") {
    deadlineLabel = "Seller kirim barang sebelum";
    // deadlineDate = waktuBuyerBayar
    //   ? new Date(
    //       parseDateFromStep(waktuBuyerBayar).getTime() + 2 * 24 * 60 * 60 * 1000
    //     )
    //   : null;
    deadlineDate = timeInfo.shipmentDeadline;
  } else if (currentStatus === "dalamPengiriman") {
    deadlineLabel = "Status pengajuan";
    deadlineDate = null;
  } else if (
    [
      "menungguPersetujuanAdmin",
      "pengajuanKonfirmasi",
      "pengajuanDitolak",
    ].includes(currentStatus)
  ) {
    deadlineLabel = "Status pengajuan";
    deadlineDate = null;
  } else if (currentStatus === "rekberBatal") {
    deadlineLabel = "Status Rekber";
    deadlineDate = null;
    deadlineBadge = (
      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700'>
        Rekber Dibatalkan
      </span>
    );
  } else if (currentStatus === "barangDiterima") {
    deadlineLabel = "Status pengajuan";
    deadlineDate = null;
  } else if (currentStatus === "pengembalianDana") {
    deadlineLabel = "Status Rekber";
    deadlineDate = null;
    deadlineBadge = (
      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-200 text-green-800'>
        Dana Dikembalikan
      </span>
    );
  } else if (currentStatus === "komplain") {
    deadlineLabel = "Status Rekber";
    deadlineDate = null;
    deadlineBadge = (
      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-300 text-red-800'>
        Komplain
      </span>
    );
  } else {
    deadlineLabel = "Buyer transfer sebelum";
    deadlineDate = waktuBikinRekber
      ? new Date(
          parseDateFromStep(waktuBikinRekber).getTime() + 3 * 60 * 60 * 1000
        )
      : null;
  }

  // Seller rekening berbeda untuk menungguResi (contoh)
  const sellerBank =
    currentStatus === "menungguResi"
      ? { name: "BNI", logo: bniLogo, accountNumber: "1234567890" }
      : initialRekberInfo.seller.bank;

  // Buyer rekening hanya untuk menungguResi, dalamPengiriman, menungguPersetujuanAdmin, pengajuanKonfirmasi, pengajuanDitolak, barangDiterima
  const buyerObj = [
    "menungguResi",
    "dalamPengiriman",
    "menungguPersetujuanAdmin",
    "pengajuanKonfirmasi",
    "pengajuanDitolak",
    "barangDiterima",
  ].includes(currentStatus)
    ? {
        ...initialRekberInfo.buyer,
        bank: { name: "BNI", logo: bniLogo, accountNumber: "0987654321" },
        status: undefined,
      }
    : initialRekberInfo.buyer;

  // Siapkan info yang akan di-pass ke RekberInfoSection
  const infoProps = {
    deadlineLabel,
    deadlineDate,
    seller: initialRekberInfo.seller,
    buyer: initialRekberInfo.buyer,
    virtualAccount: initialRekberInfo.virtualAccount,
    transactionId: initialRekberInfo.transactionId,
    productName: initialRekberInfo.productName,
    bill: initialRekberInfo.bill,
    pengajuanBadge,
    deadlineBadge,
    currentStatus,
    buyerKonfirmasiDeadline,
  };

  // Untuk status pengajuan konfirmasi
  const handleSetuju = () => {
    setKonfirmasiType("setuju");
    setShowKonfirmasi(true);
  };
  const handleTolak = () => {
    setKonfirmasiType("tolak");
    setShowKonfirmasi(true);
  };

  const handleKonfirmasi = async (isYes) => {
    setShowKonfirmasi(false);
    if (isYes) {
      try {
        if (konfirmasiType === "setuju") {
          await postFundRelease(transactionId, "approve");
          setPengajuanStatus("Diterima");
          setWaktuAdminSetuju(new Date().toISOString());
          setCurrentStatus("pengajuanKonfirmasi");
          setShowKonfirmasi(false);
        } else {
          await postFundRelease(transactionId, "reject");
          setPengajuanStatus("Ditolak");
          setCurrentStatus("pengajuanDitolak");
        }
      } catch (error) {
        console.error("Gagal update status pengajuan:", error);
      }
    }
  };

  // Untuk status menungguPersetujuanAdmin dan pengajuanKonfirmasi/pengajuanDitolak
  // const showSubmission =
  //   currentStatus === "menungguPersetujuanAdmin" ||
  //   currentStatus === "pengajuanKonfirmasi" ||
  //   currentStatus === "pengembalianDana" ||
  //   currentStatus === "komplain" ||
  //   currentStatus === "pengajuanDitolak";
  const showSubmission = isFundReleaseRequested;
  const submissionProps = {
    ...submissionInfo,
    statusPengajuan: pengajuanStatus,
    waktuAdminSetuju,
  };

  return (
    <div className='w-full'>
      <Breadcrumb />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
        <div className='space-y-6'>
          <TrackingDemo
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
            timeInfo={timeInfo}
          />
        </div>
        <div className='space-y-6'>
          <RekberInfoSection {...infoProps} />
          {(currentStatus === "dalamPengiriman" ||
            showSubmission ||
            currentStatus === "barangDiterima" || data?.shipment?.trackingNumber) && (
            <InformasiPengiriman shippingInfo={shippingInfo} />
          )}
          {showSubmission && (
            <InformasiPengajuan
              submissionInfo={submissionProps}
              onSetuju={handleSetuju}
              onTolak={handleTolak}
              showKonfirmasi={showKonfirmasi}
              setShowKonfirmasi={setShowKonfirmasi}
              konfirmasiType={konfirmasiType}
              onKonfirmasi={handleKonfirmasi}
              currentStatus={currentStatus}
            />
          )}
        </div>
      </div>  
    </div>
  );
};

export default RekberDetailPage;
