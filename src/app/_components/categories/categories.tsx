import { Category } from "@/types/product-filter.type";

interface CategoriesProps {
  categories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
}

const Categories: React.FC<CategoriesProps> = ({
  categories,
  setSelectedCategories,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = Number(event.target.value);
    if (event.target.checked) {
      setSelectedCategories((prev) => [...prev, categoryId]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
    }
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
            />
            {category.CategoryName}
          </label>
        ))}
      </div>
    </>
  );
};

export default Categories;
