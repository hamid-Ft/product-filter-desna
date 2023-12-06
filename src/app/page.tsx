import { RootObject } from "@/types/product-filter.type";
import Categories from "./_components/categories/categories";
import Products from "./_components/products/products";
import Filters from "./_components/filters/filters";

import fs from "fs";
import path from "path";

const getData = async (): Promise<RootObject> => {
  const filePath = path.resolve("./public/product-filiter-dummy.json");
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};
// this async call used in client side and req it like http
// const getData = async (): Promise<RootObject> => {
//   const res = await fetch("/product-filiter-dummy.json", {
//     next: {
//       revalidate: 60,
//     },
//   });
//   return res.json();
// };

export default async function Home() {
  const data = await getData();
  const {
    Products: ProductsData,
    Categories: CategoriesData,
    Filters: FlitersData,
  } = data.Data;

  return (
    <>
      <div className="grid grid-cols-[1fr_3fr] grid-rows-[1fr_3fr] gap-4">
        <div className="categories bg-red-400">
          <Categories categories={CategoriesData} />
        </div>
        <div
          className="product bg-blue-500
        ">
          <Products products={ProductsData} />
        </div>
        <div className="filters bg-green-500">
          <Filters filters={FlitersData} />
        </div>
      </div>
    </>
  );
}
