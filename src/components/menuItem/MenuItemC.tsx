import React from "react";

interface iProps {
  label: string;
  icon?: JSX.Element;
  selected: boolean;
}

const MenuItemC: React.FC<iProps> = ({ label, icon, selected }) => {
  return (
    <div
      className={`w-full flex items-center gap-x-3 text-on-secondary-container dark:text-on-secondary-container-dark rounded-[100px] cursor-pointer p-4 transition-colors hover:bg-[#edc7a0] dark:hover:bg-[#644f3b] ${
        selected
          ? "bg-[#e2c5ab] dark:bg-[#695644]"
          : "bg-secondary-container dark:bg-secondary-container-dark"
      }`}
    >
      {icon}
      <span className="font-semibold text-[0.875em]">{label}</span>
    </div>
  );
};

export default MenuItemC;
