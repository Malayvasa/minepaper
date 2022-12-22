import React from 'react';


export default function ItemCrafter({
  onChange,
  selectedIngredients,
  onClear,
  onColorClear,
}) {
  const handleClick = (i) => {
    onChange(i);
  };

  const handleClear = () => {
    onClear();
    onColorClear("#919191");
  };

  return (
    <div className="flex flex-col justify-center gap-y-4 items-center w-max h-min">
      <div className="w-full flex justify-between">
        <div className='minecraft flex-grow'>
        Selected
        </div>
          
      <button
          className="flex justify-center items-center minecraft mt-12"
          onClick={() => {
            handleClear();
          }}
        >
          <img alt='trash' className="w-8 h-8" src={require('../trash-bin.png')} />
        </button>
      </div>

      <div className="w-max">
        <div className="grid grid-cols-3 overflow-y-scroll">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="box w-12 h-12 m-1 flex justify-center items-center"
              onClick={() => {
                handleClick(i);
              }}
            >
              {selectedIngredients[i] ? (
                <img
                  alt={selectedIngredients[i]}
                  className=""
                  src={require(`../icons/${selectedIngredients[i]}.png`)}
                />
              ) : (
                <div className="w-12 h-12"></div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
