import { useStore } from "@/stores/productsStore";
import { useUpdateUrl } from "@/hooks/navigationUtils";

const Filters: React.FC = () => {
  const { filters, selectedFilters, setSelectedFilters } = useStore();
  const updateUrl = useUpdateUrl();

  const handleCheckboxChange = (filterId: number, optionId: number) => {
    let newFilters = [];
    if (
      selectedFilters.some(
        (f) => f.filter === filterId && f.option === optionId
      )
    ) {
      newFilters = selectedFilters.filter(
        (f) => f.filter !== filterId || f.option !== optionId
      );
    } else {
      newFilters = [...selectedFilters, { filter: filterId, option: optionId }];
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
                <div
                  key={option.OptionID}
                  className={`transition-colors duration-200 ease-in-out ${
                    selectedFilters.some(
                      (f) =>
                        f.filter === filter.FilterID &&
                        f.option === option.OptionID
                    )
                      ? "bg-yellow-300"
                      : ""
                  } my-1 p-1 border-2 border-black rounded-2xl w-2/3 font-semibold cursor-pointer flex flex-col justify-center`}
                  onClick={() =>
                    handleCheckboxChange(filter.FilterID, option.OptionID)
                  }>
                  {option.OptionName}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Filters;
