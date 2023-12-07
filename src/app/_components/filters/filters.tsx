import { Filter } from "@/types/product-filter.type";

type FiltersProps = {
  filters: Filter[];
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{ filter: number; option: number }[]>
  >;
};

const Filters: React.FC<FiltersProps> = ({ filters, setSelectedFilters }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterId = Number(event.target.name.split("-")[1]);
    const optionId = Number(event.target.value);
    if (event.target.checked) {
      setSelectedFilters((prev) => [
        ...prev,
        { filter: filterId, option: optionId },
      ]);
    } else {
      setSelectedFilters((prev) =>
        prev.filter((f) => f.filter !== filterId || f.option !== optionId)
      );
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
