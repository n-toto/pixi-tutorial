let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

const width = document.body.clientWidth;
const height = window.innerHeight;

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
    backgroundColor: 0xDDDDDD,
});

//Add the canvas that Pixi automatically created for you to the HTML document
let el = document.getElementById('app');
el.appendChild(app.view);

const circles = [];
for (var i = 0; i < N; i++) {
    const container = new PIXI.Container();
    container.x = width / 4 *  ( i%4 );
    container.y = height / 4 * (Math.floor(i/4));
    const circle = new PIXI.Graphics()
    .beginFill(0xCD853F)
    .drawRect(50, 0, 100, 50)
    .endFill();

    circle.interactive = true;
    circle.buttonMode = true;

    circle.on('pointertap', showAlert);

    container.addChild(circle);
    app.stage.addChild(container);
    circles.push(container);

    birthday_map[i] = getRandomYmd('1920/01/01', '2020/01/01');
}

const textStyle = new PIXI.TextStyle( { fill: 0xffffff } );

function showAlert(e) {
    let index = circles.indexOf(e.target.parent);
    console.log(index);
    
    const text = new PIXI.Text(birthday_map[index], textStyle );
    text.position.set( circles[index].position.x + 50, circles[index].position.y + 25 );
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