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
  const [patternSize, setPatternSize] = useState({ width: 1920, height: 1080 });

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


  return (
    <div className="flex items-center p-8 min-h-screen min-w-screen back">
      <div className="w-full flex flex-col md:flex-row justify-center gap-8 m-auto">
        <div className="flex flex-col gap-y-8 items-center">
          <ItemPicker onChange={handleItemSelect} />
          <div className="container w-full pt-2 pb-4 flex gap-x-8 items-start">
          <ItemCrafter
            onChange={handleItemDeselect}
            selectedIngredients={selectedIngredients}
            onClear={handleClear}
            onColorClear={handleBackgroundColor}
          />
          <SketchSelector onChange={handleSketchSelect} />
          {
            sketchName !== 3 && (
              <IconSizeSelector onChange={handleIconSize} />
            )
          }
        </div>
        
        <div className='container py-4'>
        <form className="flex flex-row justify-evenly gap-x-8 items-center">
          <div>
          <label className="minecraft">Width:</label>
          <input
            className="minecraft input pl-2 w-32 bg-transparent ml-2 outline-none py-4 h-8"
            
            value={patternSize.width}
            onChange={(e) => {
              setPatternSize({ ...patternSize, width: e.target.value });
            }}
          />
          </div>
          <div>
          <label className="minecraft">Height :</label>
          <input
            className="minecraft input pl-2 w-32 bg-transparent ml-2 outline-none py-4 h-8"
            
            value={patternSize.height}
            onChange={(e) => {
              setPatternSize({ ...patternSize, height: e.target.value });
            }}
          />
          </div>
        </form>
        </div>
       
        </div>

        

        {/* <button onClick={onChangeSketch}>Change Sketch</button> */}

        <PatternPreview
          ingredients={selectedIngredients}
          sketch={Pattern.sketch}
          sketchName={sketchName}
          backgroundColor={backgroundColor}
          onColorSelect={handleBackgroundColor}
          iconSize={iconSize}
        />

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
