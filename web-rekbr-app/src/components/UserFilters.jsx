// components/UserFilters.jsx
import React from "react";
import { Search } from "lucide-react";
import AdvancedSearch from "../components/AdvancedSearch";
import ButtonDropdown from "../components/ButtonDropdown";
import DateRangeDropdown from "../components/DateRangeDropdown";

const UserFilters = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedDateRange,
  onDateChange,
  onResetFilters,
  loading = false
}) => {
  return (
    <div className='flex items-center justify-between flex-wrap gap-4 mb-4'>
      {/* Search */}
      <div className='max-w-[300px] w-full md:w-auto'>
        <AdvancedSearch
          Icon={Search}
          placeholder='Cari Email'
          value={searchQuery}
          onChange={onSearchChange}
          disabled={loading}
          loading={loading}
          onClear={() => onSearchChange('')}
        />
      </div>

      {/* Filter */}
      <div className='flex items-center gap-3 flex-wrap'>
        {/* Dropdown Status */}
        <div className='w-[200px]'>
          <ButtonDropdown
            placeholder='Status Pengguna'
            options={[
              { label: "Terverifikasi", value: "verified" },
              { label: "Belum Terverifikasi", value: "unverified" },
            ]}
            value={selectedStatus}
            onChange={onStatusChange}
          />
        </div>

        {/* Date Range Dropdown */}
        <div className='w-[240px]'>
          <DateRangeDropdown
            selectedRange={selectedDateRange}
            onRangeChange={onDateChange}
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={onResetFilters}
          disabled={loading}
          className='px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default UserFilters;
