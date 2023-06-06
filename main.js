//getting canvas with ID
const canvas = document.getElementById("canvas");

//assigning canvas api to a variable
const c = canvas.getContext("2d");

//canvas width and height 
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;


//assiging the width and height of the canvas to the window inner width and height
canvas.width = windowWidth;
canvas.height = windowHeight;
//the center of the screen
let xC = windowWidth / 2;
let yC = windowHeight / 2;


//planets data

let earthAngle = Math.random() * Math.PI * 2;
let marsAngle = Math.random() * Math.PI * 2;

//earth distance from sun = 147.48 Milinon Km
//mars distance from sun = 322.11 Milinon Km

let earthDistance = 147.48 / 1.5;
let marsDistance = 322.11 / 1.5;


let earthXAxis = xC + Math.cos(earthAngle) * earthDistance;
let earthYAxis = yC + Math.sin(earthAngle) * earthDistance;

let marsXAxis = xC + Math.cos(marsAngle) * marsDistance;
let marsYAxis = yC + Math.sin(marsAngle) * marsDistance;

let sunRadius = 35;
let earthRadius = 25;
let marsRadius = 5;
let earthVelocity = 0.108 / 3;
let marsVelocity = 0.0748 / 3;


let sunImage = document.createElement('img');
sunImage.src = "sun.png";

let earthImage = document.createElement('img');
earthImage.src = "mars.png"

function sun() {
    c.beginPath();
    // c.fillStyle = "rgb(233, 161, 84)";
    // c.arc(xC, yC, sunRadius, 0, Math.PI * 2, false);
    // c.fill();
    c.drawImage(sunImage, xC - 40, yC - 40, 80, 80)
}

//earth speed arround the sun is 108000 KM/h
//mars speed arround the sun is 86871 KM/h
//108000/86871 = 1.24
let multiplier = 1.24;

let linesArr = [];


class movementLines {
    constructor() {
        this.earthX = earthXAxis;
        this.earthY = earthYAxis;
        this.marsX = marsXAxis;
        this.marsY = marsYAxis;
    }
}

function Simulation() {
    //drawing planets on screen
    c.beginPath();
    c.drawImage(earthImage, earthXAxis - earthRadius / 2, earthYAxis - earthRadius / 2, earthRadius, earthRadius)

    c.beginPath();
    c.fillStyle = "orange";
    c.arc(marsXAxis, marsYAxis, marsRadius, 0, Math.PI * 2, false);
    c.fill();

    //simulation part

    //planets angle 
    earthAngle += earthVelocity;
    marsAngle += marsVelocity;

    earthXAxis = xC + Math.sin(earthAngle) * earthDistance;
    earthYAxis = yC + Math.cos(earthAngle) * earthDistance;
    marsXAxis = xC + Math.sin(marsAngle) * marsDistance;
    marsYAxis = yC + Math.cos(marsAngle) * marsDistance;
    linesArr.push(new movementLines());

}

function Orbits() {
    c.beginPath();
    c.strokeStyle = "white";
    c.arc(xC, yC, earthDistance, 0, Math.PI * 2, false);
    c.stroke();

    c.beginPath();

    c.arc(xC, yC, marsDistance, 0, Math.PI * 2, false);
    c.stroke();
}


function drawLines() {
    for (let i = 0; i < linesArr.length; i++) {
        c.beginPath();
        c.strokeStyle = "white";
        c.lineWidth = 0.5;
        c.moveTo(linesArr[i].earthX, linesArr[i].earthY);
        c.lineTo(linesArr[i].marsX, linesArr[i].marsY)
        c.stroke();
    }

    if (linesArr.length > 2500)
        linesArr = [];
}


console.log(linesArr)


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, windowWidth, windowHeight);
    drawLines();
    Simulation();
    Orbits()
    sun();
}

animate();