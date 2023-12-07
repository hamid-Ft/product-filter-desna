import { Category } from "@/types/product-filter.type";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface CategoriesProps {
  categories: Category[];
  selectedCategories: number[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
}

const Categories: React.FC<CategoriesProps> = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function handleUrl(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("category", term);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = Number(event.target.value);
    if (event.target.checked) {
      setSelectedCategories((prev) => {
        const newCategories = [...prev, categoryId];
        handleUrl(newCategories.join(","));
        return newCategories;
      });
    } else {
      setSelectedCategories((prev) => {
        const newCategories = prev.filter((id) => id !== categoryId);
        handleUrl(newCategories.join(","));
        return newCategories;
      });
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
