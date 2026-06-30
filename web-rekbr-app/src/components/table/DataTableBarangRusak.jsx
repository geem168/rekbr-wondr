import React, { useState, useEffect, useMemo } from "react";
import { Checkbox } from "../ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { ChevronDownIcon, ArrowRightIcon, CheckCircle2, XCircle } from "lucide-react";
import { getListComplaint } from "../../services/complaint.service";
import { formatDate} from "../lib/dateFormat";

const STATUS_COLORS = {
    "Persetujuan Seller": "text-[#5C5C5C]",
    "Dibatalkan": "text-gray-400",
    "Komplain Ditolak Admin": "text-red-500",
    "Pengembalian Barang": "text-yellow-500",
    "Persetujuan Admin": "text-blue-600",
    "Transaksi Selesai": "text-teal-500",
    "Seller Setuju": "text-green-500",
    "Seller Tolak": "text-red-600",
    "Barang Sedang Dalam Pengiriman": "text-blue-500",
    "Menunggu Persetujuan Admin": "text-blue-600",
};

const PENGAJUAN_STATUS_COLORS = {
    "Ditolak": "text-red-500 font-semibold",
    "Menunggu Seller": "text-blue-600 font-semibold",
    "Ditinjau": "text-yellow-600 font-semibold",
    "Tanpa pengajuan": "text-gray-500",
    "Teruskan Konfirmasi": "text-green-600 font-semibold",
    "Tolak Konfirmasi": "text-red-600 font-semibold",
};

//  WAITING_SELLER_APPROVAL, RETURN_REQUESTED, RETURN_IN_TRANSIT, AWAITING_SELLER_CONFIRMATION, COMPLETED, UNDER_INVESTIGATION, APPROVED_BY_SELLER, APPROVED_BY_ADMIN, REJECTED_BY_SELLER, REJECTED_BY_ADMIN, CANCELED_BY_BUYER
const mapStatusComplaint = {
    

    "waiting_seller_approval": "Persetujuan Seller",
    "return_in_transit": "Barang Sedang Dalam Pengiriman",
    "return_requested": "Pengembalian Barang",
    "approved_by_admin": "Persetujuan Admin",
    "awaiting_admin_approval": "Menunggu Persetujuan Admin",
    "awaiting_seller_confirmation": "Menunggu Persetujuan Admin",
    "completed": "Transaksi Selesai",
    "canceled_by_buyer": "Dibatalkan",
    "approved_by_seller": "Seller Setuju",
    "rejected_by_seller": "Seller Tolak",
    "rejected_by_admin": "Komplain Ditolak Admin",
}

const statusOrder = [
    "Persetujuan Seller",
    "Pengembalian Barang",
    "Persetujuan Admin",
    "Transaksi Selesai",
    "Komplain Ditolak Admin",
    "Dibatalkan",
    "Seller Setuju",
    "Seller Tolak",
];

const asuransiIcon = (val) =>
    val ? (
        <CheckCircle2 className="text-blue-500 w-5 h-5" />
    ) : (
        <XCircle className="text-gray-400 w-5 h-5" />
    );

const columns = [
    { key: "transaction_code", label: "ID Transaksi", minWidth: "120px" },
    { key: "waktu", label: "Waktu Komplain", minWidth: "140px", sortable: true },
    { key: "nama", label: "Nama Barang", minWidth: "180px" },
    { key: "pembeli", label: "Pembeli", minWidth: "180px" },
    { key: "noResi", label: "No Resi", minWidth: "140px" },
    { key: "ekspedisi", label: "Ekspedisi", minWidth: "180px", sortable: true },
    { key: "statusMap", label: "Status Komplain", minWidth: "160px", filterable: true },
    // { key: "statusPengajuan", label: "Status Pengajuan", minWidth: "160px" },
    { key: "asuransi", label: "Asuransi", minWidth: "80px" },
];

const DataTableBarangRusak = ({ onRowDetail, filterConfig, loading = false }) => {
    const [data, setData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const parseDate = (str) => {
        const [day, month, year] = str.split(" ");
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        return new Date(parseInt(year), months.indexOf(month), parseInt(day));
    };

    const isDateInRange = (dateStr, dateRange) => {
        if (!dateRange || !Array.isArray(dateRange) || dateRange.length < 2) return true;

        const itemDate = parseDate(dateStr);
        const startDate = new Date(dateRange[0]);
        const endDate = new Date(dateRange[1]);

        return itemDate >= startDate && itemDate <= endDate;
    };

    const matchesSearch = (item, searchTerm) => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();
        return (
            item.id.toLowerCase().includes(searchLower) ||
            item.nama.toLowerCase().includes(searchLower) ||
            item.pembeli.toLowerCase().includes(searchLower)
        );
    };

    const matchesStatusFilter = (item, statusFilter) => {
        if (!statusFilter || statusFilter.length === 0) return true;
        return statusFilter.includes(item.status);
    };

    const matchesSubmissionStatusFilter = (item, submissionStatusFilter) => {
        if (!submissionStatusFilter || submissionStatusFilter.length === 0) return true;
        return submissionStatusFilter.includes(item.statusPengajuan);
    };

    const processedData = useMemo(() => {
        let filteredItems = [...data];

        if (filterConfig) {
            if (filterConfig.searchTerm) {
                filteredItems = filteredItems.filter(item =>
                    matchesSearch(item, filterConfig.searchTerm)
                );
            }

            if (filterConfig.dateRange) {
                filteredItems = filteredItems.filter(item =>
                    isDateInRange(item.waktu, filterConfig.dateRange)
                );
            }

            if (filterConfig.complainStatus && filterConfig.complainStatus.length > 0) {
                filteredItems = filteredItems.filter(item =>
                    matchesStatusFilter(item, filterConfig.complainStatus)
                );
            }

            if (filterConfig.submissionStatus && filterConfig.submissionStatus.length > 0) {
                filteredItems = filteredItems.filter(item =>
                    matchesSubmissionStatusFilter(item, filterConfig.submissionStatus)
                );
            }
        }

        if (sortConfig && sortConfig.key) {
            filteredItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (sortConfig.key === "waktu") {
                    const aDate = parseDate(aValue);
                    const bDate = parseDate(bValue);
                    return sortConfig.direction === "ascending" ? aDate - bDate : bDate - aDate;
                } else if (sortConfig.key === "status") {
                    if (sortConfig.direction === "ascending") {
                        return statusOrder.indexOf(aValue) - statusOrder.indexOf(bValue);
                    } else {
                        return statusOrder.indexOf(bValue) - statusOrder.indexOf(aValue);
                    }
                } else if (typeof aValue === "string" && typeof bValue === "string") {
                    if (aValue.toLowerCase() < bValue.toLowerCase()) {
                        return sortConfig.direction === "ascending" ? -1 : 1;
                    }
                    if (aValue.toLowerCase() > bValue.toLowerCase()) {
                        return sortConfig.direction === "ascending" ? 1 : -1;
                    }
                }
                return 0;
            });
        }

        return filteredItems;
    }, [data, sortConfig, filterConfig]);

    const totalPages = Math.ceil(processedData.length / itemsPerPage);
    const currentItems = processedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [filterConfig]);

    useEffect(() => {
        const allChecked = currentItems.length > 0 && currentItems.every((item) => checkedItems[item.id]);
        setSelectAll(allChecked);
    }, [checkedItems, currentItems]);

    const fetchData = async () => {
            try {
                const res = await getListComplaint({
                    type: "damaged",
                });
                const formattedData = res.map(item => ({
                    ...item,
                    transaction_code: item?.transaction?.transaction_code,
                    waktu: formatDate(item?.created_at),
                    nama: item?.transaction?.item_name,
                    pembeli: item?.buyer?.email,
                    noResi: item?.transaction?.shipment?.tracking_number || "-",
                    ekspedisi: item?.transaction?.shipment?.courier?.name || "-",
                    statusMap: mapStatusComplaint[item?.status] || item?.status,
                    asuransi: item?.transaction?.insurance_fee > 0,
                    statusPengajuan: "Belummm",
                }));
                setData(formattedData || []);
            } catch (error) {
                alert(error.message || "Terjadi kesalahan saat mengambil data komplain");
            }
        }

    const handleHeaderCheckboxChange = (checked) => {
        const newCheckedItems = {};
        currentItems.forEach((item) => {
            newCheckedItems[item.id] = checked;
        });
        setCheckedItems(newCheckedItems);
        setSelectAll(checked);
    };

    const handleCheckboxChange = (id, checked) => {
        const newCheckedItems = { ...checkedItems, [id]: checked };
        setCheckedItems(newCheckedItems);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSort = (key) => {
        if (sortConfig.key !== key) {
            setSortConfig({ key, direction: "ascending" });
        } else if (sortConfig.direction === "ascending") {
            setSortConfig({ key, direction: "descending" });
        } else if (sortConfig.direction === "descending") {
            setSortConfig({ key: null, direction: null });
        }
        setCurrentPage(1);
    };

    const handleStatusSort = () => {
        if (sortConfig.key !== "status") {
            setSortConfig({ key: "status", direction: "ascending" });
        } else if (sortConfig.direction === "ascending") {
            setSortConfig({ key: "status", direction: "descending" });
        } else if (sortConfig.direction === "descending") {
            setSortConfig({ key: null, direction: null });
        }
        setCurrentPage(1);
    };

    const handleCategoryFilter = (key) => {
        if (sortConfig && sortConfig.key === key) {
            setSortConfig({ key: null, direction: null });
        } else {
            setSortConfig({ key: null, direction: null });
        }
        setCurrentPage(1);
    };

    const getStatusClass = (status) => STATUS_COLORS[status] || "text-gray-500";

    const getPengajuanStatusClass = (status) => PENGAJUAN_STATUS_COLORS[status] || "text-gray-500";

    const getArrowIcon = (key, type = "sort") => {
        if (type === "sort" && sortConfig && sortConfig.key === key) {
            return (
                <ChevronDownIcon
                    className={`w-3 h-3 text-[#5c5c5c] transition-transform duration-200 ${sortConfig.direction === "ascending" ? "rotate-180" : ""}`}
                />
            );
        }
        if (type === "filter" && filterConfig && filterConfig.key === key) {
            return <ChevronDownIcon className="w-3 h-3 text-blue-500 rotate-180" />;
        }
        return <ChevronDownIcon className="w-3 h-3 text-[#5c5c5c]" />;
    };

    return (
        <div className="flex w-full justify-center p-4">
            <div className="w-full max-w-[1200px] overflow-x-auto">
                <div className="relative w-full flex flex-row items-center justify-start gap-6 text-left text-black font-sf-pro mb-4">
                    <div className="relative font-semibold text-lg sm:text-xl md:text-2xl lg:text-xl">
                        Jumlah informasi yang ditampilkan
                    </div>
                    <div className="rounded-full bg-blue-500 overflow-hidden flex flex-row items-center justify-center py-1 px-5 gap-1 text-base text-white font-bold min-w-[60px]">
                        <b className="relative leading-[22px]">{processedData.length}</b>
                    </div>
                </div>

                {loading ? (
                    <table className='border-collapse border border-[#c9c9c9] w-full animate-pulse'>
                        <thead>
                            <tr className='bg-[#f3f3f3] border-b border-[#c9c9c9]'>
                                <th className='w-[42px] h-[38px] p-0 border-r border-[#c9c9c9] min-w-[42px]'>
                                    <div className='bg-gray-200 h-4 w-[42px] rounded'></div>
                                </th>
                                <th className='px-2 text-sm text-[#5c5c5c] min-w-[120px]'>
                                    <div className='bg-gray-200 h-4 min-w-[120px] rounded'></div>
                                </th>
                                <th className='px-2 text-sm text-[#5c5c5c] min-w-[140px]'>
                                    <div className='bg-gray-200 h-4 min-w-[140px] rounded'></div>
                                </th>
                                <th className='px-2 text-sm text-[#5c5c5c] min-w-[180px]'>
                                    <div className='bg-gray-200 h-4 min-w-[180px] rounded'></div>
                                </th>
                                <th className='px-2 text-sm text-[#5c5c5c] min-w-[180px]'>
                                    <div className='bg-gray-200 h-4 min-w-[180px] rounded'></div>
                                </th>
                                <th className='px-2 text-sm text-[#5c5c5c] min-w-[140px]'>
                                    <div className='bg-gray-200 h-4 min-w-[140px] rounded'></div>
                                </th>
                                <th className='px-2 text-sm text-[#5c5c5c] min-w-[180px]'>
                                    <div className='bg-gray-200 h-4 min-w-[180px] rounded'></div>
                                </th>
                                <th className='px-2 text-sm text-[#5c5c5c] min-w-[160px]'>
                                    <div className='bg-gray-200 h-4 min-w-[160px] rounded'></div>
                                </th>
                                <th className='px-2 text-sm text-[#5c5c5c] min-w-[160px]'>
                                    <div className='bg-gray-200 h-4 min-w-[160px] rounded'></div>
                                </th>
                                <th className='px-2 text-sm text-[#5c5c5c] min-w-[80px]'>
                                    <div className='bg-gray-200 h-4 min-w-[80px] rounded'></div>
                                </th>
                                <th className='w-[52px] h-[38px] p-0 min-w-[52px]'>
                                    <div className='bg-gray-200 h-4 w-[52px] rounded'></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, index) => (
                                <tr key={index} className='h-[38px] border-b border-[#c9c9c9] bg-white'>
                                    <td className='w-[42px] p-0 border-r border-[#c9c9c9]'>
                                        <div className='bg-gray-200 h-4 w-[42px] rounded'></div>
                                    </td>
                                    <td className='px-2 text-sm text-[#5c5c5c]'>
                                        <div className='bg-gray-200 h-4 w-full rounded'></div>
                                    </td>
                                    <td className='px-2 text-sm text-[#5c5c5c]'>
                                        <div className='bg-gray-200 h-4 w-full rounded'></div>
                                    </td>
                                    <td className='px-2 text-sm text-[#5c5c5c]'>
                                        <div className='bg-gray-200 h-4 w-full rounded'></div>
                                    </td>
                                    <td className='px-2 text-sm text-[#5c5c5c]'>
                                        <div className='bg-gray-200 h-4 w-full rounded'></div>
                                    </td>
                                    <td className='px-2 text-sm text-[#5c5c5c]'>
                                        <div className='bg-gray-200 h-4 w-full rounded'></div>
                                    </td>
                                    <td className='px-2 text-sm text-[#5c5c5c]'>
                                        <div className='bg-gray-200 h-4 w-full rounded'></div>
                                    </td>
                                    <td className='px-2 text-sm text-[#5c5c5c]'>
                                        <div className='bg-gray-200 h-4 w-full rounded'></div>
                                    </td>
                                    <td className='px-2 text-sm text-[#5c5c5c]'>
                                        <div className='bg-gray-200 h-4 w-full rounded'></div>
                                    </td>
                                    <td className='px-2 text-sm text-[#5c5c5c] text-center'>
                                        <div className='bg-gray-200 h-4 w-full rounded'></div>
                                    </td>
                                    <td className='w-[52px] p-0'>
                                        <div className='bg-gray-200 h-4 w-[52px] rounded'></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <Table className="border-collapse border border-[#c9c9c9] w-full">
                        <TableHeader>
                            <TableRow className="bg-[#f3f3f3] border-b border-[#c9c9c9]">
                                <TableHead className="w-[42px] h-[38px] p-0 border-r border-[#c9c9c9] min-w-[42px]">
                                    <div className="flex h-[38px] items-center justify-center">
                                        <Checkbox
                                            className="h-4 w-4 rounded border border-solid border-[#5c5c5c] bg-white cursor-pointer"
                                            checked={selectAll}
                                            onCheckedChange={handleHeaderCheckboxChange}
                                        />
                                    </div>
                                </TableHead>
                                {columns.map((col) => (
                                    <TableHead
                                        key={col.key}
                                        className={`h-[38px] px-2 py-0 border-r border-[#c9c9c9] text-[#5c5c5c] text-sm min-w-[${col.minWidth}] ${col.key === 'status' || col.sortable ? "cursor-pointer" : ""}`}
                                        onClick={col.key === 'status' ? handleStatusSort : col.sortable ? () => handleSort(col.key) : undefined}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <span>{col.label}</span>
                                            {col.key === 'status' ? getArrowIcon('status', 'sort') : col.sortable ? getArrowIcon(col.key, 'sort') : null}
                                            {col.filterable && col.key !== 'status' ? getArrowIcon(col.key, 'filter') : null}
                                        </div>
                                    </TableHead>
                                ))}
                                <TableHead className="w-[52px] h-[38px] p-0 min-w-[52px]">
                                    <div className="flex h-[38px] items-center justify-center"></div>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentItems.map((item, index) => (
                                <TableRow
                                    key={item.id}
                                    className={`h-[38px] border-b border-[#c9c9c9] ${index % 2 === 0 ? "bg-white" : "bg-[#f3f3f3]"} hover:bg-[#e6f7ff]`}
                                >
                                    <TableCell className="w-[42px] p-0 border-r border-[#c9c9c9]">
                                        <div className="flex h-[38px] items-center justify-center">
                                            <Checkbox
                                                className="h-4 w-4 rounded border border-solid border-[#5c5c5c] bg-white cursor-pointer"
                                                checked={checkedItems[item.id] || false}
                                                onCheckedChange={(checked) => handleCheckboxChange(item.id, checked)}
                                            />
                                        </div>
                                    </TableCell>
                                    {columns.map((col) => (
                                        <TableCell
                                            key={col.key}
                                            className={`px-2 py-0 border-r border-[#c9c9c9] text-[0.8rem] sm:text-sm text-[#5c5c5c] ${col.key === "status" || col.key === "statusPengajuan" ? "text-sm" : ""} ${col.key === "asuransi" ? "text-center" : ""}`}
                                        >
                                            {col.key === "statusMap" ? (
                                                <span className={`font-semibold ${getStatusClass(item.statusMap)}`}>{item.statusMap}</span>
                                            ) : col.key === "statusPengajuan" ? (
                                                <span className={`font-semibold ${getPengajuanStatusClass(item.statusPengajuan)}`}>
                                                    {item.statusPengajuan || "Tanpa pengajuan"}
                                                </span>
                                            ) : col.key === "asuransi" ? (
                                                asuransiIcon(item.asuransi)
                                            ) : (
                                                <div
                                                    className={
                                                        col.key === "nama" || col.key === "pembeli"
                                                            ? "overflow-hidden whitespace-nowrap text-ellipsis max-w-[160px]"
                                                            : undefined
                                                    }
                                                    title={item[col.key]}
                                                >
                                                    {item[col.key]}
                                                </div>
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell className="w-[52px] p-0">
                                        <div className="flex h-[38px] items-center justify-center">
                                            <ArrowRightIcon className="w-4 h-4 text-[#5c5c5c] cursor-pointer" onClick={() => onRowDetail && onRowDetail(item)} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                <div className="flex justify-end items-center mt-4 space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || loading}
                        className="px-3 py-1 border border-[#c9c9c9] rounded text-sm text-[#5c5c5c] bg-white hover:bg-[#e6f7ff] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={loading}
                            className={`px-3 py-1 border border-[#c9c9c9] rounded text-sm ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-[#5c5c5c] hover:bg-[#e6f7ff]"} disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || loading}
                        className="px-3 py-1 border border-[#c9c9c9] rounded text-sm text-[#5c5c5c] bg-white hover:bg-[#e6f7ff] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTableBarangRusak; 