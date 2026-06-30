import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "./ui/checkbox";

const formatDateID = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const mapKYCStatusToUI = (status) => {
  const map = {
    verified: "Terverifikasi",
    unverified: "Belum Terverifikasi",
  };
  return map[status] || "Status Tidak Dikenal";
};

const UserTable = ({
  users,
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
      users.length > 0 && users.every((user) => checkedItems[user.id]);
    setSelectAll(allChecked);
  }, [checkedItems, users]);

  const handleHeaderCheckboxChange = (checked) => {
    const updated = {};
    users.forEach((user) => {
      updated[user.id] = checked;
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
            <b>{users.length}</b>
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
                <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c] whitespace-nowrap'>
                  ID User
                </TableHead>
                <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c] whitespace-nowrap'>
                  Tanggal Registrasi
                </TableHead>
                <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c] whitespace-nowrap'>
                  Email
                </TableHead>
                <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c] whitespace-nowrap'>
                  Status KYC
                </TableHead>
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
                      <TableCell className='w-[60px] border-r border-[#c9c9c9] p-0'>
                        <div className='bg-gray-200 h-4 w-5 mx-auto rounded animate-pulse'></div>
                      </TableCell>
                      {[...Array(4)].map((_, j) => (
                        <TableCell
                          key={j}
                          className='px-2 py-0 border-r border-[#c9c9c9]'
                        >
                          <div className='bg-gray-200 h-4 w-full rounded animate-pulse'></div>
                        </TableCell>
                      ))}
                      <TableCell className='text-center'>
                        <div className='bg-gray-200 h-4 w-4 mx-auto rounded animate-pulse'></div>
                      </TableCell>
                    </TableRow>
                  ))
                : users.map((user, index) => (
                    <TableRow
                      key={user.id}
                      className={`h-[38px] border-b border-[#c9c9c9] ${
                        index % 2 === 0 ? "bg-white" : "bg-[#f3f3f3]"
                      } hover:bg-[#e6f7ff]`}
                    >
                      <TableCell className='w-[60px] p-0 border-r border-[#c9c9c9]'>
                        <div className='flex h-[38px] items-center justify-center'>
                          <Checkbox
                            checked={checkedItems[user.id] || false}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(user.id, checked)
                            }
                            className='h-5 w-5 border border-[#5c5c5c] rounded'
                          />
                        </div>
                      </TableCell>
                      <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                        {user.id}
                      </TableCell>
                      <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                        {formatDateID(user.createdAt)}
                      </TableCell>
                      <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                        <div
                          className='overflow-hidden whitespace-nowrap text-ellipsis max-w-[250px]'
                          title={user.email}
                        >
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                        {mapKYCStatusToUI(user.kycStatus)}
                      </TableCell>
                      <TableCell className='text-center'>
                        <ArrowRightIcon
                          onClick={() => navigate(`/users/${user.id}`)}
                          className='w-4 h-4 text-[#5c5c5c] hover:text-blue-600 cursor-pointer'
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

export default UserTable;
