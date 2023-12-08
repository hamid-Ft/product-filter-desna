import { RootObject } from "@/types/product-filter.type";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET() {
  const res = await fetch("/product-filiter-dummy.json");
  const data: RootObject = await res.json();

  return data;
}
