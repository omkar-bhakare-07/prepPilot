'use client'
import React, { useState, useRef, useEffect } from 'react';

export function Select({ children, onValueChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleSelect = (value) => {
    setSelected(value);
    onValueChange?.(value);
    setOpen(false);
  };

  return (
    <SelectContext.Provider value={{ open, selected, toggleOpen, handleSelect }}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
}

const SelectContext = React.createContext();

export function SelectTrigger({ children }) {
  const { toggleOpen } = React.useContext(SelectContext);
  return (
    <button
      onClick={toggleOpen}
      type="button"
      className="w-full border px-3 py-2 rounded bg-white text-left cursor-pointer shadow-sm"
    >
      {children}
    </button>
  );
}

export function SelectValue() {
  const { selected } = React.useContext(SelectContext);
  return <span>{selected || 'Select an option'}</span>;
}

export function SelectContent({ children }) {
  const { open } = React.useContext(SelectContext);
  if (!open) return null;

  return (
    <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-md">
      {children}
    </div>
  );
}

export function SelectItem({ value, children }) {
  const { handleSelect } = React.useContext(SelectContext);
  return (
    <div
      onClick={() => handleSelect(value)}
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </div>
  );
}
