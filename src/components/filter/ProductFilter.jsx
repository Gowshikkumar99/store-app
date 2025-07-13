import React, { useState, useEffect, useRef } from "react";
import "./ProductFilter.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../../redux/slices/productSlice";

export default function ProductFilter() {
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector(
    (state) => state.products
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  function handleSelect(category) {
    dispatch(setSelectedCategory(category));
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="product-filter" ref={dropdownRef}>
      <div className="product-filter__input" onClick={() => setIsOpen(!isOpen)}>
        {selectedCategory || "All"}
        <i className="bi bi-funnel ms-auto"></i>
      </div>

      {isOpen && (
        <ul className="product-filter__list">
          {["All", ...categories]?.map((item) => (
            <li
              key={item}
              className="product-filter__item"
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
