import { useStore } from "@/stores/productsStore";
import { useUpdateUrl } from "@/hooks/navigationUtils";

const Categories: React.FC = () => {
  const { categories, selectedCategories, setSelectedCategories } = useStore();
  const updateUrl = useUpdateUrl();
  const handleCheckboxChange = (categoryId: number) => {
    let newCategories: number[] = [];
    if (selectedCategories.includes(categoryId)) {
      newCategories = selectedCategories.filter((id) => id !== categoryId);
    } else {
      newCategories = [...selectedCategories, categoryId];
    }
    updateUrl("category", newCategories, []);
    setSelectedCategories(newCategories);
  };
  return (
    <div className="flex flex-col h-full justify-evenly items-center">
      <h2 className="py-2 font-bold text-lg border-b-4 w-full border-black text-center">
        Categories
      </h2>
      <div className="flex flex-col h-full w-full text-center justify-center items-center">
        {categories.map((category) => (
          <div
            key={category.CategoryName}
            className={`transition-colors duration-200 ease-in-out ${
              selectedCategories.includes(category.CategoryID)
                ? "bg-yellow-300"
                : ""
            } py-1 my-1 border-2 border-black rounded-2xl w-2/3 font-semibold cursor-pointer`}
            onClick={() => handleCheckboxChange(category.CategoryID)}>
            {category.CategoryName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
