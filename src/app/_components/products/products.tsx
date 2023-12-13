import { useStore } from "@/stores/productsStore";
import Image from "next/image";

const Products: React.FC = () => {
  const { products, selectedCategories, selectedFilters } = useStore();

  const filteredByCategory =
    selectedCategories.length > 0
      ? products.filter((product) =>
          selectedCategories.includes(product.CategoryID)
        )
      : products;

  const filteredProducts =
    selectedFilters.length > 0
      ? filteredByCategory.filter((product) =>
          selectedFilters.some((sf) =>
            product.Filters.some(
              (f) => sf.filter === f.Filter && sf.option === f.Option
            )
          )
        )
      : filteredByCategory;

  return (
    <div className="flex flex-col h-full w-full justify-start">
      <h1 className="text-3xl font-extrabold border-b-4 border-black py-2  w-full text-center ">
        Products
      </h1>
      <div className="flex mt-2 justify-start items-center">
        {filteredProducts.map((product) => (
          <div
            key={product.ProductName}
            className="flex flex-col items-center h-full justify-start ml-1 border-2 border-black  rounded-xl bg-slate-200">
            <h3 className="text-lg font-bold w-full border-b-2 mb-1 border-black text-center">
              {product.ProductName}
            </h3>
            <Image
              src={product.Image}
              alt={`product-${product.ProductName} thumbnail`}
              width={200}
              height={200}
              style={{ objectFit: "contain", aspectRatio: "1/1" }}
            />
            <p className="font-bold">{product.Price}$</p>
            <p className="font-semibold">
              {product.Stock ? "Stock" : "Out of Stock"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;
