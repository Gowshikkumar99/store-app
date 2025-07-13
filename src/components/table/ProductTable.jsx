import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "./ProductTable.scss";
import { selectFilteredProducts } from "../../redux/selectors/productSelectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DialogueModal from "../modal/dialogueModal";
import { removeProduct } from "../../redux/slices/productSlice";
import { resetForm } from "../../redux/slices/formSlice";
import { showToast } from "../../redux/slices/toastSlice";

function ProductTable() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const dispatch = useDispatch();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  function handlModalClick() {
    dispatch(removeProduct({ id: parseInt(deleteItem.id) }));
    dispatch(resetForm());
    dispatch(
      showToast({ message: "Product deleted successfully!", variant: "danger" })
    );
    closeModal();
  }

  function handleModal(item) {
    openModal();
    setDeleteItem(item);
  }

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const products = useSelector(selectFilteredProducts);

  return (
    <>
      <Table className="product-table" hover responsive>
        <colgroup>
          <col style={{ width: "5%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "35%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead className="product-table__head">
          <tr>
            <th>S.no</th>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price($)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="product-table__body">
          {products?.map((product, index) => (
            <tr key={product.id} className="product-table__row">
              <td className="product-table__item-number">{index + 1}</td>
              <td className="product-table__item-image">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-table__image"
                  loading="lazy"
                />
              </td>
              <td className="product-table__item-title">{product.title}</td>
              <td className="product-table__item-category">
                {product.category}
              </td>
              <td className="product-table__item-price">
                {product.price.toFixed(2)}
              </td>
              <td className="product-table__item-action">
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    title="Edit"
                    onClick={() => handleEdit(product.id)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    title="Delete"
                    onClick={() => handleModal(product)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <DialogueModal
          show={showModal}
          handleClose={closeModal}
          handleConfirm={handlModalClick}
          deleteItem={deleteItem}
        />
      </Table>
      {products.length === 0 && (
        <div className="d-flex justify-content-center">No results Found</div>
      )}
    </>
  );
}
export default React.memo(ProductTable);
