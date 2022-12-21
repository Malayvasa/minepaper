import data from '../data.json';

export function sketch(p5) {
    let allIcons = [];
    let icons = [];
    let spacing = 96;
    let defaultWidth = 500;
    let defaultHeight = 500;
    let preview = false;


    p5.preload = () => {
        data.forEach((item) => {
          allIcons.push(p5.loadImage(require(`../icons/${item.name}.png`)));
        });
      };
    
      //write a function to update the icons array when the props change
      p5.updateWithProps = (props) => {
        if (props.icons && props.icons.length > 0) {
          //make an array iconids of ids from data that match the names in the props do not remove duplicates
          let iconids = [];
          props.icons.forEach((name) => {
            let id = data.findIndex((item) => item.name === name);
            iconids.push(id);
          });
    
          //use these ids as indexes to make a new array icons of images from allIcons
          icons = iconids.map((id) => allIcons[id]);
          p5.setup();
          p5.draw();

          console.log(props.icons.length);
        }

        if (props.width && props.height) {
            defaultWidth = props.width;
            defaultHeight = props.height;
        }
        if (props.preview) {
          preview = props.preview;
        }
      };

    p5.setup = () => {
      p5.createCanvas(defaultWidth, defaultHeight);
      p5.imageMode(p5.CENTER);
      p5.angleMode(p5.DEGREES);
      if(preview === true){
        spacing = 64;
      }
    }

    p5.keyPressed = () => {
        if (preview === false) {
          if (p5.key === '1')
            p5.saveCanvas('Minecraft_Wallpaper', 'png');
        }
    };
  
    p5.draw = () => {
      if(icons.length === 0 && preview === true){
        p5.background("#555");
      }
        else if(icons.length>0){
          let x = 1;
          if(preview === true){
              p5.background("#919191");
              }else{
              p5.background("#000000");
              }
          p5.translate(p5.width / 2, p5.height / 2);
          p5.image(icons[0], 0, 0, spacing / 2, spacing / 2);
          
          for (let j = spacing; j < p5.width; j = j + spacing) {
            let q = p5.int(x % icons.length);
            for (let k = 0; k < (x*6); k++) {
              p5.rotate(360/(x*6));
              p5.image(icons[q], 0, j, spacing / 2, spacing / 2);
            }
            x = x + 1;
          }
        }
        p5.noLoop();
      }
  }