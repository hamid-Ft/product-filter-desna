import { Product } from "@/types/product-filter.type";
import Image from "next/image";

type ProductsProps = {
  products: Product[];
};

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <>
      <h1 className="text-3xl font-extrabold">Products</h1>
      <div className="flex-1 flex justify-center items-center max-w-md gap-10 ">
        {products.map((product) => (
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
