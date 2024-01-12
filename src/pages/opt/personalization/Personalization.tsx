import SliderC from "../../../components/slider/SliderC";
import styles from "./personalization.module.css"

function Personalization() {
  return (
    <div>
      <div className="flex justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
        <span className="text-[22px] text-on-surface dark:bg-on-surface-dark">
          Personalization
        </span>
      </div>
      <div className="w-full flex flex-col gap-y-6 py-6">
        <div className="flex items-center gap-x-6">
          <span className="flex-[.1] text-lg mr-2 text-on-surface dark:text-on-surface-dark">Shadow Size</span>{" "}
          <SliderC value={1} max={3} min={1} />
        </div>
        <div className="flex items-center gap-x-6">
          <span className="flex-[.1] text-lg mr-2 text-on-surface dark:text-on-surface-dark">Text Size</span>{" "}
          <SliderC value={1} max={3} min={1} />
        </div>
        <div className="flex gap-x-6">
          <span className="flex-[.12] text-lg mr-2 text-on-surface dark:text-on-surface-dark">Theme</span>{" "}
          <div className={styles.systemGradiant}>
            <span>System</span>
          </div>
          <div className="flex justify-center items-center w-[160px] h-[90px] rounded-2xl text-on-surface-dark bg-surface-dark cursor-pointer">
            <span className="text-lg">Dark</span>
          </div>
          <div className="flex justify-center items-center w-[160px] h-[90px] rounded-2xl text-on-surface bg-surface border border-outline-variant cursor-pointer">
            <span className="text-lg">Light</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personalization;
