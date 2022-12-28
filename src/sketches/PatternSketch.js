import data from '../data.json';

export function sketch(p5) {
  let allIcons = [];
  let icons = [];
  let spacing = 96;
  let defaultWidth = 500;
  let defaultHeight = 500;
  let preview = false;
  let id = 1;
  var a = 0;
  let backgroundColor = '#9191ff';
  let animation = false;
  let title = '';
  let iconSize = 'medium';

  //Grid
  let row, col;
  let xgap, ygap;

  p5.preload = () => {
    data.forEach((item) => {
      allIcons.push(p5.loadImage(require(`../icons/${item.name}.png`)));
    });
  };

  //write a function to update the icons array when the props change
  p5.updateWithProps = (props) => {
    if (props.icons && props.icons.length > 0) {
      //make an array iconids of ids from data that match the names in the props do not remove duplicates
      title = props.icons[0];

      let iconids = [];
      props.icons.forEach((name) => {
        let id = data.findIndex((item) => item.name === name);
        iconids.push(id);
      });

      //use these ids as indexes to make a new array icons of images from allIcons
      icons = iconids.map((id) => allIcons[id]);
      p5.setup();
      p5.draw();
    } else {
      icons = [];
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
    if (props.sketchName) {
      id = props.sketchName;
      p5.setup();
      p5.draw();
    }
    if (props.backgroundColor) {
      backgroundColor = props.backgroundColor;
      p5.setup();
      p5.draw();
    }
    if (props.iconSize) {
      iconSize = props.iconSize;
      if (iconSize == 'small') {
        preview ? (spacing = 32) : (spacing = 64);
      } else if (iconSize == 'medium') {
        preview ? (spacing = 64) : (spacing = 96);
      } else if (iconSize == 'large') {
        preview ? (spacing = 96) : (spacing = 128);
      }
      p5.setup();
      p5.draw();
    }
  };

  const savePNG = () => {
    if (preview === false) {
      let type = 'pattern';

      if (id == 1) {
        type = 'ring';
      } else if (id == 2) {
        type = 'grid';
      } else if (id == 3) {
        type = 'spiral';
      }

      title = title + '_' + iconSize + '_' + type;
      p5.saveCanvas(title, 'png');
    }
  };

  p5.setup = () => {
    p5.createCanvas(defaultWidth, defaultHeight);
    p5.imageMode(p5.CENTER);
    p5.angleMode(p5.DEGREES);
    p5.frameRate(10);
    p5.pixelDensity(1);

    row = p5.floor(p5.width / spacing);
    col = p5.floor(p5.height / spacing);

    if (icons.length % 2 === 0) {
      if (row % 2 === 0) {
        row = row - 1;
      }
      if (col % 2 === 0) {
        col = col - 1;
      }
    }
    xgap = p5.width / row;
    ygap = p5.height / col;

    if (p5.width === p5.height) {
      col = row;
      ygap = xgap;
    }
  };

  const drawGrid = (anim) => {
    p5.translate(xgap / 2, ygap / 2);
    for (let j = 0; j < row; j++) {
      for (let k = 0; k < col; k++) {
        let pos = p5.int(j + k * row);

        let i = pos % icons.length;

        //text(pos,j*32,k*32);
        p5.image(
          icons[(i + anim) % icons.length],
          j * xgap,
          k * ygap,
          spacing / 2,
          spacing / 2
        );
      }
    }
  };

  const drawRing = (anim) => {
    let x = 1;
    let max;
    p5.translate(p5.width / 2, p5.height / 2);
    p5.image(icons[anim % icons.length], 0, 0, spacing / 2, spacing / 2);

    if (p5.width > p5.height) {
      max = p5.width;
    } else {
      max = p5.height;
    }

    for (let j = spacing; j < max; j = j + spacing) {
      let q = p5.int(x % icons.length);
      for (let k = 0; k < x * 6; k++) {
        p5.rotate(360 / (x * 6));
        p5.image(
          icons[(q + anim) % icons.length],
          0,
          j,
          spacing / 2,
          spacing / 2
        );
      }
      x = x + 1;
    }
  };

  const drawSpiral = (anim) => {
    p5.translate(p5.width / 2, p5.height / 2);
    p5.image(icons[0], 0, 0, 32, 32);

    for (let i = 0; i < 18; i++) {
      let pos = p5.int(i % icons.length);
      drawSpiral((i * 360) / 18, pos, anim);
    }

    function drawSpiral(r, pos, anim) {
      p5.push();
      p5.rotate(r);
      p5.push();
      for (let i = 5; i < p5.width; i++) {
        p5.rotate(360 / 60);
        if (preview === true) {
          p5.image(
            icons[(pos + anim) % icons.length],
            7.5 * i,
            10 * i,
            1.2 * i,
            1.2 * i
          );
        } else {
          p5.image(
            icons[(pos + anim) % icons.length],
            7.5 * i,
            10 * i,
            0.8 * i,
            0.8 * i
          );
        }
      }
      p5.pop();
      p5.pop();
    }
  };

  //use javscript to find a button with id save and add a mousePressed event to it

  p5.draw = () => {
    if (icons.length === 0 && preview === true) {
      p5.background(backgroundColor);
    } else if (icons.length > 0) {
      p5.background(backgroundColor);
      if (id === 1) {
        drawRing(a);
      } else if (id === 2) {
        drawGrid(a);
      } else if (id === 3) {
        drawSpiral(a);
      } else {
        p5.text(id, 10, 10, 32, 32);
      }
    }
    if (animation === false) {
      p5.noLoop();
    } else {
      a++;
    }
  };

  var el = document.getElementById('save');
  if (el) {
    el.addEventListener('click', () => {
      if (preview === false) {
        savePNG();
        console.log('Image Saved');
      }
    });
  }
}
