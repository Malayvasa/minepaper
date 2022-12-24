import data from '../data.json';
import { useState } from 'react';
import useSound from 'use-sound';
import Place from '../sounds/place.mp3';
import ChestOpen from '../sounds/chest-open.mp3';
import ChestClose from '../sounds/chest-close.mp3';

export default function ItemPicker(props) {
  const [Data, setData] = useState(data);
  const [isPresetVisible, setIsPresetVisible] = useState(false);

  const presets = [
    {
      name: 'flowers',
      icons: ['dandelion', 'poppy', 'blue_orchid', 'allium', 'red_tulip', 'oxeye_daisy', 'cornflower', 'lily_of_the_valley', 'lilac'],
      color: '#DFFFE4',
    },
    {
      name: 'diamond tools',
      icons: ['diamond_sword', 'diamond_pickaxe', 'diamond_axe', 'diamond_shovel', 'diamond_hoe', 'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots'],
      color: '#B9F8FF',
    },
    {
      name: 'iron tools',
      icons: ['iron_sword', 'iron_pickaxe', 'iron_axe', 'iron_shovel', 'iron_hoe', 'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots'],
      color: '#F8F8F8',
    },
    {
      name: 'gold tools',
      icons: ['golden_sword', 'golden_pickaxe', 'golden_axe', 'golden_shovel', 'golden_hoe', 'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots'],
      color: '#FFD982',
    },
    {
      name: 'netherite tools',
      icons: ['netherite_sword', 'netherite_pickaxe', 'netherite_axe', 'netherite_shovel', 'netherite_hoe', 'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots'],
      color: '#1C0202',
    },
    {
      name: 'wooden tools',
      icons: ['wooden_sword', 'wooden_pickaxe', 'wooden_axe', 'wooden_shovel', 'wooden_hoe'],
      color: '#452409',
    },
    {
      name: 'stone tools',
      icons: ['stone_sword', 'stone_pickaxe', 'stone_axe', 'stone_shovel', 'stone_hoe'],
      color: '#8E8E8E',
    },
    {
      name: 'hoes',
      icons: ['wooden_hoe','stone_hoe','iron_hoe','golden_hoe','diamond_hoe','netherite_hoe'],
      color: '#000',
    },
    {
      name: 'swords',
      icons : ['wooden_sword','stone_sword','iron_sword','golden_sword','diamond_sword','netherite_sword'],
      color: '#000',
    },
    {
      name: 'amethyst',
      icons : ['small_amethyst_bud', 'medium_amethyst_bud', 'large_amethyst_bud', 'amethyst_cluster', 'amethyst_shard'],
      color : '#cfbaf0',
    },
  ];

  const [searchPreset, setSearchPreset] = useState(presets);
  const [place] = useSound(Place, { volume: 0.075 });
  const [preset] = useSound(ChestOpen, { volume: 0.045 });
  const [inventory] = useSound(ChestClose, { volume: 0.045 });

  function handleClick(name) {
    props.onChange(name);
    place();
  }

  function handlePresetClick(preset) {
    props.presetChange(preset);
    place();
  }

  function handleSearch(string) {
    const searchString = string.toLowerCase();
    if(isPresetVisible){
      const filteredPresets = presets.filter((preset) => preset.name.includes(searchString));
      setSearchPreset(filteredPresets);
    }else{
      const filteredData = data.filter((item) => item.name.includes(searchString));
      setData(filteredData);
    }
  }

  return (
    <div className="p-4 container w-full flex flex-col max-h-[354px] h-full">
      <div className="flex gap-8 pb-8 items-center justify-center">
        <div className="flex flex-col md:flex-row gap-x-4">
          <div
            className={`mine mb-2 cursor-pointer h-max w-max ${
              isPresetVisible ? 'text-[#555]' : 'text-black'
            }`}
            onClick={() => {
              inventory();
              setIsPresetVisible(false);
              handleSearch('');
              document.getElementById('search').value = '';
            }}
          >
            Inventory
          </div>
          <div
            className={`mine mb-2 cursor-pointer h-max w-max ${
              isPresetVisible ? 'text-black' : 'text-[#555]'
            }`}
            onClick={() => {
              preset();
              setIsPresetVisible(true);
              handleSearch('');
              document.getElementById('search').value = '';
            }}
          >
            Presets
          </div>
        </div>

        <div className="search-container p-1 px-4 flex-grow w-1/2">
          <input
            className="minecraft placeholder-[#555] w-full outline-none bg-transparent"
            type="text"
            id = "search"
            placeholder="Search"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>
      {isPresetVisible ? (
        <div className='flex flex-col gap-y-0.5 box h-full overflow-y-scroll'>
          {searchPreset.map((item) => (
            <div
              className="preset cursor-pointer box-border border-4 border-[#777] w-full minecraft"
              onClick={() => {
                handlePresetClick(item);
              }}
            >
              
              <div className="flex justify-between w-full">
              <div className='flex-grow capitalize'>{item.name}</div>
              <div className='flex items-center'>
                {item.icons.map((icon) => (
                  <div className="flex items-center w-4 h-4">
                    <div className="">
                      <img
                        className=""
                        alt={icon}
                        src={require(`../icons/${icon}.png`)}
                      />
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 w-full md:grid-cols-6 lg:grid-cols-9  h-full overflow-y-scroll">
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
      )}
    </div>
  );
}
