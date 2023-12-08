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
    <div className="flex flex-col justify-start items-center h-full">
      <h2 className="py-2 font-extrabold text-lg border-b-2 w-full border-black text-center">
        Filters
      </h2>
      <div className="flex flex-col h-full w-full text-center justify-start items-center">
        {filters.map((filter) => (
          <div
            key={filter.FilterID}
            className="flex flex-col h-full w-full text-center justify-start items-center">
            <p className="py-2 w-full font-bold border-y-2 border-black bg-slate-300">
              {filter.FilterName}
            </p>
            <div className="flex flex-col w-full h-full text-center justify-center items-center">
              {filter.Options.map((option) => (
                <label
                  key={option.OptionID}
                  className={`transition-colors duration-200 ease-in-out ${
                    selectedFilters.some(
                      (f) =>
                        f.filter === filter.FilterID &&
                        f.option === option.OptionID
                    )
                      ? "bg-yellow-300"
                      : ""
                  } my-1 p-1 border-2 border-black rounded-2xl w-2/3 font-semibold cursor-pointer flex flex-col justify-center`}>
                  <input
                    className="opacity-0 absolute"
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
    </div>
  );
};
export default Filters;
