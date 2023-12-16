import { useStore } from "@/stores/productsStore";
import { useUpdateUrl } from "@/hooks/navigationUtils";
import { Card, CardBody, CardHeader, Divider, Switch } from "@nextui-org/react";

const Filters: React.FC = () => {
  const { filters, selectedFilters, setSelectedFilters } = useStore();

  const updateUrl = useUpdateUrl();

  const handleSwitch = (filterId: number, optionId: number) => {
    let newFilters = [...selectedFilters];
    const existingFilterIndex = newFilters.findIndex(
      (f) => f.filter === filterId && f.option === optionId
    );

    if (existingFilterIndex !== -1) {
      newFilters.splice(existingFilterIndex, 1);
    } else {
      newFilters.push({ filter: filterId, option: optionId });
    }

    updateUrl(
      "filter",
      newFilters,
      filters.flatMap((f) => f.Options)
    );
    setSelectedFilters(newFilters);
  };
  return (
    <>
      <Card
        isBlurred
        className="border-none  h-full bg-background/60 dark:bg-default-100/50 max-w-[610px]">
        <CardHeader className="flex gap-3">
          <h2 className="py-2 font-extrabold text-lg w-full text-center">
            Filters
          </h2>
        </CardHeader>

        <CardBody className="flex flex-col gap-2 items-center justify-center">
          {filters.map((filter) => (
            <div
              key={filter.FilterID}
              className="flex flex-col h-full w-full text-center justify-start items-center">
              <p className="w-full font-bold">
                <Divider />
                {filter.FilterName}
                <Divider />
              </p>
              <div className="flex flex-col gap-2 w-full h-full text-center justify-center items-center">
                {filter.Options.map((option) => {
                  const isFilterSelected = selectedFilters.some(
                    (f) =>
                      f.filter === filter.FilterID &&
                      f.option === option.OptionID
                  );
                  return (
                    <Switch
                      isSelected={isFilterSelected}
                      key={option.OptionID}
                      thumbIcon={({ isSelected, className }) =>
                        isSelected ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`w-4 h-4 ${className}`}>
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path
                              fillRule="evenodd"
                              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`h-4 w-4 ${className}`}>
                            <path
                              fillRule="evenodd"
                              d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                              clipRule="evenodd"
                            />
                            <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                          </svg>
                        )
                      }
                      size="lg"
                      onClick={() =>
                        handleSwitch(filter.FilterID, option.OptionID)
                      }>
                      <p className="text-sm font-semibold">
                        {" "}
                        {option.OptionName}
                      </p>
                    </Switch>
                  );
                })}
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </>
  );
};
export default Filters;
