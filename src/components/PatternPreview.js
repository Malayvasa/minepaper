import { useState } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import { SketchPicker } from 'react-color';
import useSound from 'use-sound';
import LevelUp from '../sounds/levelup.mp3'; 

export default function PatternPreview({sketch, ingredients, sketchName, backgroundColor, onColorSelect, iconSize}) {

  const presetColors = ["#fbf8cc","#fde4cf","#ffcfd2","#f1c0e8","#cfbaf0","#a3c4f3","#90dbf4","#8eecf5","#98f5e1","#b9fbc0"];

  const [displayPicker, setDisplayPicker] = useState(false);

  const [craft] = useSound(
    LevelUp,
    { volume: 0.45 }
  );

  const handleClick = () => {
    let newState = !displayPicker;
    setDisplayPicker(newState);
  };

  const handleClose = () => {
    setDisplayPicker(false);
  };

  const handleChange = (color) => {
    onColorSelect(color.hex);
  };

  return (
    <div className="flex flex-col gap-y-8">
          <div className="container w-max h-full flex flex-col ">
            <div className="minecraft mb-2">Pattern Preview</div>
            <div className='previewCanvas'>
              {sketch ? <ReactP5Wrapper
                sketch={sketch}
                sketchName={sketchName}
                icons={ingredients}
                iconSize={iconSize}
                backgroundColor={backgroundColor}
                preview={true}
                width={500}
                height={500}
              /> : <div className="w-64 h-64 minecraft">Loading Pattern</div>}
            </div>
            <div className='flex items-center w-full justify-between mt-4'>
              <div className='relative'>
              { displayPicker ? <div className=' absolute -top-[300px] z-20'>
          <div className=' fixed top-32 bottom-0 left-0 right-0' onClick={handleClose}/>
          <SketchPicker presetColors={presetColors} disableAlpha color={backgroundColor} onChange={handleChange} />
        </div> : null }

        <div onClick={handleClick}>
        <div>
      <svg
        width="32"
        height="37"
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1_56)">
          <path
            d="M109.54 20.07H118.97C119.72 24.4 119.98 82.74 119.31 99.57H109.54V49.88H89.66V39.94H109.54V20.06V20.07Z"
            fill="#353535"
          />
          <path
            d="M10.16 99.58H0.719995C-0.0200046 95.25 -0.280005 36.91 0.379995 20.07H10.15V39.95H30.03V49.89H10.16V99.58Z"
            fill="#353535"
          />
          <path
            d="M89.66 129.39V138.82C85.41 139.56 45.85 139.79 30.03 139.16V129.39H89.66Z"
            fill="#353535"
          />
          <path
            d="M30.03 10.14V0.709999C34.28 -0.0300008 73.84 -0.270001 89.66 0.369999V10.14H30.03V10.14Z"
            fill="#353535"
          />
          <path d="M109.54 99.58V119.46H99.6V99.58H109.54Z" fill="#353535" />
          <path d="M20.09 119.45H10.15V99.57H20.09V119.45Z" fill="#353535" />
          <path
            d="M89.66 10.14H109.54V20.08H89.66V10.14V10.14Z"
            fill="#353535"
          />
          <path d="M10.16 20.07V10.13H30.04V20.07H10.16Z" fill="#353535" />
          <path d="M30.03 129.39H20.09V119.45H30.03V129.39Z" fill="#353535" />
          <path
            d="M99.6 119.45V129.39H89.66V119.45H99.6V119.45Z"
            fill="#353535"
          />
          <path
            d="M89.66 49.89H99.6V99.58H89.66V119.46H79.72V59.83H89.66V49.89V49.89Z"
            fill="#727272"
          />
          <path d="M99.6 89.64V69.76H109.54V89.64H99.6Z" fill="#A8A8A8" />
          <path d="M109.54 69.76H99.6V49.88H109.54V69.76Z" fill="#969696" />
          <path
            d="M109.54 30.01H99.6V20.07H109.54V30.01V30.01Z"
            fill="#787878"
          />
          <path d="M99.6 89.64H109.54V99.58H99.6V89.64Z" fill="#969696" />
          <path
            d="M20.09 109.52V79.71H10.15V49.9H20.09V59.84H49.9V129.41H39.96V119.47H30.02V109.53H20.08L20.09 109.52ZM39.8 99.5V69.73C36.43 69.91 33.21 69.58 30.19 69.91V99.5H39.8V99.5Z"
            fill="#D8D8D8"
          />
          <path d="M10.16 20.07H20.1V30.01H10.16V20.07V20.07Z" fill="#787878" />
          <path d="M30.03 59.83H20.09V49.89H30.03V59.83Z" fill="#A8A8A8" />
          <path d="M10.16 79.7H20.1V89.64H10.16V79.7V79.7Z" fill="#A8A8A8" />
          <path d="M10.16 89.64H20.1V99.58H10.16V89.64V89.64Z" fill="#727272" />
          <path
            d="M49.91 129.39V59.83H69.79V109.46C66.28 109.66 63.02 109.3 59.85 109.68V129.39H49.91V129.39Z"
            fill="#A8A8A8"
          />
          <path
            d="M59.85 129.39V109.68C63.02 109.3 66.27 109.66 69.79 109.46V59.83H79.73V119.46H69.79V129.4H59.85V129.39Z"
            fill="#969696"
          />
          <path
            d="M30.03 119.45H39.97V129.39H30.03V119.45V119.45Z"
            fill="#A8A8A8"
          />
          <path d="M69.78 129.39V119.45H79.72V129.39H69.78Z" fill="#727272" />
          <path d="M79.72 129.39V119.45H89.66V129.39H79.72Z" fill="#969696" />
          <path
            d="M89.66 10.14V20.08H49.91V10.14H89.66V10.14Z"
            fill="#989898"
          />
          <path
            d="M49.91 10.14V20.08H30.03V10.14H49.91V10.14Z"
            fill="#787878"
          />
          <path d="M89.66 119.45V99.57H99.6V119.45H89.66Z" fill="#969696" />
          <path
            d="M20.09 109.52H30.03V119.46H20.09V109.52V109.52Z"
            fill="#A8A8A8"
          />
          <path
            d="M79.72 59.83H30.03V49.89H89.66V59.83H79.72Z"
            fill="#353535"
          />
          <g clip-path="url(#clip1_1_56)">
            <path
              d="M99.44 29.94V20H19.94V29.94H10V39.88H29.88V49.82H89.51V39.88H109.39V29.94H99.45H99.44Z"
              fill={backgroundColor}
            />
            <g clip-path="url(#clip2_1_56)">
              <path
                opacity="0.15"
                d="M29.94 29.94H20V39.88H29.94V29.94Z"
                fill="#D8D8D8"
              />
              <path
                opacity="0.2"
                d="M49.82 20H39.88V29.94H49.82V20Z"
                fill="#D8D8D8"
              />
              <path
                opacity="0.1"
                d="M49.82 39.88H39.88V49.82H49.82V39.88Z"
                fill="#D8D8D8"
              />
              <path
                opacity="0.1"
                d="M39.88 20H29.94V29.94H39.88V20Z"
                fill="#D8D8D8"
              />
              <path
                opacity="0.3"
                d="M39.88 29.94H29.94V39.88H39.88H49.81V29.94H39.88Z"
                fill="#D8D8D8"
              />
              <path
                opacity="0.3"
                d="M74.66 29.94H69.69V39.88H74.66H79.63V29.94H74.66Z"
                fill="#D8D8D8"
              />
              <path
                opacity="0.15"
                d="M94.53 29.94H89.57V39.88H94.53H99.5V29.94H94.53Z"
                fill="#D8D8D8"
              />
              <path
                opacity="0.08"
                d="M74.66 39.88H69.69V49.81H74.66H79.63V39.88H74.66Z"
                fill="#D8D8D8"
              />
              <path
                opacity="0.05"
                d="M79.63 20H69.69V29.94H79.63H89.57V20H79.63Z"
                fill="#D8D8D8"
              />
              <path
                opacity="0.2"
                d="M84.6 29.94H79.63V39.88H84.6H89.57V29.94H84.6Z"
                fill="#D8D8D8"
              />
              <path
                opacity="0.15"
                d="M59.75 39.88V29.94H49.81V39.88V49.81H59.75H69.69V39.88H59.75Z"
                fill="#D8D8D8"
              />
              <path
                opacity="0.05"
                d="M59.75 29.94V39.88H69.69V29.94V20H59.75H49.81V29.94H59.75Z"
                fill="#D8D8D8"
              />
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_56">
            <rect width="119.69" height="139.53" fill="white" />
          </clipPath>
          <clipPath id="clip1_1_56">
            <rect
              width="99.38"
              height="29.81"
              fill="white"
              transform="translate(10 20)"
            />
          </clipPath>
          <clipPath id="clip2_1_56">
            <rect
              width="79.5"
              height="29.81"
              fill="white"
              transform="translate(20 20)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
        </div>

              </div>
              <div id='save' onClick={()=>{console.log("sound"); craft();}}>
              <button   className="minecraft m-1 eightbit-btn p-2 flex justify-center items-center">Save Pattern</button>
              </div>
              
            </div>
          </div>
    </div>
  )
}
