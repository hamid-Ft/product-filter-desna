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
          product.Filters.some((f) =>
            selectedFilters.find(
              (sf) => sf.filter === f.Filter && sf.option === f.Option
            )
          )
        )
      : filteredByCategory;

  return (
    <>
      <h1 className="text-3xl font-extrabold">Products</h1>
      <div className="flex-1 flex justify-center items-center max-w-md gap-10 ">
        {filteredProducts.map((product) => (
          <div key={product.ProductName} className="container ">
            <h3 className="text-xl">{product.ProductName}</h3>
            <Image
              src={product.Image}
              alt={`product-${product.ProductName} thumbnail`}
              width={200}
              height={200}
              style={{ objectFit: "contain", aspectRatio: "1/1" }}
            />
            <p>{product.Price}</p>
            <p>{product.Stock ? "Stock" : "Out of Stock"}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Products;
