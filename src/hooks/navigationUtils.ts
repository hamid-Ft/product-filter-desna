import { Option } from "@/types/product-filter.type";
import { useRouter, usePathname } from "next/navigation";

export const useUpdateUrl = () => {
  const { replace } = useRouter();
  const pathname = usePathname();

  const updateUrl = (
    paramsKey: string,
    paramsValues:
      | string
      | number
      | (string | number)[]
      | { filter: number; option: number }[],
    filterOptions: Option[] // Add this parameter
  ) => {
    let paramsString: string;
    const urlParams = new URLSearchParams(window.location.search);

    if (Array.isArray(paramsValues)) {
      if (typeof paramsValues[0] === "object") {
        paramsValues = (
          paramsValues as { filter: number; option: number }[]
        ).map((f) => {
          return `${f.filter}-${f.option}`;
        });
      }

      // Remove all previous values for this key
      urlParams.delete(paramsKey);

      // Append each value separately
      paramsValues.forEach((value) => {
        urlParams.append(paramsKey, value.toString());
      });
    } else {
      paramsString = paramsValues.toString();
      urlParams.set(paramsKey, paramsString);
    }

    const newUrl = `${pathname}?${urlParams.toString()}`;

    replace(newUrl);
  };
  return updateUrl;
};
