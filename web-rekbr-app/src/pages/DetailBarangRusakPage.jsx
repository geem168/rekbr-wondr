//DetailBarangRusakPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VerticalStep from "../components/complain/VerticalStep";
import { ChevronRightIcon } from "lucide-react";
import buktiPengirimanImg from "../assets/bukti-pengajuan.png";
import { formatDateTime } from "../components/lib/dateFormat";
import {
  getComplaintDetail,
  resolveComplaintStatus,
} from "../services/complaint.service";
import { formatCurrency } from "../components/lib/utils";

const BreadcrumbDetailComplain = ({ idKomplain }) => (
  <nav className='flex items-center space-x-2 text-sm mb-6'>
    <a href='/barang-rusak' className='text-blue-600 hover:underline'>
      Komplain Center
    </a>
    <ChevronRightIcon className='w-4 h-4 text-gray-400' />
    <a href='/barang-rusak' className='text-blue-600 hover:underline'>
      Komplain Barang Rusak
    </a>
    <ChevronRightIcon className='w-4 h-4 text-gray-400' />
    <span className='text-gray-500'>{idKomplain}</span>
  </nav>
);

const ComplainInfoSection = ({ title, children }) => (
  <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
    <h2 className='text-xl font-semibold mb-4 text-gray-800'>{title}</h2>
    {children}
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className='flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0'>
    <span className='text-gray-600'>{label}</span>
    <span className='text-gray-800 font-semibold'>{value}</span>
  </div>
);

const steps = [
  {
    name: "Waktu buat komplain",
    description: "16 Juni 2025, 10:00 WIB",
    status: "complete",
  },
  { name: "Menunggu seller setuju", description: "", status: "current" },
  { name: "Kirim barang ke penjual", description: "", status: "upcoming" },
  { name: "Konfirmasi barang diterima", description: "", status: "upcoming" },
  { name: "Pengembalian dana", description: "", status: "upcoming" },
];

//  WAITING_SELLER_APPROVAL, RETURN_REQUESTED, RETURN_IN_TRANSIT, AWAITING_SELLER_CONFIRMATION, COMPLETED, UNDER_INVESTIGATION, APPROVED_BY_SELLER, APPROVED_BY_ADMIN, REJECTED_BY_SELLER, REJECTED_BY_ADMIN, CANCELED_BY_BUYER AWAITING_ADMIN_APPROVAL, AWAITING_ADMIN_CONFIRMATION, APPROVED_BY_ADMIN, REJECTED_BY_ADMIN, CANCELED_BY_BUYER
const mapStatusComplaint = {
  waiting_seller_approval: "Menunggu Persetujuan Seller",
  return_in_transit: "Barang Sedang Dalam Pengiriman",
  return_requested: "Pengembalian Barang",
  approved_by_admin: "Persetujuan Admin",
  awaiting_admin_approval: "Menunggu Persetujuan Admin",
  awaiting_admin_confirmation: "Menunggu Persetujuan Admin",
  completed: "Transaksi Selesai",
  canceled_by_buyer: "Dibatalkan",
  approved_by_seller: "Seller Setuju",
  rejected_by_seller: "Seller Tolak",
  rejected_by_admin: "Komplain Dibatalkan",
};
const isVideo = (url) =>
  /\.(mp4|mov|avi|mkv|webm|flv|wmv|quicktime)(-[\d]+)?$/i.test(url);

const isImage = (url) => /\.(jpg|jpeg|png|webp)(-[\d]+)?$/i.test(url);

const getExtensionFromUrl = (url) => {
  const pathname = url.split("/").pop(); // contoh: "1720000000000-bukti.jpeg"
  if (!pathname) return "jpg";

  const match = pathname.match(/\.([a-zA-Z0-9]+)$/); // ambil setelah titik terakhir
  return match ? match[1] : "jpg";
};

const getDownloadUrl = (url, prefix = "bukti") => {
  const ext = getExtensionFromUrl(url);
  const filename = `${prefix}-${Date.now()}.${ext}`;
  return `${import.meta.env.VITE_API_BASE_URL
    }/download?url=${encodeURIComponent(url)}&filename=${filename}`;
};

const DetailBarangRusakPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getComplaintDetail(params?.id);
      const formattedData = {
        ...res,
        statusMap: mapStatusComplaint[res?.status] || "Menunggu Seller",
      };
      console.log("Detail Komplain:", formattedData);
      
      setData(formattedData);
    } catch (error) {
      alert(error.message);
    }
  };

  const resolveComplaint = async (status) => {
    try {
      await resolveComplaintStatus(params?.id, status);
      alert(
        `Komplain berhasil ${status === "approve" ? "disetujui" : "ditolak"}`
      );
      fetchData(); // Refresh data after resolving
    } catch (error) {
      alert(`Gagal mengubah status komplain: ${error.message}`);
    }
  };

  const handleNavigateToRekberDetail = () =>
    navigate(`/transactions/${data?.transaction?.id}`);

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <BreadcrumbDetailComplain
        idKomplain={data?.transaction?.transaction_code}
      />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Tracking Komplain */}
        <div className='lg:col-span-1'>
          <VerticalStep
            type='rusak'
            data={data}
            onTolak={() => resolveComplaint("reject")}
            onSetuju={() => resolveComplaint("approve")}
          />
        </div>

        {/* Right Side Content */}
        <div className='lg:col-span-2'>
          {/* Informasi Tanggapan */}
          <ComplainInfoSection title='Informasi Tanggapan'>
            {/* Label solusi */}
            <div className='inline-block bg-gray-300 text-gray-800 text-sm px-3 py-1 rounded-md mb-6'>
              Pengembalian barang dan dana
            </div>

            <div className='flex flex-col gap-6'>
              {/* Chat bubble kiri: alasan komplain dari pembeli */}
              <div className='flex flex-col gap-1'>
                <div className='bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-lg rounded-tl-none w-fit'>
                  {data?.buyer_reason || "Barang rusak, mohon pengembalian."}
                </div>

                {data?.buyer_evidence_urls?.length > 0 && (
                  <div className='flex gap-4 flex-wrap'>
                    {data.buyer_evidence_urls.map((item, i) => (
                      <div
                        key={i}
                        className='flex flex-col items-center bg-gray-100 rounded-lg border border-[#C9C9C9]'
                      >
                        <div className='relative overflow-hidden rounded-t-lg'>
                          {isVideo(item) ? (
                            <div className='relative max-h-80'>
                              <video
                                src={item}
                                className='max-h-80 object-cover'
                                controls
                              />
                            </div>
                          ) : isImage(item) ? (
                            <img
                              src={item}
                              alt={`Bukti ${i + 1}`}
                              className='max-h-80 object-cover'
                            />
                          ) : (
                            <p className='text-sm text-red-500 p-2'>
                              Format file tidak dikenali
                            </p>
                          )}
                        </div>
                        <div className='flex gap-2 my-2 mx-5'>
                          <a
                            href={getDownloadUrl(item, "bukti")}
                            className='bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700'
                          >
                            Download
                          </a>
                          <a
                            href={item}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50'
                          >
                            Preview
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className='text-xs text-gray-500'>
                  {data?.transaction?.buyer?.email} ·{" "}
                  <strong>{formatDateTime(data?.created_at)}</strong>
                </div>
              </div>

              {/* Chat bubble kanan: status dari step saat ini */}
              {(data?.status === "waiting_seller_approval" ||
                data?.status === "canceled_by_buyer") && (
                  <div className='flex flex-col gap-1 items-end'>
                    <div className='bg-blue-900 text-white text-sm px-4 py-2 rounded-lg rounded-tr-none w-fit'>
                      Menunggu respon seller untuk komplain ini .....
                    </div>
                    <p className='text-xs text-red-600'>
                      Menunggu respon sampai{" "}
                      <strong>
                        {formatDateTime(data?.seller_response_deadline)}
                      </strong>
                    </p>
                  </div>
                )}

              {data?.seller_decision === "approved" && (
                <div className='flex flex-col gap-1 items-end'>
                  <div className='bg-blue-900 text-white text-sm px-4 py-2 rounded-lg rounded-tr-none w-fit'>
                    Seller mau nerima barang kembaliin agar dapat ditukar, kirim
                    bukti Refund
                  </div>

                  {data?.seller_evidence_urls?.length > 0 && (
                    <div className='flex gap-4 flex-wrap justify-end'>
                      {data.seller_evidence_urls.map((item, i) => (
                        <div
                          key={i}
                          className='flex flex-col items-center bg-gray-100 rounded-lg border border-[#C9C9C9]'
                        >
                          <div className='relative overflow-hidden rounded-t-lg'>
                            {isVideo(item) ? (
                              <div className='relative max-h-80'>
                                <video
                                  src={item}
                                  className='max-h-80 object-cover'
                                  controls
                                />
                              </div>
                            ) : isImage(item) ? (
                              <img
                                src={item}
                                alt={`Bukti ${i + 1}`}
                                className='max-h-80 object-cover'
                              />
                            ) : (
                              <p className='text-sm text-red-500 p-2'>
                                Format file tidak dikenali
                              </p>
                            )}
                          </div>
                          <div className='flex gap-2 my-2 mx-5'>
                            <a
                              href={getDownloadUrl(item, "bukti")}
                              className='bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700'
                            >
                              Download
                            </a>
                            <a
                              href={item}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50'
                            >
                              Preview
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className='text-xs text-gray-500'>
                    {data?.transaction?.seller?.email} ·{" "}
                    <strong>{formatDateTime(data?.seller_responded_at)}</strong>
                  </div>
                </div>
              )}

              {data?.seller_decision === "rejected" && (
                <div className='flex flex-col gap-1 items-end'>
                  <div className='bg-blue-900 text-white text-sm px-4 py-2 rounded-lg rounded-tr-none w-fit'>
                    {data?.seller_response_reason ||
                      "Menunggu persetujuan admin untuk komplain ini."}
                  </div>

                  {data?.seller_evidence_urls?.length > 0 && (
                    <div className='flex gap-4 flex-wrap justify-end'>
                      {data.seller_evidence_urls.map((item, i) => (
                        <div
                          key={i}
                          className='flex flex-col items-center bg-gray-100 rounded-lg border border-[#C9C9C9]'
                        >
                          <div className='relative overflow-hidden rounded-t-lg'>
                            {isVideo(item) ? (
                              <div className='relative max-h-80'>
                                <video
                                  src={item}
                                  className='max-h-80 object-cover'
                                  controls
                                />
                              </div>
                            ) : isImage(item) ? (
                              <img
                                src={item}
                                alt={`Bukti ${i + 1}`}
                                className='max-h-80 object-cover'
                              />
                            ) : (
                              <p className='text-sm text-red-500 p-2'>
                                Format file tidak dikenali
                              </p>
                            )}
                          </div>
                          <div className='flex gap-2 my-2 mx-5'>
                            <a
                              href={getDownloadUrl(item, "bukti")}
                              className='bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700'
                            >
                              Download
                            </a>
                            <a
                              href={item}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50'
                            >
                              Preview
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className='text-xs text-gray-500'>
                    {data?.transaction?.seller?.email} ·{" "}
                    <strong>{formatDateTime(data?.seller_responded_at)}</strong>
                  </div>
                </div>
              )}

              {data?.status === "canceled_by_buyer" && (
                <div className='flex flex-col gap-1'>
                  <div className='bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-lg rounded-tl-none w-fit'>
                    Buyer telah membatalkan komplain ini.
                  </div>

                  <div className='text-xs text-gray-500'>
                    {data?.transaction?.buyer?.email} ·{" "}
                    <strong>{formatDateTime(data?.resolved_at)}</strong>
                  </div>
                </div>
              )}
            </div>
          </ComplainInfoSection>

          {/* Informasi Komplain */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 font-sf-pro">Informasi Komplain</h2>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold text-base font-sf-pro transition"
                onClick={handleNavigateToRekberDetail}
              >
                Lihat Detail Rekber
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Kolom Kiri */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-sf-pro">ID Transaksi</p>
                  <span className="text-sm font-medium text-gray-900 font-sf-pro">{data?.transaction?.transaction_code}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-sf-pro">Nama Barang</p>
                  <span className="text-sm font-medium text-gray-900 font-sf-pro">{data?.transaction?.item_name}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-sf-pro">Buyer</p>
                  <span className="text-sm font-medium text-gray-900 font-sf-pro">{data?.transaction?.buyer?.email}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-sf-pro">Seller</p>
                  <span className="text-sm font-medium text-gray-900 font-sf-pro">{data?.transaction?.seller?.email}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-sf-pro">No Resi Ekspedisi</p>
                  <span className="text-sm font-medium text-gray-900 font-sf-pro tracking-widest">{data?.transaction?.shipment?.tracking_number}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-sf-pro">Ekspedisi</p>
                  <span className="text-sm font-medium text-gray-900 font-sf-pro">{data?.transaction?.shipment?.courier?.name}</span>
                </div>
              </div>
              {/* Kolom Kanan */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-sf-pro">Tagihan Rekber</p>
                  <div className="bg-gray-100 rounded px-4 py-2 text-lg font-bold text-gray-900 font-sf-pro">{formatCurrency(data?.transaction?.total_amount)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-sf-pro">Nominal Barang</p>
                  <span className="text-sm font-medium text-gray-900 font-sf-pro">{data?.transaction?.item_price}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-sf-pro">Asuransi Pengiriman BNI Life (0.2%)</p>
                  <span className="text-sm font-medium text-gray-900 font-sf-pro">{data?.transaction?.insurance_fee}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-sf-pro">Biaya Jasa Aplikasi</p>
                  <span className="text-sm font-medium text-gray-900 font-sf-pro">{data?.transaction?.platform_fee}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informasi Pengiriman */}
          {data?.return_shipment && (
            <InformasiPengiriman data={data?.return_shipment} />
          )}

          {/* Bukti Pengajuan */}
          {data?.buyer_requested_confirmation_at && (
            <InformasiPengajuan data={data} />
          )}
        </div>
      </div>
    </div>
  );
};

// Komponen Informasi Pengiriman
const InformasiPengiriman = ({ data }) => (
  <div className='bg-white rounded-lg border border-gray-200 p-6 mt-6'>
    <h2 className='text-lg font-semibold text-gray-900 mb-4'>
      Informasi Pengembalian Barang
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-6'>
      <div>
        <p className='text-sm text-gray-500 mb-1'>No Resi</p>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium text-gray-900 tracking-widest select-all'>
            {data?.tracking_number || "Tidak ada no resi"}
          </span>
          <button
            className='text-xs text-blue-600 hover:underline'
            onClick={() =>
              navigator.clipboard.writeText(
                data?.tracking_number || "Tidak ada no resi"
              )
            }
          >
            Salin
          </button>
        </div>
      </div>
      <div>
        <p className='text-sm text-gray-500 mb-1'>Ekspedisi</p>
        <span className='text-sm font-medium text-gray-900'>
          {data?.courier?.name || "Tidak ada informasi ekspedisi"}
        </span>
      </div>
    </div>
    <div className='flex flex-col items-center gap-3'>
      <div className='flex flex-col gap-1 items-center'>
        <p className='text-sm text-gray-500'>Bukti Pengiriman</p>
        <span className='text-sm font-medium text-gray-900'>
          {data?.photo_url?.split("/").pop() || "Tidak ada bukti pengiriman"}
        </span>
      </div>
      <img
        src={data?.photo_url}
        alt='Bukti Resi'
        className='rounded-lg max-h-80 border'
      />
      <div className='flex gap-3'>
        <a
          href={getDownloadUrl(data?.photo_url, "foto")}
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
          href={data?.photo_url}
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
  showKonfirmasi,
  konfirmasiType,
  onKonfirmasi,
  data,
}) => (
  <div className='bg-white rounded-lg border border-gray-200 p-6 mt-6'>
    <h2 className='text-lg font-semibold text-gray-900 mb-4'>
      Informasi Pengajuan Penerimaan Pengembalian
    </h2>
    <div className='mb-4'>
      <p className='text-sm text-gray-500 mb-1'>Alasan Permintaan Konfirmasi</p>
      <span className='text-sm font-medium text-gray-900'>
        {data?.buyer_requested_confirmation_reason || "Tidak ada alasan"}
      </span>
    </div>
    {/* {!(
      currentStatus === "pengajuanKonfirmasi" ||
      currentStatus === "pengajuanDitolak" ||
      currentStatus === "barangDiterima"
    ) && (
        <div className="flex gap-3 mb-4">
          <button
            onClick={onTolak}
            className="bg-pink-100 text-pink-700 px-4 py-2 rounded font-medium"
          >
            Tolak
          </button>
          <button
            onClick={onSetuju}
            className="bg-blue-700 text-white px-4 py-2 rounded font-medium"
          >
            Setujui
          </button>
        </div>
      )} */}
    {data?.buyer_requested_confirmation_evidence_urls?.length > 0 && (
      <div className='flex flex-col items-center gap-3'>
        <p className='text-sm text-gray-500'>
          Bukti Permintaan Konfirmasi Seller
        </p>
        <div className='flex gap-4 flex-wrap justify-center'>
          {data.buyer_requested_confirmation_evidence_urls.map((url, index) => (
            <div key={index} className='flex flex-col items-center gap-2  p-3'>
              <span className='text-sm font-medium text-gray-900 text-center'>
                {url?.split("/").pop() || "Tidak ada bukti"}
              </span>

              {isVideo(url) ? (
                <video
                  src={url}
                  controls
                  className='rounded-lg max-h-80 border object-contain'
                />
              ) : isImage(url) ? (
                <img
                  src={url}
                  alt='Bukti Pengajuan'
                  className='rounded-lg max-h-80 border object-contain'
                />
              ) : (
                <p className='text-sm text-red-500'>
                  Format file tidak dikenali
                </p>
              )}

              <div className='flex gap-2'>
                <a
                  href={getDownloadUrl(url, "bukti-konfirmasi")}
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
                  href={url}
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
          ))}
        </div>
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

export default DetailBarangRusakPage;
