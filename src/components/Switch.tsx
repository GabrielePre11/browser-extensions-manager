//================= SWITCH PROPS TYPE =================//
type SwitchProps = {
  id: number;
  isActive: boolean;
  toggleExtensionState: (id: number) => void;
};

//================= SWITCH COMPONENT =================//
export default function Switch({
  id,
  isActive,
  toggleExtensionState,
}: SwitchProps) {
  return (
    <button
      role="switch"
      onClick={() => toggleExtensionState(id)}
      aria-label="Active/Disable Extension"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
        isActive ? "bg-red-600 dark:bg-red-500/90" : "bg-neutral-800"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-neutral-100 transition-transform duration-300 ${
          isActive ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
