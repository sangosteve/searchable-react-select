import React, { useState, useEffect, useRef } from "react";
import { FiXCircle, FiChevronUp, FiChevronDown } from "react-icons/fi";
import "./select.css";
const Select = () => {
  const inputRef = useRef();
  const [val, setVal] = useState("");
  const [tempval, setTempVal] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hovered, setHovered] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setVal(e.target.value);
    console.log(e.target.value);
  };

  function handleInputClick() {
    setOpen(!open);
    if (val) setVal("");
  }
  function close(e) {
    setOpen(e && e.target === inputRef.current);
    setSearchQuery("");
  }

  const searchFilter = (options) => {
    return options.filter(
      (option) => option.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    );
  };

  const displayValue = () => {
    if (searchQuery.length > 0) return searchQuery;
    // if (value) return value;
    return "";
  };
  const options = ["Zambia", "Namibia", "Zimbabwe"];
  useEffect(() => {
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  return (
    <div
      className={hovered ? "select-control hovered" : "select-control"}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder={tempval ? tempval : "-Select Option"}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={open ? displayValue() : tempval}
        className={isFocus ? "input isFocus" : "input"}
        onFocus={() => setIsFocus(true)}
        onClick={handleInputClick}
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
              setVal(option);
              setTempVal(option);
              setOpen(false);
              setSearchQuery("");
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
