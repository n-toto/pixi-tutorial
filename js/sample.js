let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

PIXI.utils.sayHello(type);


const width = 800;
const height = 600;

const birthday = new Date("1998/01/01");

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
for (var i = 0; i < 10; i++) {
    const circle = new PIXI.Graphics()
    .beginFill(0xf00000)
    .drawCircle(0, 0, 20)
    .endFill();
    circle.position.set( Math.random() * width,  Math.random() * height);

    circle.interactive = true;
    circle.buttonMode = true;
    
    circle.on('pointertap', showAlert);

    app.stage.addChild( circle );
}

console.log(circles);

function showAlert(e) {
    let str = getRandomYmd('1920/01/01', '2020/01/01');
    alert("Birthday is: " + str);
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

