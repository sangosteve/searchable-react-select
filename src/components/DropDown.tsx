import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import styled from "styled-components";
import { FiXCircle, FiChevronUp, FiChevronDown } from "react-icons/fi";
type SelectProps = {
  name: string;
  label: string;
  id: string;
  placeholder?: string;
  options: {
    [key: string]: string;
  }[];
  onSelectChange: (selection: any) => void;
};
const StyledSelect = styled.div<SelectProps>`
  * {
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
  }
  max-width: 250px;
  position: relative;
  cursor: pointer;
  > input {
    width: 100%;
    padding: 5px;
    position: relative;
  }
  span.select-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
  }
  > ul.select-options {
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: none;
    position: absolute;
    top: 30px;
    z-index: 1000;

    &.show {
      display: block;
    }
    > li {
      padding: 5px 8px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      &:hover {
        cursor: pointer;
        background-color: whitesmoke;
      }
    }
  }
`;

const Select = ({
  id,
  name,
  label,
  placeholder,
  options,
  onSelectChange,
}: SelectProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const [tempval, setTempVal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hovered, setHovered] = useState(false);
  const searchFilter = (options: { [key: string]: string }[]) => {
    return options.filter(
      (option) =>
        option[label].toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    );
  };
  const displayValue = () => {
    if (searchQuery.length > 0) return searchQuery;
    // if (value) return value;
    return "";
  };
  function close(e: any) {
    setOpen(e && e.target === inputRef.current);
    setSearchQuery("");
  }
  function handleInputClick() {
    setOpen(!open);
    if (val) setVal("");
  }
  const handleChange = (e: any) => {
    e.preventDefault();
    setVal(e.target.value);
    console.log(e.target.value);
  };
  useEffect(() => {
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  return (
    <StyledSelect
      id={id}
      onSelectChange={onSelectChange}
      name={name}
      label={label}
      options={options}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        ref={inputRef}
        name={name}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={tempval ? tempval : placeholder}
        value={open ? displayValue() : tempval}
        onClick={handleInputClick}
        autoComplete="off"
        autoSave="false"
      />
      <span className="select-icon">
        {val ? (
          hovered ? (
            <FiXCircle
              size={14}
              onClick={() => {
                setVal("");
                setTempVal("");
                setSearchQuery("");
              }}
            />
          ) : (
            <FiChevronUp size={14} />
          )
        ) : (
          <FiChevronDown onClick={handleChange} size={14} />
        )}
      </span>
      <ul className={open ? "select-options show" : "select-options"}>
        {searchFilter(options).map((option, index) => (
          <li
            key={index}
            onClick={() => {
              onSelectChange(option);
              setVal(option[label]);
              setTempVal(option[label]);
              setOpen(false);
              setSearchQuery("");
            }}
          >
            {option[label]}
          </li>
        ))}
      </ul>
    </StyledSelect>
  );
};

export default Select;
