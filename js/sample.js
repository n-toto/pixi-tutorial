let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

const width = 800;
const height = 600;

const birthday = new Date("1998/01/01");

let birthday_map = {};
let N = 10;

//Create a Pixi Application
const app = new PIXI.Application({ 
    width: width,         // default: 800
    height: height,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1,       // default: 1
    backgroundColor: 0x1099bb,
});

//Add the canvas that Pixi automatically created for you to the HTML document
let el = document.getElementById('app');
el.appendChild(app.view);

const circles = [];
for (var i = 0; i < N; i++) {
    const container = new PIXI.Container();
    container.x = Math.random() * width;
    container.y = Math.random() * height;
    const circle = new PIXI.Graphics()
    .beginFill(0xf00000)
    .drawCircle(0, 0, 20)
    .endFill();

    circle.interactive = true;
    circle.buttonMode = true;

    circle.on('pointertap', showAlert);

    container.addChild(circle);
    app.stage.addChild(container);
    circles.push(container);

    birthday_map[i] = getRandomYmd('1920/01/01', '2020/01/01');
}

console.log(circles);
console.log(birthday_map);

const color = new PIXI.filters.ColorMatrixFilter();
color.desaturate();
const tint = 0x000000;
const r = tint >> 16 & 0xFF;
const g = tint >> 8 & 0xFF;
const b = tint & 0xFF;
color.matrix[0] = r / 255;
color.matrix[6] = g / 255;
color.matrix[12] = b / 255;

const textStyle = new PIXI.TextStyle( { fill: 0xffffff } );

function showAlert(e) {
    let index = circles.indexOf(e.target.parent);
    console.log(index);
    e.target.filters = [color];
    
    const text = new PIXI.Text(birthday_map[index], textStyle );
    console.log(circles[index]);
    text.position.set( circles[index].position.x, circles[index].position.y );
    app.stage.addChild(text);
}

function getRandomYmd(fromYmd, toYmd){
    var d1 = new Date(fromYmd);
    var d2 = new Date(toYmd);

    var c = (d2 - d1) / 86400000;
    var x = Math.floor(Math.random() * (c+1));

    d1.setDate(d1.getDate() + x);

    var m = ("00" + (d1.getMonth()+1)).slice(-2);
    var d = ("00" + d1.getDate()).slice(-2);

    return m + "/" + d;
}