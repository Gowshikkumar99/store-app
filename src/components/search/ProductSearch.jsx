import React, { useState, useRef } from "react";
import "./ProductSearch.scss";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/slices/productSlice";

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.products);
  const [inputValue, setInputValue] = useState(searchTerm);
  const timeoutRef = useRef(null);
  function handleInput(e) {
    const value = e.target.value;
    setInputValue(value);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      dispatch(setSearchTerm(value));
    }, 500);
  }
  return (
    <div className="product-search">
      <i className="bi bi-search product-search__icon"></i>
      <input
        type="text"
        placeholder="Search keyword"
        value={inputValue}
        onChange={handleInput}
      />
    </div>
  );
}
