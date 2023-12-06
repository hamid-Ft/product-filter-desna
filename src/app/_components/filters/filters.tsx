import { Filter } from "@/types/product-filter.type";

type FiltersProps = {
  filters: Filter[];
};

const Filters: React.FC<FiltersProps> = ({ filters }) => {
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
                    name={option.OptionName}
                    id={option.OptionName}
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
