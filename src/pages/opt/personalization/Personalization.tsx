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
          <span className="text-lg mr-2">Shadow Size</span>{" "}
        </div>
        <div className="flex items-center gap-x-6">
          <span className="text-lg mr-2">Text Size</span>{" "}
        </div>
        <div className="flex items-center gap-x-6">
          <span className="text-lg mr-2">Theme</span>{" "}
        </div>
      </div>
    </div>
  );
}

export default Personalization;
