import { RootObject } from "@/types/product-filter.type";

export async function getData() {
  const res = await fetch("http://localhost:9000/Data");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: RootObject = await res.json();
  return data;
}
