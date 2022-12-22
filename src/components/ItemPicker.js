import data from '../data.json';
import { useState } from 'react';
import useSound from 'use-sound';
import Place from '../sounds/place.mp3'; 

export default function ItemPicker(props) {
  const [Data, setData] = useState(data);

  const [place] = useSound(
    Place,
    { volume: 0.075 }
  );

  function handleClick(name) {
    props.onChange(name);
    place();
  }

  return (
    <div className="p-4 container w-full flex flex-col min-h-[246px] max-h-min">
      <div className="flex gap-8 pb-8 items-center justify-center">
        <div className="minecraft mb-2 h-max w-max">Inventory</div>
        <div className="search-container p-1 px-4 flex-grow w-1/2">
          <input
            className="minecraft placeholder-[#555] w-full outline-none bg-transparent"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              const filteredData = data.filter((item) =>
                item.name.includes(e.target.value)
              );
              setData(filteredData);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 w-full md:grid-cols-6 lg:grid-cols-9  max-h-44 overflow-y-scroll">
        {Data.map((item) => (
          <div
            key={item.id}
            className="box m-1 w-12 h-12 flex justify-center items-center"
            //add an onclick event to add the selected ingredient id to the state variable
            onClick={() => {
              handleClick(item.name);
            }}
          >
            <div className="">
              <img
                className=""
                alt={item.label}
                src={require(`../icons/${item.name}.png`)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
