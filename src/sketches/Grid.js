import data from '../data.json';

export function sketch(p5) {
  let allIcons = [];
  let icons = [];
  let row, col;
  let xgap, ygap;
  let spacing = 128+64;
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



    if(preview === true){
        spacing = 96;
    }
    p5.createCanvas(defaultWidth, defaultHeight);
    p5.imageMode(p5.CENTER);

    // make a new array with images from allIcons that match the names in the props

    row = p5.floor(p5.width / spacing);

    if (row % 2 === 0) {
      row = row - 1;
    }

    xgap = p5.width / row;
    
    col = p5.floor(p5.height / spacing);

    if (col % 2 === 0) {
        col = col - 1;
    }

    ygap = p5.height / col;

    if(preview === true){
      col = row;
      ygap = xgap;
    }
  };

  //function to press s to save canvas as png
  p5.keyPressed = () => {
    if (preview === false) {
      if (p5.key === '1')
        p5.saveCanvas('Minecraft_Wallpaper', 'png');
    }
  };

  p5.draw = () => {
    p5.translate(spacing / 2, spacing / 2);
    if(preview === true){
    p5.background("#919191");
    }else{
    p5.background("#000000");
    }

    for (let j = 0; j < row; j++) {
      for (let k = 0; k < col; k++) {
        let pos = p5.int(j + k * row);

        let i = pos % icons.length;

        //text(pos,j*32,k*32);
        p5.image(icons[i], j * xgap, k * ygap, spacing / 2, spacing / 2);
      }
    }

    if(icons.length === 0 && preview === true){
      p5.background("#555");}

    p5.noLoop();
  };
}


