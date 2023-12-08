import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const useUpdateUrl = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateUrl = (
    paramsKey: string,
    paramsValues:
      | string
      | number
      | (string | number)[]
      | { filter: number; option: number }[]
  ) => {
    const params = new URLSearchParams(searchParams);
    let paramsString: string;
    if (Array.isArray(paramsValues)) {
      if (typeof paramsValues[0] === "object") {
        paramsString = (paramsValues as { filter: number; option: number }[])
          .map((f) => `${f.filter}-${f.option}`)
          .join(",");
      } else {
        paramsString = paramsValues.join(",");
      }
    } else {
      paramsString = paramsValues.toString();
    }

    if (paramsString) {
      params.set(paramsKey, paramsString);
    } else {
      params.delete(paramsKey);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return updateUrl;
};
