import React from 'react';
import useSound from 'use-sound';
import Click from '../sounds/click.mp3';

export default function SketchSelector({ onChange }) {

  const [click] = useSound(Click, { volume: 0.45 });

  const handleSketchSelect = (Sketch) => {
    onChange(Sketch);
  };

  return (
    <div className=" h-min">
      <div className="minecraft mb-2">Pattern Type</div>
      <div className="flex flex-col flex-wrap gap-y-4 overflow-y-scroll">
        <div
          className="m-1 eightbit-btn p-2 flex flex-row px-2  justify-left items-center"
          onClick={() => {
            click();
            handleSketchSelect(1);
          }}
        >
          <img alt='trash' className="w-8 h-8 mr-4" src={require('../symbols/ring.png')} />
          <div className="minecraft">Ring</div>
        </div>
        <div
          className=" m-1 w-32 eightbit-btn p-2 flex px-2  justify-left items-center"
          onClick={() => {
            click();
            handleSketchSelect(2);
          }}
        >
          <img alt='trash' className="w-8 h-8 mr-4" src={require('../symbols/grid.png')} />
          <div className="minecraft">Grid</div>
        </div>
        <div
          className=" m-1 w-32 eightbit-btn  p-2 flex px-2  justify-left items-center"
          onClick={() => {
            click();
            handleSketchSelect(3);
          }}
        >
          <img alt='trash' className="w-8 h-8 mr-4" src={require('../symbols/spiral.png')} />
          <div className="minecraft">Spiral</div>
        </div>
      </div>
    </div>
  );
}
