import React from 'react';
import Bucket from './Bucket';
import { SketchPicker } from 'react-color';
import { useState } from 'react';

export default function ColorPicker({ backgroundColor, onColorSelect }) {
  const presetColors = [
    '#fbf8cc',
    '#fde4cf',
    '#ffcfd2',
    '#f1c0e8',
    '#cfbaf0',
    '#a3c4f3',
    '#90dbf4',
    '#8eecf5',
    '#98f5e1',
    '#b9fbc0',
  ];

  const [displayPicker, setDisplayPicker] = useState(false);

  const handleClick = () => {
    let newState = !displayPicker;
    setDisplayPicker(newState);
  };

  const handleClose = () => {
    setDisplayPicker(false);
  };

  const handleColorChange = (color) => {
    onColorSelect(color.hex);
  };

  return (
    <div className='relative'>
      {displayPicker ? (
        <div className=" absolute -top-[300px] z-20">
          <div
            className=" fixed top-32 bottom-0 left-0 right-0"
            onClick={handleClose}
          />
          <SketchPicker
            presetColors={presetColors}
            disableAlpha
            color={backgroundColor}
            onChange={handleColorChange}
          />
          
        </div>
      ) : null}

      <div
        onClick={handleClick}
        className="eightbit-btn p-2 flex flex-row items-center"
      >
        <div>
          <Bucket backgroundColor={backgroundColor} />
        </div>

        {/* <div className={`mine`}>{backgroundColor}</div> */}
      </div>
    </div>
  );
}
