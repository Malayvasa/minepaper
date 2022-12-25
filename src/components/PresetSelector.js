import React from 'react';
import { useState } from 'react';

export default function PresetSelector({onPresetSizeChange}) {

    const presetSize = [
        {
            name: 'Select Preset',
            width: 1080,
            height: 1080,
        },
        {
            name:'iPhone Pro Max',
            width: 1284,
            height: 2778,
        },
        {
            name:'iPhone Pro',
            width: 1170,
            height: 2532,
        },
        {
            name:'iPhone',
            width: 1170,
            height: 2532,
        },
        {
            name:'iPhone Mini',
            width: 1080,
            height: 2340,
        },
        {
            name:'Macbook Pro 16"',
            width: 3072,
            height: 1920,
        },
        {
            name:'Macbook Pro 13"',
            width: 2560,
            height: 1600,
        },
        {
            name:'Macbook Air 13"',
            width: 2560,
            height: 1600,
        },
        {
            name:'iPad Pro 12.9"',
            width: 2048,
            height: 2732,
        },
        {
            name:'iPad Pro 11"',
            width: 1668,
            height: 2388,
        },
        {
            name:'iPad Air 10.9"',
            width: 1668,
            height: 2388,
        },
        {
            name:'iPad Mini 7.9"',
            width: 1536,
            height: 2048,
        },
        {
            name:'A3',
            width: 1754,
            height: 2480,
        },
        {
            name:'A4',
            width: 1240,
            height: 1754,
        },
        {
            name: 'A5',
            width: 874,
            height: 1240,
        },
        {
            name: 'A6',
            width: 620,
            height: 874,
        },
    ];


    const [displayPresetList,setDisplayPresetList] = useState(false);
    const [selectedPreset,setSelectedPreset] = useState(presetSize[0]);

    const handleClick = () => {
      let newState = !displayPresetList;
      setDisplayPresetList(newState);
    };
  
    const handleClose = () => {
      setDisplayPresetList(false);
    };

    const handleSelect = (preset) => {
    onPresetSizeChange(preset);
    }

  return (
    <div className="flex flex-col justify-between">
      <div className="relative">
        {displayPresetList ? (
          <div className=" absolute left-[15px] -top-[300px] z-40">
           
            <div className="w-56 h-72 z-50 bg-[#c6c6c6] border-4 shadow-lg border-[#222] overflow-x-hidden overflow-y-scroll">
                
                {presetSize.map((preset) => (
                    <div onClick={()=>{
                        handleClose();
                        handleSelect(preset);
                        setSelectedPreset(preset);
                    }} className="cursor-pointer mine w-64 input bg-transparent outline-none p-2">{preset.name}</div>
                ))}

            </div>
          </div>
        ) : null}

        <div
          onClick={() => {
            handleClick();
          }}
          className="minecraft cursor-pointer w-64 input bg-transparent outline-none px-2 h-[35px]"
        >
          {selectedPreset.name}
        </div>
      </div>
    </div>
  );
}
