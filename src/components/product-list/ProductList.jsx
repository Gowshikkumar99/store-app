import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner, Container } from "react-bootstrap";
import ProductTable from "../table/ProductTable";
import ProductSearch from "../search/ProductSearch";
import ProductFilter from "../filter/ProductFilter";
import ToolBar from "../toolbar/ToolBar";

export default function ProductList() {
  return (
    <Container className="py-4">
      <ToolBar>
        <ProductFilter />
        <ProductSearch />
      </ToolBar>
      <ProductTable />
    </Container>
  );
}
