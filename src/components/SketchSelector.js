import React from 'react';

export default function SketchSelector({ onChange }) {
  const handleSketchSelect = (Sketch) => {
    onChange(Sketch);
  };

  return (
    <div className=" h-min">
      <div className="minecraft mb-2">Pattern Type</div>
      <div className="flex w-64 flex-row flex-wrap gap-y-4 overflow-y-scroll">
        <div
          className="m-1 w-32 eightbit-btn p-2 flex justify-center items-center"
          onClick={() => {
            handleSketchSelect(1);
          }}
        >
          <div className="minecraft">Ring</div>
        </div>
        <div
          className=" m-1 w-32 eightbit-btn p-2 flex justify-center items-center"
          onClick={() => {
            handleSketchSelect(2);
          }}
        >
          <div className="minecraft">Grid</div>
        </div>
        <div
          className=" m-1 w-32 eightbit-btn  p-2 flex justify-center items-center"
          onClick={() => {
            handleSketchSelect(3);
          }}
        >
          <div className="minecraft">Spiral</div>
        </div>
      </div>
    </div>
  );
}
