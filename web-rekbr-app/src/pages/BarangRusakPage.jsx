import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTableBarangRusak from "../components/table/DataTableBarangRusak";
import ComplainFilters from "../components/ComplainFilters";
import Breadcrumb from "../components/BreadCrumb";
import { useDebounce } from "use-debounce";

const BarangRusakPage = () => {
    const navigate = useNavigate();

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const [selectedComplainStatus, setSelectedComplainStatus] = useState([]);
    const [selectedSubmissionStatus, setSelectedSubmissionStatus] = useState([]);
    const [loading, setLoading] = useState(false);

    // Debounced search for real-time filtering
    const [debouncedSearch] = useDebounce(searchTerm, 500);

    // Filtered data state
    const [filteredData, setFilteredData] = useState(null);

    const handleDetail = (row) => {
        // Map table status to step status
        const mapTableStatusToStepStatus = (tableStatus, statusPengajuan) => {
            const statusMap = {
                'Persetujuan Seller': 'menungguSeller',
                'Seller Setuju': 'sellerSetuju',
                'Seller Tolak': 'sellerTolak',
                'Persetujuan Admin': 'menungguAdmin',
                'Admin Setuju': 'adminSetuju',
                'Admin Tolak': 'adminTolak',
                'Pengembalian Barang': statusPengajuan === 'Ditolak' ? 'adminTolak' :
                    statusPengajuan === 'Ditinjau' ? 'buyerAjukanKonfirmasi' :
                        statusPengajuan === 'Menunggu Seller' ? 'teruskanKonfirmasiBuyer' :
                            statusPengajuan === 'Teruskan Konfirmasi' ? 'teruskanKonfirmasiBuyer' :
                                'dalamPengirimanBalik',
                'Pengambilan Barang': statusPengajuan === 'Ditinjau' ? 'buyerAjukanKonfirmasi' :
                    statusPengajuan === 'Ditolak' ? 'adminTolak' :
                        statusPengajuan === 'Menunggu Seller' ? 'buyerAjukanKonfirmasi' :
                            statusPengajuan === 'Teruskan Konfirmasi' ? 'teruskanKonfirmasiBuyer' :
                                'dalamPengirimanBalik',
                'Transaksi Selesai': 'transaksiSelesai',
                'Komplain Dibatalkan': 'komplainDibatalkan',
                'Dibatalkan': 'komplainDibatalkan'
            };
            return statusMap[tableStatus] || 'menungguSeller';
        };

        const stepStatus = row.stepStatus || mapTableStatusToStepStatus(row.status, row.statusPengajuan);

        navigate(`/barang-rusak/${row.id}`, {
            state: {
                data: row,
                stepStatus: stepStatus
            }
        });
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const handleDateRangeChange = (range) => {
        setSelectedDateRange(range);
    };

    const handleComplainStatusChange = (values) => {
        setSelectedComplainStatus(values);
    };

    const handleSubmissionStatusChange = (values) => {
        setSelectedSubmissionStatus(values);
    };

    // Real-time filter application with debounce
    useEffect(() => {
        const applyFilters = () => {
            setLoading(true);

            // Simulate API call delay
            setTimeout(() => {
                const filterConfig = {
                    searchTerm: debouncedSearch,
                    dateRange: selectedDateRange,
                    complainStatus: selectedComplainStatus,
                    submissionStatus: selectedSubmissionStatus
                };

                // console.log("Applying filters in real-time:", filterConfig);
                setFilteredData(filterConfig);
                setLoading(false);
            }, 300);
        };

        applyFilters();
    }, [debouncedSearch, selectedDateRange, selectedComplainStatus, selectedSubmissionStatus]);

    const handleReset = () => {
        setSearchTerm("");
        setSelectedDateRange(null);
        setSelectedComplainStatus([]);
        setSelectedSubmissionStatus([]);
        setFilteredData(null);
    };

    return (
        <div className="p-6">
            <Breadcrumb />
            <h1 className="text-2xl font-bold mb-6">Daftar Komplain Barang Rusak</h1>

            {/* Filter Bar */}
            <ComplainFilters
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                selectedDateRange={selectedDateRange}
                onDateRangeChange={handleDateRangeChange}
                selectedComplainStatus={selectedComplainStatus}
                onComplainStatusChange={handleComplainStatusChange}
                selectedSubmissionStatus={selectedSubmissionStatus}
                onSubmissionStatusChange={handleSubmissionStatusChange}
                onReset={handleReset}
                loading={loading}
            />

            <DataTableBarangRusak
                onRowDetail={handleDetail}
                filterConfig={filteredData}
                loading={loading}
            />
        </div>
    );
};

export default BarangRusakPage; 