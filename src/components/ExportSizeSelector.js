import React from 'react';

export default function ExportSizeSelector({
  patternSize,
  onCustomSizeChange,
}) {
  const handleCustomSize = (e) => {
    onCustomSizeChange(e);
  };

  return (
    <div className="">
      <div className="">
        <form className="flex gap-2 items-center justify-left">
          <div className="flex flex-col justify-between">
            
            <input
              className="minecraft w-24 input bg-transparent outline-none px-2 py-4 h-8"
              name="width"
              type={'number'}
              value={patternSize.width}
              onChange={(e) => {
                handleCustomSize(e);
              }}
            />
          </div>
          <div className='mine'>x</div>
          <div className="flex flex-col justify-between">
            
            <input
              className="minecraft w-24 input bg-transparent outline-none px-2 py-4 h-8"
              name="height"
              type={'number'}
              value={patternSize.height}
              onChange={(e) => {
                handleCustomSize(e);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
