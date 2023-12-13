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
    if (Array.isArray(paramsValues)) {
      if (typeof paramsValues[0] === "object") {
        paramsString = (paramsValues as { filter: number; option: number }[])
          .map((f) => {
            // Find the option with the matching ID and return its name
            const option = filterOptions.find(
              (option) => option.OptionID === f.option
            );
            return option ? option.OptionName : "";
          })
          .join(",");
      } else {
        paramsString = paramsValues.join(",");
      }
    } else {
      paramsString = paramsValues.toString();
    }

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(paramsKey);
    if (paramsString.length > 0) {
      paramsString
        .split(",")
        .forEach((value) => urlParams.append(paramsKey, value));
    }

    const newUrl = `${pathname}?${urlParams.toString()}`;

    replace(newUrl);
  };
  return updateUrl;
};
