import { useState } from 'react';
import './App.css';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import * as Pattern from './sketches/PatternSketch';
import ItemPicker from './components/ItemPicker';
import ItemCrafter from './components/ItemCrafter';
import SketchSelector from './components/SketchSelector';
import PatternPreview from './components/PatternPreview';
import IconSizeSelector from './components/IconSizeSelector';

//formula of index position of element i in a 2d array

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [sketchName, setSketchName] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState('#919191');
  const [iconSize, setIconSize] = useState(32);
  const [patternSize, setPatternSize] = useState({ width: 1080, height:1080 });

  const handleItemSelect = (name) => {
    if (selectedIngredients.length >= 9) {
      console.log('Max Ingredients Reached');
      return;
    }
    console.log('Item Selected:', name);
    setSelectedIngredients([...selectedIngredients, name]);
  };

  const handleItemDeselect = (i) => {
    console.log('Item Deselected:', selectedIngredients[i]);
    if (!selectedIngredients[i]) return;
    const newSelectedIngredients = [...selectedIngredients];
    newSelectedIngredients.splice(
      selectedIngredients.indexOf(selectedIngredients[i]),
      1
    );
    setSelectedIngredients(newSelectedIngredients);
  };

  const handleClear = () => {
    console.log('All Items Cleared');
    setSelectedIngredients([]);
  };

  const handleSketchSelect = (Sketch) => {
    setSketchName(Sketch);
    //setCurrentSketch({ sketch: Sketch });
  };

  const handleBackgroundColor = (color) => {
    console.log('Background Color Changed:', color);
    setBackgroundColor(color);
  };

  const handleIconSize = (size) => {
    console.log('Icon Size Changed:', size);
    setIconSize(size);
  };

  const handlePresetSelect = (preset) => {
    console.log('Preset Selected:', preset.name);
    //set all icons in the selectedIngredients array to the preset icon array
    setSelectedIngredients(preset.icons);
    //set the background color to the preset background color
    setBackgroundColor(preset.color);
  };


  // handle pattern size to check if event name is width or height and set the state
  const handlePatternSize = (e) => {
    console.log('Pattern Size Changed:', e.target.name, e.target.value);
    if (e.target.name === 'width') {
      setPatternSize({ ...patternSize, width: e.target.value });
    } else if (e.target.name === 'height') {
      setPatternSize({ ...patternSize, height: e.target.value });
    }
  };

  const exportPreset = () => {
    const preset = {
      name: 'New Preset',
      icons: selectedIngredients,
      color: backgroundColor,
    };
    console.log('Preset Exported:', preset);
  };

  return (
    <div className="flex items-center p-8 h-auto md:h-screen w-screen back overflow-hidden">
      <div className="w-full flex flex-col md:flex-row justify-center gap-8 m-auto">


        <div className="flex flex-col gap-y-8 items-center">
        <div className='block md:hidden'>
        <PatternPreview
          className="hidden"
          ingredients={selectedIngredients}
          sketch={Pattern.sketch}
          sketchName={sketchName}
          backgroundColor={backgroundColor}
          onColorSelect={handleBackgroundColor}
          iconSize={iconSize}
          onSizeChange={handlePatternSize}
          patternSize={patternSize}
          onExport={exportPreset}
        />
        </div>
          <ItemPicker onChange={handleItemSelect} presetChange={handlePresetSelect}/>
          <div className="container w-full pt-2 pb-4 flex flex-col gap-y-4 md:gap-y-0 md:flex-row gap-x-8 items-center md:items-start">
          <ItemCrafter
            onChange={handleItemDeselect}
            selectedIngredients={selectedIngredients}
            onClear={handleClear}
            onColorClear={handleBackgroundColor}
          />
          <div className='flex gap-x-4 md:gap-x-8'>
          <SketchSelector onChange={handleSketchSelect} />
          {
            sketchName !== 3 && (
              <IconSizeSelector onChange={handleIconSize} />
            )
          }
          </div>
          
        </div>
        </div>

        

        {/* <button onClick={onChangeSketch}>Change Sketch</button> */}

        <div className='hidden md:block'>
        <PatternPreview
          className="hidden"
          ingredients={selectedIngredients}
          sketch={Pattern.sketch}
          sketchName={sketchName}
          backgroundColor={backgroundColor}
          onColorSelect={handleBackgroundColor}
          iconSize={iconSize}
          onSizeChange={handlePatternSize}
          patternSize={patternSize}
          onExport={exportPreset}
        />
        </div>
        

        <div className=" hidden ">
          <ReactP5Wrapper
            sketch={Pattern.sketch}
            icons={selectedIngredients}
            width={patternSize.width}
            height={patternSize.height}
            sketchName={sketchName}
            backgroundColor={backgroundColor}
            iconSize={iconSize}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
