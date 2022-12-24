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

  return (
    <div className="">
      <div className="container w-full h-full justify-around flex flex-col ">
        <div className="flex flex-col gap-y-2">
          <div className="minecraft">Pattern Preview</div>
          {ingredients.length === 0 && (
            <div className="mine text-xs pb-4 md:hidden">
              Choose items from the Inventory to start crafting your pattern.
            </div>
          )}
          <div className="relative">
            <div className="previewCanvas overflow-scroll w-[280px] h-[280px] md:w-[500px] md:h-[500px]">
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
            <div className="absolute m-4 right-0 bottom-0 flex flex-col items-center">
              <div
                id="save"
                onClick={() => {
                  handleSave();
                }}
              >
                <button className="mb-4 bg-white md:mb-0 minecraft m-1 eightbit-btn p-2 flex justify-center items-center">
                  Save Pattern
                </button>
              </div>
            </div>
            <div className=" absolute m-4 left-0 bottom-0">
              <ColorPicker
                backgroundColor={backgroundColor}
                onColorSelect={onColorSelect}
              />
            </div>
          </div>
        </div>

        
        <div className="flex mb-4 flex-col w-full">
        <div className="minecraft">Export Preferences</div>
        <div className='flex w-full items-center justify-between'>
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
