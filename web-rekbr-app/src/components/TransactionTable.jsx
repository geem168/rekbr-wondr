import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../components/ui/checkbox";

const mapStatusToUI = {
  pending_payment: "Menunggu Pembayaran",
  waiting_shipment: "Menunggu Resi",
  shipped: "Dalam Pengiriman",
  completed: "Transaksi Selesai",
  complain: "Komplain",
  refunded: "Dana Dikembalikan",
  canceled: "Dibatalkan",
};

const mapFundStatusToUI = {
  pending: "Menunggu Tinjauan",
  approved: "Disetujui",
  rejected: "Ditolak",
  none: "Tanpa Pengajuan",
  null: "Tanpa Pengajuan",
};

const getStatusClass = (status) => {
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
    case "complain":
      return `${base} bg-orange-200 text-orange-800`;
    case "refunded":
      return `${base} bg-green-200 text-green-800`;
    case "canceled":
      return `${base} bg-red-300 text-red-800`;
    default:
      return `${base} bg-gray-100 text-gray-600`;
  }
};

const getFundStatusClass = (status) => {
  const base = "text-xs font-semibold";
  switch (status) {
    case "pending":
      return `${base} text-yellow-600`;
    case "approved":
      return `${base} text-green-600`;
    case "rejected":
      return `${base} text-red-600`;
    case "none":
    case null:
      return `${base} text-gray-400`;
    default:
      return `${base} text-gray-400`;
  }
};

const formatDateID = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const columns = [
  { key: "transactionCode", label: "ID Transaksi", minWidth: "120px" },
  { key: "createdAt", label: "Tanggal Buat", minWidth: "160px" },
  { key: "itemName", label: "Barang", minWidth: "180px" },
  { key: "buyerEmail", label: "Email Buyer", minWidth: "180px" },
  { key: "sellerEmail", label: "Email Seller", minWidth: "180px" },
  { key: "totalAmount", label: "Nominal", minWidth: "140px" },
  { key: "status", label: "Status Rekber", minWidth: "140px" },
  { key: "fundReleaseStatus", label: "Status Pengajuan", minWidth: "160px" },
];

const TransactionTable = ({
  transactions,
  loading,
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const navigate = useNavigate();

  const [checkedItems, setCheckedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const allChecked =
      transactions.length > 0 &&
      transactions.every((txn) => checkedItems[txn.id]);
    setSelectAll(allChecked);
  }, [checkedItems, transactions]);

  const handleHeaderCheckboxChange = (checked) => {
    const updated = {};
    transactions.forEach((txn) => {
      updated[txn.id] = checked;
    });
    setCheckedItems(updated);
    setSelectAll(checked);
  };

  const handleCheckboxChange = (id, checked) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div className='flex w-full justify-center p-4'>
      <div className='w-full max-w-[1200px]'>
        {/* Header Info */}
        <div className='flex flex-row items-center justify-start gap-6 mb-4 font-sf-pro text-black'>
          <div className='font-semibold text-lg sm:text-xl md:text-2xl lg:text-xl'>
            Jumlah informasi yang ditampilkan
          </div>
          <div className='rounded-full bg-blue-500 px-5 py-1 text-white font-bold text-base'>
            <b>{transactions.length}</b>
          </div>
        </div>

        {/* Table Scroll */}
        <div className='overflow-x-auto'>
          <Table className='border-collapse border border-[#c9c9c9] w-full'>
            <TableHeader>
              <TableRow className='bg-[#f3f3f3] border-b border-[#c9c9c9]'>
                <TableHead className='w-[60px] min-w-[60px] h-[38px] p-0 border-r border-[#c9c9c9]'>
                  <div className='flex h-[38px] items-center justify-center'>
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={handleHeaderCheckboxChange}
                      className='h-5 w-5 border border-[#5c5c5c] rounded'
                    />
                  </div>
                </TableHead>
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={`px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c] min-w-[${col.minWidth}]`}
                  >
                    {col.label}
                  </TableHead>
                ))}
                <TableHead className='w-[52px] p-0 min-w-[52px]' />
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? [...Array(5)].map((_, i) => (
                    <TableRow
                      key={i}
                      className='h-[38px] border-b border-[#c9c9c9] bg-white'
                    >
                      <TableCell className='w-[42px] p-0 border-r'>
                        <div className='bg-gray-200 h-4 w-4 mx-auto rounded animate-pulse'></div>
                      </TableCell>
                      {columns.map((col, j) => (
                        <TableCell key={j} className='px-2 py-0 border-r'>
                          <div className='bg-gray-200 h-4 w-full rounded animate-pulse'></div>
                        </TableCell>
                      ))}
                      <TableCell className='text-center'>
                        <div className='bg-gray-200 h-4 w-[20px] mx-auto rounded animate-pulse' />
                      </TableCell>
                    </TableRow>
                  ))
                : transactions.map((txn, i) => (
                    <TableRow
                      key={txn.id}
                      className={`h-[38px] border-b border-[#c9c9c9] ${
                        i % 2 === 0 ? "bg-white" : "bg-[#f3f3f3]"
                      } hover:bg-[#e6f7ff]`}
                    >
                      <TableCell className='w-[42px] p-0 border-r border-[#c9c9c9]'>
                        <div className='flex h-[38px] items-center justify-center'>
                          <Checkbox
                            checked={checkedItems[txn.id] || false}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(txn.id, checked)
                            }
                            className='h-4 w-4 border border-[#5c5c5c] rounded'
                          />
                        </div>
                      </TableCell>
                      <TableCell className='px-2 py-0 border-r text-sm text-[#5c5c5c] border-[#c9c9c9]'>
                        {txn.transactionCode}
                      </TableCell>
                      <TableCell className='px-2 py-0 border-r text-sm text-[#5c5c5c] border-[#c9c9c9]'>
                        {formatDateID(txn.createdAt)}
                      </TableCell>
                      <TableCell className='px-2 py-0 border-r text-sm text-[#5c5c5c] border-[#c9c9c9]'>
                        {txn.itemName}
                      </TableCell>
                      <TableCell className='px-2 py-0 border-r text-sm text-[#5c5c5c] border-[#c9c9c9]'>
                        {txn.buyerEmail}
                      </TableCell>
                      <TableCell className='px-2 py-0 border-r text-sm text-[#5c5c5c] border-[#c9c9c9]'>
                        {txn.sellerEmail}
                      </TableCell>
                      <TableCell className='px-2 py-0 border-r text-sm text-[#5c5c5c] border-[#c9c9c9]'>
                        Rp.{" "}
                        {txn.totalAmount.toLocaleString("id-ID", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className='px-2 py-0 border-r text-sm text-[#5c5c5c] border-[#c9c9c9]'>
                        <span className={getStatusClass(txn.status)}>
                          {mapStatusToUI[txn.status] || txn.status}
                        </span>
                      </TableCell>
                      <TableCell className='px-2 py-0 border-r text-sm text-[#5c5c5c] border-[#c9c9c9]'>
                        <span
                          className={getFundStatusClass(txn.fundReleaseStatus)}
                        >
                          {mapFundStatusToUI[txn.fundReleaseStatus]}
                        </span>
                      </TableCell>
                      <TableCell className='text-center'>
                        <ArrowRightIcon
                          className='w-4 h-4 text-[#5c5c5c] hover:text-blue-600 cursor-pointer'
                          onClick={() => navigate(`/transactions/${txn.id}`)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className='flex justify-end items-center mt-4 space-x-2'>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-3 py-1 border border-[#c9c9c9] rounded text-sm text-[#5c5c5c] bg-white hover:bg-[#e6f7ff] disabled:opacity-50'
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => onPageChange(index + 1)}
              className={`px-3 py-1 border border-[#c9c9c9] rounded text-sm ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-[#5c5c5c] hover:bg-[#e6f7ff]"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-3 py-1 border border-[#c9c9c9] rounded text-sm text-[#5c5c5c] bg-white hover:bg-[#e6f7ff] disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
