import React from 'react';
import { Search } from 'lucide-react';
import AdvancedSearch from './AdvancedSearch';
import DateRangeDropdown from './DateRangeDropdown';
import ButtonFilter from './ButtonFilter';
import ButtonMultiDropdown from './ButtonMultiDropdown';

const BarangHilangFilters = ({
    searchTerm,
    onSearchChange,
    selectedDateRange,
    onDateRangeChange,
    selectedComplainStatus,
    onComplainStatusChange,
    selectedSubmissionStatus,
    onSubmissionStatusChange,
    onReset,
    loading = false
}) => {
    const complainStatusOptions = [
        { value: 'Dalam Investigasi', label: 'Dalam Investigasi' },
        { value: 'Dibatalkan', label: 'Dibatalkan' },
        { value: 'Transaksi Selesai', label: 'Transaksi Selesai' },
        { value: 'Komplain Ditolak', label: 'Komplain Ditolak' }
    ];

    const submissionStatusOptions = [
        { value: 'submitted', label: 'Submitted' },
        { value: 'processing', label: 'Processing' },
        { value: 'completed', label: 'Completed' }
    ];

    return (
        <div className='flex items-center justify-between flex-wrap gap-4 mb-4'>
            {/* Search Input */}
            <div className='max-w-[300px] w-full md:w-auto'>
                <AdvancedSearch
                    Icon={Search}
                    placeholder='Cari ID Komplain, nama barang, atau email pembeli...'
                    value={searchTerm}
                    onChange={onSearchChange}
                    disabled={loading}
                    loading={loading}
                    onClear={() => onSearchChange('')}
                />
            </div>

            {/* Filter Controls */}
            <div className='flex items-center gap-3 flex-wrap'>
                {/* Date Range Filter */}
                <div className='w-[240px]'>
                    <DateRangeDropdown
                        selectedRange={selectedDateRange}
                        onRangeChange={onDateRangeChange}
                        placeholder="Pilih rentang tanggal"
                    />
                </div>

                {/* Complain Status Filter */}
                <div className='w-[200px]'>
                    <ButtonMultiDropdown
                        options={complainStatusOptions}
                        selectedValues={selectedComplainStatus}
                        onSelectionChange={onComplainStatusChange}
                        placeholder="Status Komplain"
                        isDisabled={loading}
                    />
                </div>

                {/* Submission Status Filter - Disabled */}
                <div className='w-[200px]'>
                    <ButtonMultiDropdown
                        options={submissionStatusOptions}
                        selectedValues={selectedSubmissionStatus}
                        onSelectionChange={onSubmissionStatusChange}
                        placeholder="Status Pengajuan"
                        isDisabled={true}
                    />
                </div>

                {/* Reset Button */}
                <button
                    onClick={onReset}
                    disabled={loading}
                    className='px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default BarangHilangFilters; 