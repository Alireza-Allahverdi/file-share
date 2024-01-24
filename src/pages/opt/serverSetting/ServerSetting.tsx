import { useState } from "react";
import ButtonC from "../../../components/button/ButtonC";
import Input from "../../../components/input/Input";
import { GiCheckedShield } from "react-icons/gi";
import { MdOutlineSave } from "react-icons/md";

function ServerSetting() {

    const [editMode, setEditMode] = useState<boolean>(false)

    return (
        <div>
            <div className="flex justify-between py-4 border-b border-b-on-surface dark:border-b-on-surface-dark">
                <span className="text-[1.4em] text-on-surface dark:text-on-surface-dark">
                    Server Settings
                </span>
            </div>
            <div className="flex flex-col gap-y-8 py-6">
                <div className="flex flex-col">
                    <div className="flex items-center gap-x-4 mb-2 text-md">
                        <span className="w-[10%] text-on-surface dark:text-on-surface-dark">
                            Storage Usage
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="w-1/2 text-xs">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Natus libero impedit vitae dolor fugit, ea
                            facilis maxime quibusdam cum eius? Sed itaque beatae
                            iusto id cupiditate unde molestias voluptates
                            placeat.
                        </span>
                        <span className="text-xs">(56GB / 100GB is Used)</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-x-4 mb-2 text-md">
                      <div className="flex items-center gap-x-4 w-1/3 mr-6">
                        <span className="w-2/6 text-on-surface dark:text-on-surface-dark">
                            User Storage
                        </span>
                        <Input
                        className="w-4/6"
                            label="User Storage"
                            type="text"
                            value={"50 GB"}
                            disabled
                        />
                      </div>
                        <ButtonC 
                        title={!editMode ? "Update" : "Save"}
                        type="contained"
                        icon={!editMode ? <GiCheckedShield size={18} /> : <MdOutlineSave size={20} />}
                        onCLick={() => setEditMode(!editMode)}
                        />
            {
                editMode ?
                <ButtonC 
                title="Cancel"
                type="outlined"
                onCLick={() => setEditMode(false)}
                />
                : null
            }
                    </div>
                    <div className="flex justify-between">
                        <span className="w-1/2 text-xs">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Natus libero impedit vitae dolor fugit, ea
                            facilis maxime quibusdam cum eius? Sed itaque beatae
                            iusto id cupiditate unde molestias voluptates
                            placeat.
                        </span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-x-4 mb-2 text-md">
                      <div className="flex gap-x-4 w-1/3 mr-6">
                        <span className="w-2/6 text-on-surface dark:text-on-surface-dark">
                            Registration
                        </span>
                        <span className="w-4/6 text-on-surface-variant dark:text-on-surface-variant-dark">Open to everyone</span>
                      </div>
                        <ButtonC 
                        title="Change Status"
                        type="contained"
                        icon={<GiCheckedShield size={18} />}
                        />
                    </div>
                    <div className="flex justify-between">
                        <span className="w-1/2 text-xs">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Natus libero impedit vitae dolor fugit, ea
                            facilis maxime quibusdam cum eius? Sed itaque beatae
                            iusto id cupiditate unde molestias voluptates
                            placeat.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServerSetting;
