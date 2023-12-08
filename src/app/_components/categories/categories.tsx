import { useStore } from "@/stores/productsStore";
import { useUpdateUrl } from "@/hooks/navigationUtils";

const Categories: React.FC = () => {
  const { categories, selectedCategories, setSelectedCategories } = useStore();
  const updateUrl = useUpdateUrl();
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = Number(event.target.value);
    let newCategories = [];
    if (event.target.checked) {
      newCategories = [...selectedCategories, categoryId];
    } else {
      newCategories = selectedCategories.filter((id) => id !== categoryId);
    }
    updateUrl("category", newCategories);
    setSelectedCategories(newCategories);
  };
  return (
    <>
      <h2>Categories</h2>
      <div className="flex flex-col">
        {categories.map((category) => (
          <label key={category.CategoryName} className="">
            <input
              type="checkbox"
              name={category.CategoryName}
              id={category.CategoryName}
              value={category.CategoryID}
              onChange={handleCheckboxChange}
              checked={selectedCategories.includes(category.CategoryID)}
            />
            {category.CategoryName}
          </label>
        ))}
      </div>
    </>
  );
};

export default Categories;
