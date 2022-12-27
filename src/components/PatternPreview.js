import { ReactP5Wrapper } from 'react-p5-wrapper';
import useSound from 'use-sound';
import LevelUp from '../sounds/levelup.mp3';
import posthog from 'posthog-js';
import ExportSizeSelector from './ExportSizeSelector';
import ColorPicker from './ColorPicker';
import PresetSelector from './PresetSelector';

posthog.init('phc_AStYWHVnAjzLaae0uLb4FAmGXr5fTc89iZHl0WmiNyF', {
  api_host: 'https://app.posthog.com',
});

export default function PatternPreview({
  sketch,
  ingredients,
  sketchName,
  backgroundColor,
  onColorSelect,
  iconSize,
  patternSize,
  onCustomSizeChange,
  onPresetSizeChange,
  onExport,
  // onDownload,
}) {
  const [craft] = useSound(LevelUp, { volume: 0.45 });

  const postHogExport = () => {
    const preset = {
      icons: ingredients,
      color: backgroundColor,
      sketchType: sketchName,
      iconSize: iconSize,
      patternSize: patternSize,
    };
    return preset;
  };

  const handleSave = () => {
    posthog.capture('Pattern Saved', postHogExport());
    onExport();
    craft();
  };

  const handleDownload = () => {
    // onDownload();
  };

  return (
    <div className="">
      <div className="container w-full h-full justify-around flex flex-col ">
        <div className="relative flex flex-col gap-y-2">
          <div className="minecraft">Pattern Preview</div>
          {ingredients.length === 0 && (
            <div className="absolute top-1/3 px-8 mine text-xs z-10 md:hidden">
              Choose items from the Inventory to start crafting your pattern.
            </div>
          )}
          <div className="relative">
            <div className=" previewCanvas overflow-scroll w-full h-[280px] md:w-[500px] md:h-[500px]">
              <ReactP5Wrapper
                sketch={sketch}
                sketchName={sketchName}
                icons={ingredients}
                iconSize={iconSize}
                backgroundColor={backgroundColor}
                preview={true}
                width={500}
                height={500}
              />
            </div>
            <div className="mt-4 md:mt-0 flex w-full justify-evenly">
              <div className=" md:absolute md:m-4 md:left-0 md:bottom-0">
                <ColorPicker
                  backgroundColor={backgroundColor}
                  onColorSelect={onColorSelect}
                />
              </div>
              <div className="md:absolute md:m-4 md:right-0 md:bottom-0 flex flex-col items-center">
                <div
                  id="save"
                  onClick={() => {
                    handleSave();
                    // handleDownload();
                  }}
                >
                  <button className=" bg-white minecraft m-1 eightbit-btn p-2 flex justify-center items-center">
                    Save Pattern
                  </button>
                </div>
              </div>
            </div>
            <div className='md:hidden w-full text-center mine text-[#555] text-xs mt-6'>
              Mobile Exports Limited to 1080px * 1080px,
              Use Desktop/Tablet for Larger Exports
            </div>
          </div>
        </div>

        <div className="flex mb-4 flex-col w-full text-center md:text-left">
          <div className="hidden md:block text-[#555] md:mb-2 mine">
            Export Preferences
          </div>
          <div className="hidden md:flex flex-col gap-y-4 md:flex-row w-full items-center justify-between">
            <ExportSizeSelector
              patternSize={patternSize}
              onCustomSizeChange={onCustomSizeChange}
            />
            <PresetSelector onPresetSizeChange={onPresetSizeChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
