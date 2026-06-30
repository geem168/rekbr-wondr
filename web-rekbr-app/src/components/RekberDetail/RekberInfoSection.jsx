import React from "react";
import bniLogo from "../../assets/bni.png";

// Helper untuk format tanggal ke "9 Juni 2025, 17:00 WIB"
function formatIndoDate(date) {
  if (!date) return "-";
  const bulan = [
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
  const d = new Date(date);
  const tgl = d.getDate();
  const bln = bulan[d.getMonth()];
  const thn = d.getFullYear();
  const jam = d.getHours().toString().padStart(2, "0");
  const menit = d.getMinutes().toString().padStart(2, "0");
  return `${tgl} ${bln} ${thn}, ${jam}:${menit} WIB`;
}

const handleCopy = (text) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
};

const getStatusRekberClass = (status) => {
  const base =
    "inline-flex items-center justify-center px-2 py-[2px] rounded-full text-xs font-semibold whitespace-nowrap";

  switch (status) {
    case "pending_payment":
      return `${base} bg-gray-200 text-gray-700`;
    case "waiting_shipment":
      return `${base} bg-purple-200 text-purple-800`;
    case "shipped":
      return `${base} bg-yellow-200 text-yellow-800`;
    case "completed":
      return `${base} bg-green-200 text-green-800`;
    case "refunded":
      return `${base} bg-green-200 text-green-800`;
    case "canceled":
      return `${base} bg-red-300 text-red-800`;
    case "complain":
      return `${base} bg-red-300 text-red-800`;
    default:
      return `${base} bg-gray-100 text-gray-600`;
  }
};

const mapStatusToUI = (apiStatus) => {
  const map = {
    pending_payment: "Menunggu Pembayaran",
    waiting_shipment: "Menunggu Resi",
    shipped: "Dalam Pengiriman",
    completed: "Transaksi Selesai",
    refunded: "Pengembalian",
    complain: "Sedang Dalam Proses Komplain",
    canceled: "Dibatalkan",
  };
  return map[apiStatus] || "Status Tidak Dikenal";
};

const RekberInfoSection = ({
  deadlineLabel = "Buyer transfer sebelum",
  deadlineDate = null,
  seller = null,
  buyer = null,
  virtualAccount = null,
  transactionId = null,
  productName = null,
  bill = null,
  pengajuanBadge = null,
  deadlineBadge = null,
  currentStatus = null,
  buyerKonfirmasiDeadline = null,
}) => {
  return (
    <div className='bg-white rounded-lg border border-gray-200 p-6'>
      <h2 className='text-lg font-semibold text-gray-900 mb-4'>
        Informasi Rekber
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Kolom Kiri */}
        <div className='space-y-3'>
          <div>
            <p className='text-sm text-gray-500 mb-1'>Virtual Account</p>
            <div className='flex items-center gap-2'>
              {currentStatus === "rekberBatal" ? (
                <span className='text-xs font-medium bg-gray-100 text-gray-400 px-3 py-1 rounded select-all cursor-not-allowed'>
                  {virtualAccount}
                </span>
              ) : (
                <span className='text-sm font-medium text-gray-900 tracking-widest select-all'>
                  {virtualAccount}
                </span>
              )}
              <button
                className='text-xs text-blue-600 hover:underline'
                onClick={() => handleCopy(virtualAccount)}
                disabled={currentStatus === "rekberBatal"}
              >
                Salin
              </button>
            </div>
          </div>
          <div>
            <p className='text-sm text-gray-500 mb-1'>ID Transaksi</p>
            <span className='text-sm font-medium text-gray-900'>
              {transactionId}
            </span>
          </div>
          <div>
            <p className='text-sm text-gray-500 mb-1'>Nama Barang</p>
            <span className='text-sm font-medium text-gray-900'>
              {productName}
            </span>
          </div>
          {deadlineBadge ? (
            <div>
              <p className='text-sm text-gray-500 mb-1'>{deadlineLabel}</p>
              {deadlineBadge}
            </div>
          ) : pengajuanBadge ? (
            <div>
              <p className='text-sm text-gray-500 mb-1'>Status pengajuan</p>
              {currentStatus === "barangDiterima" ? (
                <>
                  <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2'>
                    Diterima
                  </span>
                  {buyerKonfirmasiDeadline && (
                    <div className='mt-2'>
                      <p className='text-xs text-gray-500 mb-1'>
                        Buyer cek & dan konfirmasi
                      </p>
                      <span className='font-bold text-sm text-gray-900'>
                        {formatIndoDate(buyerKonfirmasiDeadline)}
                      </span>
                    </div>
                  )}
                </>
              ) : currentStatus === "pengajuanKonfirmasi" ? (
                <>
                  <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2'>
                    Pengajuan Diterima
                  </span>
                  {buyerKonfirmasiDeadline && (
                    <div className='mt-2'>
                      <p className='text-xs text-gray-500 mb-1'>
                        Buyer cek & dan konfirmasi sebelum
                      </p>
                      <span className='inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-xs font-medium mt-1'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-4 h-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        {formatIndoDate(buyerKonfirmasiDeadline)}
                      </span>
                    </div>
                  )}
                </>
              ) : currentStatus === "pengajuanDitolak" ? (
                <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 mb-2'>
                  Pengajuan Ditolak
                </span>
              ) : (
                <>{pengajuanBadge}</>
              )}
            </div>
          ) : (
            deadlineDate && (
              <div>
                <p className='text-sm text-gray-500 mb-1'>{deadlineLabel}</p>
                <span className='inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-xs font-medium mt-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-4 h-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  {formatIndoDate(deadlineDate)}
                </span>
              </div>
            )
          )}
        </div>
        {/* Kolom Kanan */}
        <div className='space-y-3'>
          <div>
            <p className='text-sm text-gray-500 mb-1'>Tagihan Rekber</p>
            <div className='bg-gray-100 rounded px-4 py-2 text-lg font-bold text-gray-900'>
              {bill.total}
            </div>
          </div>
          <div>
            <p className='text-sm text-gray-500 mb-1'>Nominal Barang</p>
            <span className='text-sm font-medium text-gray-900'>
              {bill.product}
            </span>
          </div>
          <div>
            <p className='text-sm text-gray-500 mb-1'>
              Asuransi Pengiriman BNI Life (0.2%)
            </p>
            <span className='text-sm font-medium text-gray-900'>
              {bill.insurance}
            </span>
          </div>
          <div>
            <p className='text-sm text-gray-500 mb-1'>
              Biaya Jasa Aplikasi
            </p>
            <span className='text-sm font-medium text-gray-900'>
              {bill.serviceFee}
            </span>
          </div>
        </div>
      </div>
      {/* Info Penjual & Pembeli */}
      <div className='mt-8'>
        <h3 className='text-base font-semibold text-gray-900 mb-4'>
          Informasi Penjual & Pembeli
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Penjual */}
          <div>
            <p className='text-sm text-gray-500 mb-1'>Penjual</p>
            <div className='mb-2'>
              <span className='text-sm font-medium text-gray-900'>
                {seller.email}
              </span>
            </div>
            <div className='mb-2'>
              <p className='text-xs text-gray-500 mb-1'>ID Pengguna</p>
              <div className='flex items-center gap-2'>
                <span className='text-xs font-medium text-gray-900 select-all'>
                  {seller.userId}
                </span>
                <button
                  className='text-xs text-blue-600 hover:underline'
                  onClick={() => handleCopy(seller.userId)}
                >
                  Salin
                </button>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <img
                src={seller.bank.logo}
                alt={seller.bank.name}
                className='w-6 h-6 object-contain'
              />
              <span className='text-sm font-medium text-gray-900 tracking-widest select-all'>
                {seller.bank.accountNumber}
              </span>
              <button
                className='text-xs text-blue-600 hover:underline'
                onClick={() => handleCopy(seller.bank.accountNumber)}
              >
                Salin
              </button>
            </div>
          </div>
          {/* Pembeli */}
          <div>
            <p className='text-sm text-gray-500 mb-1'>Pembeli</p>
            <div className='mb-2'>
              <span className='text-sm font-medium text-gray-900'>
                {buyer.email}
              </span>
            </div>
            <div className='mb-2'>
              <p className='text-xs text-gray-500 mb-1'>ID Pengguna</p>
              <div className='flex items-center gap-2'>
                <span className='text-xs font-medium text-gray-900 select-all'>
                  {buyer.userId}
                </span>
                <button
                  className='text-xs text-blue-600 hover:underline'
                  onClick={() => handleCopy(buyer.userId)}
                >
                  Salin
                </button>
              </div>
            </div>
            {buyer.bank ? (
              <div className='flex items-center gap-2'>
                <img
                  src={buyer.bank.logo}
                  alt={buyer.bank.name}
                  className='w-6 h-6 object-contain'
                />
                <span className='text-sm font-medium text-gray-900 tracking-widest select-all'>
                  {buyer.bank.accountNumber}
                </span>
                <button
                  className='text-xs text-blue-600 hover:underline'
                  onClick={() => handleCopy(buyer.bank.accountNumber)}
                >
                  Salin
                </button>
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <span className={getStatusRekberClass(buyer.status)}>
                  {mapStatusToUI(buyer.status)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekberInfoSection;
