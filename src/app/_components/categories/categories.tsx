import { Category } from "@/types/product-filter.type";

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
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
            />
            {category.CategoryName}
          </label>
        ))}
      </div>
    </>
  );
};
export default Categories;
