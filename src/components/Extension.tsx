//================= SWITCH COMPONENT, ExtensionProps TYPE =================//
import Switch from "./Switch";
import type { ExtensionProps } from "@/data";

//================= EXTENSION COMPONENT =================//
const Extension = ({
  id,
  logo,
  name,
  description,
  isActive,
  toggleExtensionState,
  removeExtension,
}: ExtensionProps) => {
  return (
    <li
      key={id}
      className="bg-neutral-0 dark:bg-neutral-700 p-5 rounded-xl border border-neutral-400"
    >
      <div className="flex items-center gap-3">
        {/*================= LOGO =================*/}
        <img src={logo} alt={name} />

        {/*================= NAME & DESCRIPTION =================*/}
        <div className="flex flex-col">
          <h2 className="text-lg text-neutral-950 dark:text-neutral-0 font-medium">
            {name}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>

      {/*================= BUTTONS =================*/}
      <div className="flex items-center justify-between mt-6">
        {/*================= REMOVE BUTTON =================*/}
        <button
          className="px-3 py-1.5 bg-neutral-600 text-white text-sm font-medium rounded-full transition-colors duration-200 hover:bg-neutral-600/80"
          aria-label="Remove extension"
          onClick={() => removeExtension(id)}
        >
          Remove
        </button>

        {/*================= SWITCH BUTTON =================*/}
        <Switch
          id={id}
          isActive={isActive}
          toggleExtensionState={toggleExtensionState}
        />
      </div>
    </li>
  );
};

export default Extension;
