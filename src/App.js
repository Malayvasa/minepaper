import { useEffect, useState } from 'react';
import './App.css';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import * as Pattern from './sketches/PatternSketch';
import ItemPicker from './components/ItemPicker';
import ItemCrafter from './components/ItemCrafter';
import SketchSelector from './components/SketchSelector';
import PatternPreview from './components/PatternPreview';
import IconSizeSelector from './components/IconSizeSelector';
import Title from './Title.png';
import AboutSection from './components/AboutSection';

//formula of index position of element i in a 2d array

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [sketchName, setSketchName] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState('#919191');
  const [iconSize, setIconSize] = useState('medium');
  const [patternSize, setPatternSize] = useState({ width: 1080, height: 1080 });
  const [downloadCount, setDownloadCount] = useState('xxx');
  const [aboutVisible, setAboutVisible] = useState(false);
  // const {REACT_APP_HIT,REACT_APP_GET} = process.env;

  // useEffect(() => {
  //   fetch(REACT_APP_GET)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res);
  //       setDownloadCount(res.value);
  //     });
  // }, []);

  // const handleDownload = () => {
  //   fetch(REACT_APP_HIT)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setDownloadCount(res.value);
  //     });
  // };

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
  const handleCustomPatternSize = (e) => {
    console.log('Pattern Size Changed:', e.target.name, e.target.value);
    if (e.target.name === 'width') {
      const currentHeight = patternSize.height;
      console.log('currentHeight', currentHeight);
      setPatternSize({
        width: parseInt(e.target.value),
        height: currentHeight,
      });
    } else if (e.target.name === 'height') {
      const currentWidth = patternSize.width;
      console.log('currentWidth', currentWidth);
      setPatternSize({ width: currentWidth, height: parseInt(e.target.value) });
    }
  };

  const handlePresetPatternSize = (preset) => {
    console.log('Preset Pattern Size Selected:', preset.name);
    setPatternSize({ width: preset.width, height: preset.height });
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
    <div className="flex flex-col items-center justify-evenly p-8 h-auto md:min-h-screen w-screen back overflow-hidden">

{aboutVisible && (
        
          <AboutSection setAboutVisible={setAboutVisible} />
      )}

      <div className="relative w-[300px] md:w-[500px] mb-4 md:mb-0 pb-8">
        <img src={Title} alt="logo" />
        <div className="mine flex gap-x-2 top-3/4 -mt-6 -mr-8 -rotate-12 right-0 absolute title text-md md:text-xl text-[#F4F739]">
          <div>500+</div>
          <div>Downloads!</div>
        </div>
      </div>

      <div className=" w-full flex flex-col h-full md:flex-row justify-center gap-8 ">
        <div className="flex flex-col gap-y-8 items-center">
          <div className="container w-full pt-2 pb-4 flex flex-col gap-y-4 md:gap-y-0 md:flex-row gap-x-8 items-center md:items-start">
            <ItemCrafter
              onChange={handleItemDeselect}
              selectedIngredients={selectedIngredients}
              onClear={handleClear}
              onColorClear={handleBackgroundColor}
            />
            <div className="flex gap-x-4 md:gap-x-8">
              <SketchSelector onChange={handleSketchSelect} />
              {sketchName !== 3 && (
                <IconSizeSelector onChange={handleIconSize} />
              )}
            </div>
          </div>

          <ItemPicker
            onChange={handleItemSelect}
            presetChange={handlePresetSelect}
          />
        </div>

        <PatternPreview
          className="hidden"
          ingredients={selectedIngredients}
          sketch={Pattern.sketch}
          sketchName={sketchName}
          backgroundColor={backgroundColor}
          onColorSelect={handleBackgroundColor}
          iconSize={iconSize}
          onCustomSizeChange={handleCustomPatternSize}
          onPresetSizeChange={handlePresetPatternSize}
          patternSize={patternSize}
          onExport={exportPreset}
        />
      </div>

      <div
        onClick={() => {
          const newState = !aboutVisible;
          setAboutVisible(newState);
        }}
        className="md:fixed md:top-0 z-50 md:right-0 m-4 text-center"
      >
        <div className="eightbit-btn mt-4 md:mt-0 p-2 text-xs text-[#555]">
          About WallCraft
        </div>
      </div>

      <div className='md:fixed md:top-0 md:left-0 m-4'>
      <a href="https://www.producthunt.com/posts/wallcraft?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-wallcraft"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=372457&theme=light&period=daily" alt="WallCraft - Generate&#0032;wallpapers&#0032;and&#0032;patterns&#0032;with&#0032;Minecraft&#0032;icons | Product Hunt" width="250" /></a>
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
  );
}

export default App;
