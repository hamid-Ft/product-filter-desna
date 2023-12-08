import { useStore } from "@/stores/productsStore";
import { useUpdateUrl } from "@/hooks/navigationUtils";

const Filters: React.FC = () => {
  const { filters, selectedFilters, setSelectedFilters } = useStore();
  const updateUrl = useUpdateUrl();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterId = Number(event.target.name.split("-")[1]);
    const optionId = Number(event.target.value);
    let newFilters = [];
    if (event.target.checked) {
      newFilters = [...selectedFilters, { filter: filterId, option: optionId }];
    } else {
      newFilters = selectedFilters.filter(
        (f) => f.filter !== filterId || f.option !== optionId
      );
    }
    updateUrl("filter", newFilters);
    setSelectedFilters(newFilters);
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
