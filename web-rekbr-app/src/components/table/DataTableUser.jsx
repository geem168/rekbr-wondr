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
import { ChevronDownIcon, ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/user.service";

const DataTableUser = ({ searchQuery, selectedStatus, selectedDate }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({
    key: "registrationDate",
    direction: "descending",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getAllUsers({ page: 1, limit: 100 });
        const mappedUsers = res.data.map((u) => ({
          id: u.id,
          name: u.email.split("@")[0],
          email: u.email,
          registrationDate: new Date(u.createdAt),
          kycStatus: u.kycStatus === "verified" ? "Terverifikasi" : "Belum",
        }));
        setUsers(mappedUsers);
      } catch (err) {
        console.error("Gagal fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const processedData = useMemo(() => {
    let sortableItems = [...users];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      sortableItems = sortableItems.filter(
        (user) =>
          user.id.toLowerCase().includes(q) ||
          user.name.toLowerCase().includes(q) ||
          user.email.toLowerCase().includes(q)
      );
    }

    if (selectedStatus) {
      sortableItems = sortableItems.filter(
        (user) => user.kycStatus === selectedStatus
      );
    }

    if (selectedDate) {
      const target = selectedDate.toDateString();
      sortableItems = sortableItems.filter(
        (user) => new Date(user.registrationDate).toDateString() === target
      );
    }

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.key === "registrationDate") {
          return sortConfig.direction === "ascending"
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
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

    return sortableItems;
  }, [users, sortConfig, searchQuery, selectedStatus, selectedDate]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const currentItems = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const allChecked =
      currentItems.length > 0 &&
      currentItems.every((user) => checkedItems[user.id]);
    setSelectAll(allChecked);
  }, [checkedItems, currentItems]);

  const handleHeaderCheckboxChange = (checked) => {
    const newCheckedItems = {};
    currentItems.forEach((user) => {
      newCheckedItems[user.id] = checked;
    });
    setCheckedItems(newCheckedItems);
    setSelectAll(checked);
  };

  const handleCheckboxChange = (userId, checked) => {
    const newCheckedItems = { ...checkedItems, [userId]: checked };
    setCheckedItems(newCheckedItems);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key) {
      direction =
        sortConfig.direction === "ascending" ? "descending" : "ascending";
    } else {
      if (key === "registrationDate") direction = "descending";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const getArrowIcon = (key) => {
    if (sortConfig && sortConfig.key === key) {
      return (
        <ChevronDownIcon
          className={`w-3 h-3 text-[#5c5c5c] transition-transform duration-200 ${
            sortConfig.direction === "ascending" ? "rotate-180" : ""
          }`}
        />
      );
    }
    return null;
  };

  const navigate = useNavigate();
  const handleViewDetail = (id) => {
    navigate(`/user/${id}`);
  };

  const formatDateTimeForDisplay = (dateObj) => {
    if (!dateObj) return "";
    const formattedDate = dateObj.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = dateObj.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate}, ${formattedTime}`;
  };

  if (loading) {
    return (
      <div className='flex w-full justify-center p-4'>
        <div className='w-full max-w-[1120px] text-center text-gray-500'>
          Memuat data pengguna...
        </div>
      </div>
    );
  }

  return (
    <div className='flex w-full justify-center p-4'>
      <div className='w-full max-w-[1120px] overflow-x-auto'>
        <div className='relative w-full flex flex-row items-center justify-start gap-6 text-left text-black font-sf-pro mb-4'>
          <div className='relative font-semibold text-lg sm:text-xl md:text-2xl lg:text-xl'>
            Jumlah informasi yang ditampilkan
          </div>
          <div className='rounded-full bg-blue-500 overflow-hidden flex flex-row items-center justify-center py-1 px-5 gap-1 text-base text-white font-bold min-w-[60px]'>
            <b className='relative leading-[22px]'>{users.length}</b>
          </div>
        </div>
        <Table className='border-collapse border border-[#c9c9c9] w-full'>
          <TableHeader>
            <TableRow className='bg-[#f3f3f3] border-b border-[#c9c9c9]'>
              <TableHead className='w-[42px] h-[38px] p-0 border-r border-[#c9c9c9] min-w-[42px]'>
                <div className='flex h-[38px] items-center justify-center'>
                  <Checkbox
                    className='h-4 w-4 rounded border border-solid border-[#5c5c5c] bg-white cursor-pointer'
                    checked={selectAll}
                    onCheckedChange={handleHeaderCheckboxChange}
                  />
                </div>
              </TableHead>
              <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c] min-w-[120px]'>
                ID User
              </TableHead>
              <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c] min-w-[150px]'>
                Nama
              </TableHead>
              <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c] min-w-[250px]'>
                Email
              </TableHead>
              <TableHead
                onClick={() => handleSort("registrationDate")}
                className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c] min-w-[180px] cursor-pointer'
              >
                Tanggal Registrasi {getArrowIcon("registrationDate")}
              </TableHead>
              <TableHead className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c] min-w-[140px]'>
                Status KYC
              </TableHead>
              <TableHead className='w-[52px] h-[38px] p-0 min-w-[52px]' />
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((user, index) => (
              <TableRow
                key={user.id}
                className={`h-[38px] border-b border-[#c9c9c9] ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f3f3f3]"
                } hover:bg-[#e6f7ff]`}
              >
                <TableCell className='w-[42px] p-0 border-r border-[#c9c9c9]'>
                  <div className='flex h-[38px] items-center justify-center'>
                    <Checkbox
                      className='h-4 w-4 border border-[#5c5c5c] bg-white'
                      checked={checkedItems[user.id] || false}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(user.id, checked)
                      }
                    />
                  </div>
                </TableCell>
                <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                  {user.id}
                </TableCell>
                <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                  {user.name}
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
                  {formatDateTimeForDisplay(user.registrationDate)}
                </TableCell>
                <TableCell className='px-2 py-0 border-r border-[#c9c9c9] text-sm text-[#5c5c5c]'>
                  {user.kycStatus}
                </TableCell>
                <TableCell className='w-[52px] p-0'>
                  <div className='flex h-[38px] items-center justify-center'>
                    <ArrowRightIcon
                      className='w-4 h-4 text-[#5c5c5c] cursor-pointer hover:text-blue-600 transition'
                      onClick={() => handleViewDetail(user.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='flex justify-end items-center mt-4 space-x-2'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-3 py-1 border border-[#c9c9c9] rounded text-sm text-[#5c5c5c] bg-white hover:bg-[#e6f7ff] disabled:opacity-50'
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
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
            onClick={() => handlePageChange(currentPage + 1)}
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

export default DataTableUser;
