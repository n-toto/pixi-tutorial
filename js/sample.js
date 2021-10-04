let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

PIXI.utils.sayHello(type);

//Create a Pixi Application
const app = new PIXI.Application({ 
    width: 800,         // default: 800
    height: 600,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1,       // default: 1
    backgroundColor: 0x1099bb,
});

//Add the canvas that Pixi automatically created for you to the HTML document
let el = document.getElementById('app');
el.appendChild(app.view);

const textStyle = new PIXI.TextStyle( { fill: 0xffffff } );
const titleText = new PIXI.Text( "Hello World", textStyle );

titleText.position.set( 50, 50 );
app.ticker.add( delta => {
    titleText.rotation += 0.01 * ( 1 + delta );
});

app.stage.addChild( titleText );

const circle = new PIXI.Graphics()
.beginFill(0xf00000)
.drawCircle(0, 0, 20)
.endFill()

circle.position.set(100, 50);

circle.interactive = true;
circle.buttonMode = true;

circle.on('pointertap', showAlert);

function showAlert(e) {
    console.log(e);
    alert('circle was clicked')
}

app.stage.addChild( circle );

