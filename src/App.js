import { useState } from 'react';
import data from './data.json';
import './App.css';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import * as Grid from './sketches/Grid';
import * as Ring from './sketches/Ring';

//formula of index position of element i in a 2d array

function App() {

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [Data, setData] = useState(data);
  const [currentSketch, setCurrentSketch] = useState({
    sketch: Grid.sketch,
  });

  //add a hook to limit the number of selected ingredients to 9
  if (selectedIngredients.length > 9) {
    const newSelectedIngredients = [...selectedIngredients];
    newSelectedIngredients.pop();
    setSelectedIngredients(newSelectedIngredients);
  }
  return (
    <div className=" flex content-center justify-around items-center flex-col md:flex-row p-8 w-screen h-screen overflow-scroll back">
      <div className="w-full flex justify-evenly items-center">
        <div className="p-4 w-max container flex flex-col h-min">
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

          <div className="grid md:grid-cols-6 lg:grid-cols-9 gap-1 max-h-64 overflow-y-scroll">
            {Data.map((item) => (
              <div
              key={item.id}
                className="box m-1 flex justify-center items-center"
                //add an onclick event to add the selected ingredient id to the state variable
                onClick={() => {
                  setSelectedIngredients([...selectedIngredients, item.name]);
                }}
              >
                <div className="">
                  <img className="" alt={item.label} src={require(`./icons/${item.name}.png`)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col items-center'>
        <div className="flex flex-col justify-center items-center w-max h-min container mb-8">
          <div className="minecraft mb-2">Selected</div>
          <div className="w-max">
            <div className="grid grid-cols-3 overflow-y-scroll">
              {[...Array(9)].map((_, i) => (
                <div
                  className="box m-1 flex justify-center items-center"
                  onClick={() => {
                    if (!selectedIngredients[i]) return;
                    const newSelectedIngredients = [...selectedIngredients];
                    newSelectedIngredients.splice(
                      selectedIngredients.indexOf(selectedIngredients[i]),
                      1
                    );
                    setSelectedIngredients(newSelectedIngredients);
                  }}
                >
                  {selectedIngredients[i] ? (
                    <img
                      alt={selectedIngredients[i]}
                      className=""
                      src={require(`./icons/${selectedIngredients[i]}.png`)}
                    />
                  ) : (
                    <div className="w-8 h-8"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="search-container w-32 mt-4 flex justify-center items-center">
            <button
              className="minecraft mt-4"
              onClick={() => {
                setSelectedIngredients([]);
              }}
            >
              Clear
            </button>
            </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full h-min container mb-8">
          <div className="minecraft mb-2">Pattern Type</div>
          <div className="w-max">
            <div className="flex flex-col overflow-y-scroll">
              <div

                className="m-1 search-container p-2 flex justify-center items-center"
                onClick={() => {
                  
                  setCurrentSketch({ sketch: Grid.sketch });
                }}
              >
                <div className="minecraft text-sm">Simple Grid</div>
              </div>
              <div
                className=" m-1 search-container p-2 flex justify-center items-center"
                onClick={() => {
                  
                  setCurrentSketch({ sketch: Ring.sketch});
                }}
              >
                <div className="minecraft text-sm">Rings</div>
              </div>
            </div>
          </div>
        </div>
        </div>

      

{/* <button onClick={onChangeSketch}>Change Sketch</button> */}
        
        <div className='flex flex-col gap-y-8'>
        <div className="container w-max h-max flex flex-col justify-center items-center">
          <div className="minecraft mb-2">Pattern Preview</div>
          <div className=" hidden ">
            <ReactP5Wrapper sketch={currentSketch.sketch} icons={selectedIngredients} width={1920} height={1080} />
          </div>
          <div>
            <ReactP5Wrapper
              sketch={currentSketch.sketch}
              icons={selectedIngredients}
              preview={true}
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* <div className='container'>
          <GithubPicker className='bg-[#555]'/>
        </div> */}


        </div>
       

      </div>

    </div>
  );
}

export default App;
