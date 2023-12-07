import { Filter } from "@/types/product-filter.type";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type FiltersProps = {
  filters: Filter[];
  selectedFilters: { filter: number; option: number }[];
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{ filter: number; option: number }[]>
  >;
};

const Filters: React.FC<FiltersProps> = ({
  filters,
  selectedFilters,
  setSelectedFilters,
}) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function handleUrl(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("filter", term);
    } else {
      params.delete("filter");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterId = Number(event.target.name.split("-")[1]);
    const optionId = Number(event.target.value);
    if (event.target.checked) {
      setSelectedFilters((prev) => {
        const newFilters = [...prev, { filter: filterId, option: optionId }];
        handleUrl(newFilters.map((f) => `${f.filter}-${f.option}`).join(","));
        return newFilters;
      });
    } else {
      setSelectedFilters((prev) => {
        const newFilters = prev.filter(
          (f) => f.filter !== filterId || f.option !== optionId
        );
        handleUrl(newFilters.map((f) => `${f.filter}-${f.option}`).join(","));
        return newFilters;
      });
    }
  };
  return (
    <>
      <h2>Filters</h2>
      <div>
        {filters.map((filter) => (
          <div key={filter.FilterID}>
            <p>{filter.FilterName}</p>
            <div className="flex flex-col">
              {filter.Options.map((option) => (
                <label key={option.OptionID} className="">
                  <input
                    type="checkbox"
                    name={`filter-${filter.FilterID}`}
                    id={option.OptionName}
                    value={option.OptionID}
                    onChange={handleCheckboxChange}
                    checked={selectedFilters.some(
                      (f) =>
                        f.filter === filter.FilterID &&
                        f.option === option.OptionID
                    )}
                  />
                  {option.OptionName}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Filters;
