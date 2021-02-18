const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const color = document.getElementsByClassName("controls__color");
const range = document.getElementById("jsRange");
const fillBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INIT_COLOR = "black";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
canvas.width = 600;
canvas.height = 400;
ctx.strokeStyle = INIT_COLOR;
ctx.fillStyle = INIT_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;


function changeColor(event) {
    const colorToChange = event.target.style.backgroundColor;
    ctx.strokeStyle = colorToChange;
    ctx.fillStyle = ctx.strokeStyle;
}

function startPainting(event) {
    if (event.button === 0) {
        painting = true;

        if (filling) {
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (painting) {
        ctx.lineTo(x, y); // x, y 이동
        ctx.stroke(); // 그리기
    } else {
        ctx.beginPath(); // path 초기화
        ctx.moveTo(x, y); // x, y 시작점 세팅

    }
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleFill(event) {
    if (filling) {
        filling = false;
        fillBtn.innerText = "PAINT";
    } else {
        filling = true;
        fillBtn.innerText = "FILL";
    }

}

function handleRC(event) {
    event.preventDefault();
}

function handleSave(event) {
    const URL = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = URL;
    link.download = "mypaint";
    link.click();
}

Array.from(color).forEach(color => color.addEventListener("click", changeColor));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (fillBtn) {
    fillBtn.addEventListener("click", handleFill);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSave);
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", handleRC);
}
