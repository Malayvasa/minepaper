import { useState } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import { SketchPicker } from 'react-color';
import PaintBucket from './PaintBucket.js';
import useSound from 'use-sound';
import LevelUp from '../sounds/levelup.mp3'; 

export default function PatternPreview({sketch, ingredients, sketchName, backgroundColor, onColorSelect}) {

  const presetColors = ["#fbf8cc","#fde4cf","#ffcfd2","#f1c0e8","#cfbaf0","#a3c4f3","#90dbf4","#8eecf5","#98f5e1","#b9fbc0"];

  const [displayPicker, setDisplayPicker] = useState(false);

  const [craft] = useSound(
    LevelUp,
    { volume: 0.75 }
  );

  const handleClick = () => {
    let newState = !displayPicker;
    setDisplayPicker(newState);
  };

  const handleClose = () => {
    setDisplayPicker(false);
  };

  const handleChange = (color) => {
    onColorSelect(color.hex);
  };

  return (
    <div className="flex flex-col gap-y-8">
          <div className="container w-max h-full flex flex-col ">
            <div className="minecraft mb-2">Pattern Preview</div>
            <div className='previewCanvas'>
              {sketch ? <ReactP5Wrapper
                sketch={sketch}
                sketchName={sketchName}
                icons={ingredients}
                backgroundColor={backgroundColor}
                preview={true}
                width={500}
                height={500}
              /> : <div className="w-64 h-64 minecraft">Loading Pattern</div>}
            </div>
            <div className='flex items-center w-full justify-between mt-4'>
              <div className='relative'>
              { displayPicker ? <div className=' absolute -top-[300px] z-20'>
          <div className=' fixed top-32 bottom-0 left-0 right-0' onClick={handleClose}/>
          <SketchPicker presetColors={presetColors} disableAlpha color={backgroundColor} onChange={handleChange} />
        </div> : null }

        <div onClick={handleClick}>
                <PaintBucket className="minecraft" backgroundColor={backgroundColor} />
        </div>

              </div>
              <div id='save' onClick={()=>{console.log("sound"); craft();}}>
              <button   className="minecraft m-1 eightbit-btn p-2 flex justify-center items-center">Save Pattern</button>
              </div>
              
            </div>
          </div>
    </div>
  )
}
