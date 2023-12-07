// import { RootObject } from "@/types/product-filter.type";
// import fs from "fs";
// import path from "path";

import { RootObject } from "@/types/product-filter.type";

// const getData = async (): Promise<RootObject> => {
//   const filePath = path.resolve("./public/product-filiter-dummy.json");
//   const data = fs.readFileSync(filePath, "utf8");
//   return JSON.parse(data);
// };
// async function fetchData() {
//   return await getData();
// }
// async function data() {
//   const data = await fetchData();

//   const {
//     Products: ProductsData,
//     Categories: CategoriesData,
//     Filters: FlitersData,
//   } = data.Data;

//   return { ProductsData, CategoriesData, FlitersData };
// }

// export default data;
export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET() {
  const res = await fetch("/product-filiter-dummy.json");
  const data: RootObject = await res.json();

  return data;
}
