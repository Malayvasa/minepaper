import React from 'react';

export default function IconSizeSelector({ onChange }) {
  const handleSizeSelect = (size) => {
    onChange(size);
  };

  return (
    <div className=" h-min">
      <div className="minecraft mb-2">Icon Size</div>
      <div className="flex flex-col flex-wrap gap-y-4 overflow-y-scroll">
        <div
          className="m-1 w-32 eightbit-btn py-[9px] p-2 flex justify-center items-center"
          onClick={() => {
            handleSizeSelect('small');
          }}
        >
          <div className="minecraft">Small</div>
        </div>
        <div
          className=" m-1 w-32 eightbit-btn py-[9px] p-2 flex justify-center items-center"
          onClick={() => {
            handleSizeSelect('medium');
          }}
        >
          <div className="minecraft">Medium</div>
        </div>
        <div
          className=" m-1 w-32 eightbit-btn py-[9px]  p-2 flex justify-center items-center"
          onClick={() => {
            handleSizeSelect('large');
          }}
        >
          <div className="minecraft">Large</div>
        </div>
      </div>
      
    </div>
  );
}
