//================= HOOKS, TYPES, Extension COMPONENT, ICONS =================//
import { useEffect, useState } from "react";
import { data } from "../data";
import type { DataType } from "../data";
import type { Filter } from "../data";
import Extension from "./Extension";

//================= BROWSER COMPONENT =================//
const Browser = () => {
  //================= extensions useState =================//
  /*
  - This state stores the list of extensions.
  - If data is already saved in localStorage, it loads that.
  - Otherwise, it falls back to the default static data.
  */
  const [extensions, setExtensions] = useState(() => {
    const existendExtensions = localStorage.getItem("extensions");
    return existendExtensions ? JSON.parse(existendExtensions) : data;
  });

  //================= activeCategory useState =================//
  /*
  - This state handles which category is currently selected ("All", "Active", or "Inactive").
  - It follows the structure of the <Filter> type and by default the value is "All".
  */
  const [activeCategory, setActiveCategory] = useState<Filter>("All");

  //================= CATEGORIES =================//
  /*
  - These are the available filter categories the user can select from.
  */
  const categories: Filter[] = ["All", "Active", "Inactive"];

  /*
  - Filters the list of extensions based on the selected category.
  - If "All" is selected (true), it returns the full list.
  */
  const filteredCategories = extensions.filter((extension: DataType) => {
    if (activeCategory === "All") return true; // mostra tutto
    if (activeCategory === "Active") return extension.isActive === true;
    if (activeCategory === "Inactive") return extension.isActive === false;
  });

  //================= toggleExtensionState FUNCTION =================//
  /*
  - Toggles the active/inactive state of a specific extension (thanks to the ID).
  - It finds the extension by ID and switches its isActive value.
  */
  const toggleExtensionState = (id: number) => {
    setExtensions((prev: DataType[]) =>
      prev.map((item: DataType) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  //================= REMOVE EXTENSION =================//
  /*
  - Removes an extension from the list based on its ID.
  - It filters out the one with the matching ID.
  */
  const removeExtension = (id: number) => {
    setExtensions((prev: DataType[]) => prev.filter((item) => item.id !== id));
  };

  //================= SAVE TO LOCAL STORAGE =================//
  /*
  - Every time the list of extensions changes, it's saved to localStorage.
  */
  useEffect(() => {
    localStorage.setItem("extensions", JSON.stringify(extensions));
  }, [extensions]);

  return (
    <section>
      <div className="container px-4 mx-auto max-w-5xl">
        {/*================= Extensiions Title and Filters ================= */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3">
          <h3 className="text-neutral-950 dark:text-neutral-0 text-3xl font-medium">
            Extensions List
          </h3>

          {/*================= Category Filters ================= */}

          <ul className="flex items-center gap-3">
            {categories.map((category, key) => (
              <li key={key}>
                <button
                  className={`px-4 py-1.5 font-medium rounded-full text-neutral-950 dark:text-white  transition-colors duration-200 hover:bg-red-600 dark:hover:bg-red-400 ring ring-neutral-400 ${
                    activeCategory === category
                      ? "bg-red-600 ring-0 dark:bg-red-400 text-white dark:text-black"
                      : "bg-neutral-0 dark:bg-neutral-600"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/*================= Extensions List/Data ================= */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-3 py-8">
          {filteredCategories.map(
            ({ id, logo, name, description, isActive }: DataType) => (
              <Extension
                key={id}
                id={id}
                logo={logo}
                name={name}
                description={description}
                isActive={isActive}
                removeExtension={removeExtension}
                toggleExtensionState={toggleExtensionState}
              />
            )
          )}
        </ul>
      </div>
    </section>
  );
};

export default Browser;
