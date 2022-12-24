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
            name:'iPhone 12 Pro Max',
            width: 1284,
            height: 2778,
        },
        {
            name:'iPhone 12 Pro',
            width: 1170,
            height: 2532,
        },
        {
            name:'iPhone 12',
            width: 1170,
            height: 2532,
        },
        {
            name:'iPhone 12 Mini',
            width: 1080,
            height: 2340,
        },
        {
            name:'iPhone 11 Pro Max',
            width: 1242,
            height: 2688,
        },
        {
            name:'iPhone 11 Pro',
            width: 1125,
            height: 2436,
        },
        {
            name:'iPhone 11',
            width: 1125,
            height: 2436,
        },
        {
            name:'iPhone SE 2020',
            width: 750,
            height: 1334,
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
            name:'A0',
            width: 1189,
            height: 841,
        },
        {
            name:'A1',
            width: 841,
            height: 594,
        },
        {
            name:'A2',
            width: 594,
            height: 420,
        },
        {
            name:'A3',
            width: 420,
            height: 297,
        },
        {
            name:'A4',
            width: 297,
            height: 210,
        },
        {
            name:'A5',
            width: 210,
            height: 148,
        },
        {
            name:'A6',
            width: 148,
            height: 105,
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
