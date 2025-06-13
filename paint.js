import html2canvas from 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.esm.js'; 
const frame = document.querySelector('#canvas');
let toggle = false;
let colors = ["black", "red", "yellow", "blue", "green",  "orange", "purple", "pink", "white"];
let color = 0;

const board = document.querySelector('.message-board')
let messages = ["Doodle was made using HTML, CSS, and JS! The trifecta! The javascript contains event listeners for the document and pixel elements, allowing for precise user-inputs to draw to the canvas!",
  "Ilay is pretty cool.", "You can use the download button to save your doodle to your personal device :) ", "Shout-out Carl. ≽^•⩊•^≼", "Keep doodling.", "M︎y︎ f︎a︎t︎h︎e︎r︎ b︎e︎h︎o︎l︎d︎.︎ T︎h︎e︎ e︎n︎e︎m︎y︎'︎s︎ s︎h︎i︎p︎s︎ c︎a︎m︎e︎.︎ M︎y︎ c︎i︎t︎i︎e︎s︎ w︎e︎r︎e︎ b︎u︎r︎n︎e︎d︎ a︎n︎d︎ t︎h︎e︎y︎ d︎i︎d︎ e︎v︎i︎l︎ i︎n︎ m︎y︎ c︎o︎u︎n︎t︎r︎y︎.︎ A︎l︎l︎ m︎y︎ t︎r︎o︎o︎p︎s︎ a︎n︎d︎ c︎h︎a︎r︎i︎o︎t︎s︎ a︎r︎e︎ i︎n︎ t︎h︎e︎ l︎a︎n︎d︎ o︎f︎ H︎a︎t︎t︎i︎.︎ A︎n︎d︎ a︎l︎l︎ m︎y︎ s︎h︎i︎p︎s︎ a︎r︎e︎ i︎n︎ t︎h︎e︎ l︎a︎n︎d︎ o︎f︎ L︎u︎kka︎.︎ T︎h︎e︎ c︎o︎u︎n︎t︎r︎y︎ i︎s︎ a︎b︎a︎n︎d︎o︎n︎e︎d︎ t︎o︎ i︎t︎s︎e︎l︎f︎.︎", "Not your mother's paint app!",
  "Ilay certified.", "Yeah.", "Oh baby, give me one more chance (To show that I love you). Won't you please let me (Back in your heart).", "Your doodle is looking lovely.", "One might call this pixel art!", 
  "Training my doodle falcon to doodle... and catch field mice.", "RGB", "This message board is set on a javascript interval.", "Manipulating the document-object-model since '86.", "What happened to Monkey Troop Simulator??", "24x24 pixels! Maybe there will be an adjustable canvas if I come back to this...", "Check out my Python calculator and then offer me a FANG job pls." 
]
let message = 0;

/* SELECTING COLOR */
document.addEventListener("keydown",(event) => {
    const keyName = event.key;
    if (keyName === "Control") {
      toggle=false;
    }

    // Removes underline from current color box, changes color, adds underline to new color box
    if (keyName == "ArrowRight") {
      let currentColor = document.querySelector(`.${colors[color]}`);
      currentColor.classList.remove("current-color");
      color++;
      if (color >= colors.length) {
        color = 0;
      }
      currentColor = document.querySelector(`.${colors[color]}`);
      currentColor.classList.add("current-color");
    }
    if (keyName == "ArrowLeft") {
      let currentColor = document.querySelector(`.${colors[color]}`);
      currentColor.classList.remove("current-color");
      color--;
      if (color < 0) {
        color = (colors.length-1);
      }
      currentColor = document.querySelector(`.${colors[color]}`);
      currentColor.classList.add("current-color");
    }
});

document.addEventListener("mousedown", () => {
  toggle=true;
});
document.addEventListener("mouseup", () => {
  toggle=false;
});

/* CREATES CANVAS */
function createRow() {
  let row = document.createElement("div");
  row.classList.add("row");
  frame.appendChild(row);
  let i = 0;
  while (i < 24) {
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    row.appendChild(pixel);
    i++;
  }
}

function createCanvas() {
  let rows = 0;
  while (rows < 24) {
    createRow();
    rows++;
  }
}

createCanvas();

/* Event listeners and functions for COLORING */
const pixels = document.querySelectorAll(".pixel");

pixels.forEach((pixel) => {
  pixel.addEventListener("mouseover", () => {
    fillPixelHover(pixel);
  });
});

pixels.forEach((pixel) => {
  pixel.addEventListener("click", () => {
    fillPixel(pixel);
  });
});

function fillPixelHover(e) {
  if (toggle==true) {
    e.style.background = colors[color];
  }
}

function fillPixel(e) {
  e.style.background = colors[color];
}

/* MESSAGE BOARD */
const intervalId = setInterval(() => {
  let currentMessage = board.children;
  currentMessage[1].remove();
  let messageNum = (getRandomInt(messages.length));
  let p = document.createElement('p');
  p.innerText = messages[messageNum];
  p.classList.add("message");
  board.appendChild(p);
}, 4000); 

/* Download img */
const downloadbtn = document.querySelector('#download-btn');
downloadbtn.addEventListener('click', downloadCanvas);
async function downloadCanvas() {
  //Render an element using html2canvas, and then download that john
  html2canvas(frame, {}).then(async canvas => {
      // convert to PNG data URL
      downloadbtn.src = "assets/doodle/downloading.gif";
      const dataURL = canvas.toDataURL('image/png');

      // temporary download link 
      const link = document.createElement('a');
      link.download = 'my-doodle-art.png';
      link.href = dataURL;
      link.click();
      await new Promise(resolve => setTimeout(resolve, 4000));
      downloadbtn.src="assets/doodle/download.png"
    }).catch(err => {
      console.error('oops, html2canvas failed:', err);
    });
}