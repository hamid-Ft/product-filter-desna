"use client";
import Categories from "./_components/categories/categories";
import Products from "./_components/products/products";
import Filters from "./_components/filters/filters";
import React, { useEffect } from "react";
import { GET } from "../api/route";
import { useStore } from "@/stores/productsStore";
import { usePathname } from "next/navigation";

export default function Home() {
  const {
    setProducts,
    setCategories,
    setFilters,
    setSelectedFilters,
    setSelectedCategories,
  } = useStore();
  const pathname = usePathname();

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
  }, [
    pathname,
    setCategories,
    setFilters,
    setProducts,
    setSelectedCategories,
    setSelectedFilters,
  ]);

  return (
    <>
      <div className="grid grid-cols-[1fr_3fr] grid-rows-[1fr_3fr] gap-2 m-2 h-screen max-h-[96vh]  ">
        <div className="categories bg-red-400 border-4 border-black rounded-2xl">
          <Categories />
        </div>
        <div
          className="product bg-blue-500 border-4 border-black rounded-2xl row-span-2
        ">
          <Products />
        </div>
        <div className="filters bg-green-500 border-4 border-black rounded-2xl">
          <Filters />
        </div>
      </div>
    </>
  );
}
