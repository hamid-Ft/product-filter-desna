"use client";
import Categories from "./_components/categories/categories";
import Products from "./_components/products/products";
import Filters from "./_components/filters/filters";
import React, { useEffect, useState } from "react";
import { Category, Filter, Product } from "@/types/product-filter.type";
import { GET } from "./api/route";
export default function Home() {
  const [ProductsData, setProductsData] = useState<Product[]>([]);
  const [CategoriesData, setCategoriesData] = useState<Category[]>([]);
  const [FlitersData, setFlitersData] = useState<Filter[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    { filter: number; option: number }[]
  >([]);

  useEffect(() => {
    GET().then(({ Data: { Products, Categories, Filters } }) => {
      setProductsData(Products);
      setCategoriesData(Categories);
      setFlitersData(Filters);
    });
  }, []);
  const filteredByCategory =
    selectedCategories.length > 0
      ? ProductsData.filter((product) =>
          selectedCategories.includes(product.CategoryID)
        )
      : ProductsData;

  const filteredByFilters =
    selectedFilters.length > 0
      ? filteredByCategory.filter((product) =>
          product.Filters.some((f) =>
            selectedFilters.find(
              (sf) => sf.filter === f.Filter && sf.option === f.Option
            )
          )
        )
      : filteredByCategory;

  return (
    <>
      <div className="grid grid-cols-[1fr_3fr] grid-rows-[1fr_3fr] gap-4">
        <div className="categories bg-red-400">
          <Categories
            categories={CategoriesData}
            setSelectedCategories={setSelectedCategories}
          />
          <p className="text-red-500">{selectedCategories}</p>
        </div>
        <div
          className="product bg-blue-500
        ">
          <Products products={filteredByFilters} />
        </div>
        <div className="filters bg-green-500">
          <Filters
            filters={FlitersData}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
      </div>
    </>
  );
}
