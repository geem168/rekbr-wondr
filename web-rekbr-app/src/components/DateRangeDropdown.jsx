// components/DateRangeDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { CalendarDays } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const DateRangeDropdown = ({ selectedRange, onRangeChange, placeholder = "Rentang Tanggal" }) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState({
    from: selectedRange?.[0],
    to: selectedRange?.[1],
  });

  useEffect(() => {
    if (
      selectedRange &&
      typeof selectedRange === "object" &&
      "from" in selectedRange &&
      "to" in selectedRange
    ) {
      // kalau selectedRange bentuknya { from, to }
      setRange(selectedRange);
    } else if (Array.isArray(selectedRange)) {
      // kalau selectedRange bentuknya [from, to]
      setRange({
        from: selectedRange[0],
        to: selectedRange[1],
      });
    } else {
      // fallback
      setRange({ from: null, to: null });
    }
  }, [selectedRange]);

  const ref = useRef();

  const toggleOpen = () => {
    if (!open) {
      if (Array.isArray(selectedRange)) {
        setRange({ from: selectedRange[0], to: selectedRange[1] });
      } else if (selectedRange?.from || selectedRange?.to) {
        setRange({
          from: selectedRange.from || null,
          to: selectedRange.to || null,
        });
      } else {
        setRange({ from: null, to: null });
      }
    }
    setOpen((prev) => !prev);
  };

  const handleSelect = (selected) => {
    setRange(selected);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayText = (() => {
    if (range?.from && range?.to) {
      return `${format(range.from, "dd/MM/yyyy")} - ${format(
        range.to,
        "dd/MM/yyyy"
      )}`;
    } else if (range?.from) {
      return `${format(range.from, "dd/MM/yyyy")} - ...`;
    } else {
      return placeholder;
    }
  })();

  return (
    <div className='relative w-full' ref={ref}>
      <button
        type='button'
        onClick={toggleOpen}
        className='w-full h-8 px-2 flex items-center gap-2 bg-white border border-dimgray rounded-lg text-left text-[13px] placeholder-dimgray'
      >
        <CalendarDays className='w-4 h-4 stroke-current' />
        <span className='truncate'>{displayText}</span>
      </button>

      {open && (
        <div className='absolute left-0 mt-2 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-3 min-w-[280px] max-w-[90vw] overflow-hidden'>
          <DayPicker
            mode='range'
            selected={range}
            onSelect={handleSelect}
            locale={id}
            numberOfMonths={1}
            showOutsideDays
            classNames={{
              months: "flex flex-col",
              caption:
                "flex justify-between px-4 mb-2 text-blue-700 font-medium",
              nav_button: "text-blue-600 hover:bg-blue-100 rounded p-1",
              day: "w-8 h-8 text-sm rounded-full hover:bg-blue-100",
              day_selected: "bg-blue-600 text-white",
              day_today: "border border-blue-600 text-blue-600",
              head_cell: "text-gray-500 text-xs font-medium uppercase",
            }}
          />

          {/* Tombol Terapkan */}
          <div className='mt-3 flex justify-end'>
            <button
              disabled={!range?.from || !range?.to}
              onClick={() => {
                if (!range?.from) return;
                const from = range.from;
                const to = range.to || from;
                onRangeChange([from, to]);
                setOpen(false);
              }}
              className='px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
            >
              Terapkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeDropdown;
