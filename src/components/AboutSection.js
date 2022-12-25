import React from 'react';

export default function AboutSection({setAboutVisible}) {
  return (
      <div className="bg-black flex items-center justify-center bg-opacity-30 mine text-xl fixed top-0 left-0 z-40 w-screen h-screen">

        <div className="about w-[500px] h-[620px] z-50 p-12">
          <div className="relative flex flex-col w-full h-full items-center justify-evenly">
            <div
              onClick={() => {
                setAboutVisible(false);
              }}
              className="absolute top-0 right-0 mr-4"
            >
              <img
                className="w-8 h-8 mb-4"
                src={require('../symbols/cross.png')}
                alt="cross"
              />
            </div>
            <div className="font-bold text-center">Made in 🇮🇳 with ❤️ by</div>

            <div className="flex flex-col items-center">
              <img
                className="w-16 h-16 mb-4"
                src={require('../Malay.png')}
                alt="malay"
              />
              <div className="text-sm font-bold text-center">Malay Vasa</div>
              
              <div className="flex mt-2 gap-2">
                <a
                  href="https://twitter.com/malayvasa"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="w-6 h-6 mr-2"
                    src={require('../symbols/twitter.png')}
                    alt="twitter"
                  />
                </a>
                <a
                  href="https://www.instagram.com/malayvasa/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="w-6 h-6 mr-2"
                    src={require('../symbols/instagram.png')}
                    alt="linkedin"
                  />
                </a>
                <a
                  href="https://www.malayvasa.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="w-6 h-6 mr-2"
                    src={require('../symbols/www.png')}
                    alt="website"
                  />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="w-16 h-16 mb-4"
                src={require('../Darshan.png')}
                alt="darshan"
              />
              <div className="text-sm font-bold text-center">
                Darshan Adroja
              </div>
              
              <div className="flex mt-2 gap-2">
                <a
                  href="https://twitter.com/malayvasa"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="w-6 h-6 mr-2"
                    src={require('../symbols/twitter.png')}
                    alt="twitter"
                  />
                </a>
                <a
                  href="https://www.instagram.com/malayvasa/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="w-6 h-6 mr-2"
                    src={require('../symbols/instagram.png')}
                    alt="linkedin"
                  />
                </a>
                <a
                  href="https://www.malayvasa.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="w-6 h-6 mr-2"
                    src={require('../symbols/www.png')}
                    alt="website"
                  />
                </a>
              </div>
            </div>

            <div
              className="text-sm eightbit-btn p-2"
              onClick={() => {
                window.open('https://www.buymeacoffee.com/wallcraft', '_blank');
              }}
            >
              Buy us a coffee!
            </div>
          </div>
        </div>
      </div>
  );
}
