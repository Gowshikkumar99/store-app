import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setForm,
  submitForm,
  resetForm,
  updateForm,
} from "../../redux/slices/formSlice";
import {
  addProduct,
  removeProduct,
  updateProduct,
} from "../../redux/slices/productSlice";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ProductForm.scss";
import DialogueModal from "../modal/dialogueModal";
import useFormValidation from "../../hooks/useFormValidation";
import ToastMessage from "../toast/ToastMessage";
import { showToast } from "../../redux/slices/toastSlice";

export default function ProductForm() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);
  const { loading, error } = useSelector((state) => state.form);
  const products = useSelector((state) => state.products.items);
  const form = useSelector((state) => state.form);

  const [list, setList] = useState("Select Category");
  const [dropdown, setDropdown] = useState("isClose");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { errors, validateForm } = useFormValidation(hasSubmitted);
  const [originalProduct, setOriginalProduct] = useState(null);

  const dropdownRef = useRef();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/add") {
      dispatch(resetForm());
      setList("Select Category");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (id) {
      if (products.length === 0) {
        navigate("/products");
        return;
      }

      const selected = products.find((p) => p.id === parseInt(id));
      if (selected) {
        dispatch(setForm(selected));
        setList(selected.category);
        setOriginalProduct(selected);
      } else {
        navigate("/products");
      }
    }
  }, [id, products]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown("isClose");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setForm({ [name]: value }));
  };

  const isFormChanged = () => {
    if (!originalProduct) return true;
    const keys = ["title", "price", "category", "description", "image"];
    return keys.some((key) => form[key] !== originalProduct[key]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!validateForm()) return;

    if (!id) {
      const result = await dispatch(submitForm(form));
      if (submitForm.fulfilled.match(result)) {
        dispatch(addProduct(result.payload));
        dispatch(resetForm());
        setList("Select Category");

        dispatch(
          showToast({
            message: "Product added successfully!",
            variant: "success",
          })
        );
        setHasSubmitted(false);
      } else {
        dispatch(
          showToast({
            message: error || "Failed to add product.",
            variant: "danger",
          })
        );
      }
    } else {
      if (!isFormChanged()) {
        dispatch(
          showToast({
            message: "No changes made. Please update some fields.",
            variant: "warning",
          })
        );
        return;
      }

      const result = await dispatch(updateForm(form));
      if (updateForm.fulfilled.match(result)) {
        dispatch(updateProduct(result.payload));
        dispatch(resetForm());
        setList("Select Category");

        dispatch(
          showToast({
            message: "Product updated successfully!",
            variant: "success",
          })
        );
        setHasSubmitted(false);
      } else {
        dispatch(
          showToast({
            message: error || "Failed to update product.",
            variant: "danger",
          })
        );
      }
    }
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleDelete = () => {
    dispatch(removeProduct({ id: parseInt(id) }));
    dispatch(resetForm());
    setList("Select Category");
    dispatch(
      showToast({ message: "Product deleted successfully!", variant: "danger" })
    );
    setHasSubmitted(true);
    closeModal();
  };

  return (
    <div className="product-form">
      <Container>
        <div className="product-form__wrapper">
          <form onSubmit={handleSubmit} className="product-form__form">
            <div className="product-form__field">
              <label className="product-form__label">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="product-form__input"
              />
              <p className="product-form__error">
                {errors.title && (
                  <div className="text-danger small">{errors.title}</div>
                )}
              </p>
            </div>

            <div className="product-form__field">
              <label className="product-form__label">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="product-form__input"
              />
              <p className="product-form__error">
                {errors.price && (
                  <div className="text-danger small">{errors.price}</div>
                )}
              </p>
            </div>

            <div className="product-form__field" ref={dropdownRef}>
              <div className="product-form__label">Category</div>
              <div className="product-form__select">
                <input
                  className="product-form__dropdown-input"
                  name="category"
                  onClick={() =>
                    setDropdown((prev) =>
                      prev === "isOpen" ? "isClose" : "isOpen"
                    )
                  }
                  value={list}
                  readOnly
                />
                <p className="product-form__error">
                  {errors.category && (
                    <div className="text-danger small">{errors.category}</div>
                  )}
                </p>
                <ul
                  className="product-form__dropdown"
                  value={form.category}
                  style={{ display: dropdown === "isOpen" ? "block" : "none" }}
                >
                  <li
                    onClick={() => {
                      setList("Select Category");
                      setDropdown("isClose");
                    }}
                    className="product-form__dropdown-item"
                  >
                    Select Category
                  </li>
                  {categories.map((item) => (
                    <li
                      key={item}
                      onClick={() => {
                        setList(item);
                        dispatch(setForm({ category: item }));
                        setDropdown("isClose");
                      }}
                      className="product-form__dropdown-item"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="product-form__field">
              <label className="product-form__label">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="product-form__textarea"
              />
              <p className="product-form__error">
                {errors.description && (
                  <div className="text-danger small">{errors.description}</div>
                )}
              </p>
            </div>

            <div className="product-form__field">
              <label className="product-form__label">Image URL</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                className="product-form__input"
              />
              <p className="product-form__error">
                {errors.image && (
                  <div className="text-danger small">{errors.image}</div>
                )}
              </p>
            </div>

            <div className="product-form__field">
              {
                <div className="product-form__image-preview  d-flex d-lg-none">
                  {form.image ? (
                    <img src={form.image} alt="Preview" />
                  ) : (
                    <div className="product-form__image-message">
                      No Preview
                    </div>
                  )}
                </div>
              }
            </div>

            <div className="product-form__button">
              <input
                type="submit"
                value={id ? "Update" : "Add Product"}
                className={`product-form__submit-btn btn btn-dark btn-sm ${
                  !id ? "w-100" : ""
                }`}
              />

              {id && (
                <input
                  type="button"
                  value="Delete"
                  className={`product-form__submit-btn btn btn-danger  btn-sm`}
                  onClick={openModal}
                />
              )}
            </div>
          </form>

          {
            <div className={`product-form__image-preview d-none d-lg-flex`}>
              {form.image ? (
                <img src={form.image} alt="Preview" />
              ) : (
                <div className="product-form__image-message">No Preview</div>
              )}
            </div>
          }
        </div>
      </Container>

      <DialogueModal
        show={showModal}
        handleClose={closeModal}
        handleConfirm={handleDelete}
      />
    </div>
  );
}
