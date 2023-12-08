"use client";
import Categories from "./_components/categories/categories";
import Products from "./_components/products/products";
import Filters from "./_components/filters/filters";
import React, { useEffect } from "react";
import { GET } from "../api/route";
import { useStore } from "@/stores/productsStore";

export default function Home() {
  const {
    setProducts,
    setCategories,
    setFilters,
    setSelectedFilters,
    setSelectedCategories,
  } = useStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    const filterParam = params.get("filter");

    if (categoryParam) {
      const categories = categoryParam.split(",").map(Number);
      setSelectedCategories(categories);
    }

    if (filterParam) {
      const filters = filterParam.split(",").map((filter) => {
        const [filterId, optionId] = filter.split("-").map(Number);
        return { filter: filterId, option: optionId };
      });
      setSelectedFilters(filters);
    }

    GET().then(({ Data: { Products, Categories, Filters } }) => {
      setProducts(Products);
      setCategories(Categories);
      setFilters(Filters);
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-[1fr_3fr] grid-rows-[1fr_3fr] gap-4">
        <div className="categories bg-red-400">
          <Categories />
        </div>
        <div
          className="product bg-blue-500
        ">
          <Products />
        </div>
        <div className="filters bg-green-500">
          <Filters />
        </div>
      </div>
    </>
  );
}
