import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function useFormValidation(hasSubmitted) {
  const form = useSelector((state) => state.form);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!form.title || form.title.trim() === "") {
      newErrors.title = "Title is required.";
    }

    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (!form.category || form.category === "Select Category") {
      newErrors.category = "Category is required.";
    }

    if (!form.description || form.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    if (!form.image || !/^https?:\/\/.*\.(jpeg|jpg|png|gif)$/i.test(form.image)) {
      newErrors.image = "Enter a valid image URL (must end in .jpg, .png, etc).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (hasSubmitted) {
      validateForm();
    } else {
      setErrors({});
    }
  }, [form, hasSubmitted]);

  return { errors, validateForm };
}
