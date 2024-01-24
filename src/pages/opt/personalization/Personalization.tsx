import { useEffect, useState } from "react";
import SliderC from "../../../components/slider/SliderC";
import styles from "./personalization.module.css";

function Personalization() {
  const root = getComputedStyle(document.documentElement);

  const [seelctedFont, setSelectedFont] = useState<number>(3);

  const onSliderChange = (value: number) => {
    setSelectedFont(value);
    switch (value) {
      case 1:
        document.documentElement.style.setProperty("--base-font-size", "12px");
        break;
      case 2:
        document.documentElement.style.setProperty("--base-font-size", "14px");
        break;
      case 3:
        document.documentElement.style.setProperty("--base-font-size", "16px");
        break;
      case 4:
        document.documentElement.style.setProperty("--base-font-size", "18px");
        break;
      case 5:
        document.documentElement.style.setProperty("--base-font-size", "20px");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="flex justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
        <span className="text-[1.4em] text-on-surface dark:text-on-surface-dark">
          Personalization
        </span>
      </div>
      <div className="w-full flex flex-col gap-y-6 py-6">
        <div className="w-1/2 flex items-center gap-x-6">
          <span className="w-1/5 text-[1.125em] mr-2 text-on-surface dark:text-on-surface-dark">
            Text Size
          </span>{" "}
          <div className="w-4/5 flex items-center gap-x-4">
            <span className="text-[16px]">very small</span>
            <SliderC
              value={seelctedFont}
              max={5}
              min={1}
              handleChange={onSliderChange}
            />
            <span className="text-[16px]">very large</span>
          </div>
        </div>
        <div className="flex w-1/2 gap-x-6">
          <span className="w-1/5 text-[1.125em] mr-2 text-on-surface dark:text-on-surface-dark">
            Theme
          </span>{" "}
          <div
            className={styles.systemGradiant}
            onClick={() => {
              if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                document.documentElement.classList.add("dark");
                localStorage.theme = "dark";
              } else {
                document.documentElement.classList.remove("dark");
                localStorage.theme = "light";
              }
            }}
          >
            <span>System</span>
          </div>
          <div
            className="flex justify-center items-center w-[160px] h-[90px] rounded-2xl text-on-surface-dark bg-surface-dark cursor-pointer"
            onClick={() => {
              localStorage.theme = "dark";
              if (
                localStorage.theme === "dark" ||
                (!("theme" in localStorage) &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches)
              ) {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            }}
          >
            <span className="text-lg">Dark</span>
          </div>
          <div
            className="flex justify-center items-center w-[160px] h-[90px] rounded-2xl text-on-surface bg-surface border border-outline-variant cursor-pointer"
            onClick={() => {
              localStorage.theme = "light";
              if (
                localStorage.theme === "dark" ||
                (!("theme" in localStorage) &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches)
              ) {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            }}
          >
            <span className="text-lg">Light</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personalization;
