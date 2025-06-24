/* GUI Resizing for different screens */
const DESIGN_WIDTH = 1280;
const DESIGN_HEIGHT = 595;

function updateScaleFactor() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const fitByWidth = vw / DESIGN_WIDTH;
  const fitByHeight = vh / DESIGN_HEIGHT;

  let scale = Math.min(fitByWidth, fitByHeight, 3);

  // Clamp so it never gets bigger than 3x (no zoom-in on ginormous screens):
  scale = Math.min(3, scale);

  // Write to root CSS variable
  document.documentElement.style.setProperty('--scale', scale);
}

// Run once on load or whenever screen is resized
updateScaleFactor();
window.addEventListener('resize', updateScaleFactor);



/* LOAD WELCOME */
const mainwindow = document.getElementById('windows-frame');

window.addEventListener("DOMContentLoaded", () => { 
  fetch('windows/welcome.html') 
    .then(res => {
      if (!res.ok) throw new Error('Network error:' + res.status);
      return res.text();
    })
    .then(htmlString => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = htmlString;
      wrapper.classList.add('welcome-window');
      container.appendChild(wrapper);
    })
    .catch(err => console.error('Failed to load x.html:', err));
});


/* CLOSE BUTTONS */
const closeBtns = document.querySelectorAll('.Close');


mainwindow.addEventListener('click', e => {
  if (e.target.matches('.Close')) {
    const win = e.target.closest('.Outer-window').parentElement;
    if (win.classList.contains('paint-window')) {
      const paintScript = document.querySelector("#paintScript");
      paintScript.remove();
    }
    if (win) win.remove();
  }
});

const closeall = document.getElementById('close-all');
function closeAll() {
  const children = document.getElementById('windows-frame').children;
  console.log(children.length);
  for (let i=0; i < children.length; i++) {
    const child = children[i];
    console.log(child);
    if (!child.classList.contains('essentials')) {
      child.remove();
      i--;
    }
  }
}
closeall.addEventListener('click', () => {
  closeAll();
});

/* SOUND EFFECTS */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const click1 = new Audio("assets/sounds/mouseClick1.mp3");
const click2 = new Audio("assets/sounds/mouseClick2.mp3");
const dblClick1 = new Audio("assets/sounds/mouseDoubleClick1.mp3");
const dblClick2 = new Audio("assets/sounds/mouseDoubleClick2.mp3");
const delay = 200; // Differentiates between clicks and double clicks

mainwindow.addEventListener('click', e => {
  clickTimer = setTimeout(() => {
    const random = getRandomInt(2);
    if (random == 1) {
      click1.play();
    } else {
      click2.play();
    }
  }, delay);
});

mainwindow.addEventListener('dblclick', e => {
  clearTimeout(clickTimer);
  const random = getRandomInt(2);
  if (random == 1) {
    dblClick1.play();
  } else {
    dblClick2.play();
  }
});



/* Shortcut Openers*/

const painter = document.getElementById('open-painter');
const start = document.getElementById('start');
const container = document.getElementById('windows-frame');


start.addEventListener('click', () => {
  closeAll();
  openWindow({triggerId: 'open-aboutme', windowClass: 'aboutme-window', htmlPath: 'windows/aboutme.html'});
  openWindow({triggerId: 'open-aiinfo', windowClass: 'aiinfo-window', htmlPath: 'windows/aiinfo.html'});
  openWindow({triggerId: 'open-swetechstack', windowClass: 'swetech-window', htmlPath: 'windows/swetech.html'});
});

/*
  Steps:
  1. Fetch html file --> return the content of the file in the result
  2. Manipulate dom, create container
  3. Inject html content into container
  4. Set the class name of the container, so there is no css bleed
*/
function addWindowOpener({triggerId, windowClass, htmlPath}) {
  const trigger = document.getElementById(triggerId);
  if (!trigger) {
    console.warn(`Shortcut with ID "${triggerId}" not found.`);
    return;
  }
  trigger.addEventListener('dblclick', () =>{
    openWindow({triggerId, windowClass, htmlPath});
  }); 
}
function openWindow({triggerId, windowClass, htmlPath}) {
  //Ensure window is not already opened
  if (!document.querySelector(`.${windowClass}`)) {
    if (triggerId == 'open-aiprojects'){
      const aiInfoExists = document.querySelector('.aiinfo-window');
      if (aiInfoExists) {
        aiInfoExists.remove();
      }
    }
    if (triggerId == 'open-sweprojects') {
      const swetechExists = document.querySelector('.swetech-window');
      if (swetechExists) {
        swetechExists.remove();
      }
    }
    fetch(htmlPath)
    .then(res => {
      if (!res.ok) throw new Error('Network error: ' + res.status);
      return res.text();
    })
    .then(htmlString => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = htmlString;
      wrapper.classList.add(windowClass);
      container.appendChild(wrapper);

      if (triggerId == 'open-swetechstack'){
        addProjectLink(wrapper, true);
      }
      if (triggerId == 'open-aiinfo') {
        addProjectLink(wrapper, false);
      }
    })
    .catch(err => console.error(`Failed to load ${htmlPath}:`, err));
  }
}

function addProjectLink(wrapper, swe) {
  const projLink = wrapper.querySelector('.projects-link a');
  projLink.addEventListener('click', e => {
    e.preventDefault();
    if (swe) {
      openWindow({triggerId: 'open-sweprojects', windowClass: 'sweprojects-window', htmlPath:'windows/sweprojects/bytes.html'});
    } else {
      openWindow({triggerId: 'open-aiprojects', windowClass: 'aiprojects-window', htmlPath: 'windows/aiprojects/astar.html'});
    }
  });
  
}

addWindowOpener({
  triggerId: 'open-credits',
  windowClass: 'credits-window',
  htmlPath: 'windows/thispage.html'
})
addWindowOpener({
  triggerId: 'open-workexp',
  windowClass: 'workexp-window',
  htmlPath: 'windows/workexp/syngin.html'
});
addWindowOpener({
  triggerId: 'open-swetechstack',
  windowClass: 'swetech-window',
  htmlPath: 'windows/swetech.html'
})
addWindowOpener({
  triggerId: 'open-aiinfo',
  windowClass: 'aiinfo-window',
  htmlPath: 'windows/aiinfo.html'
})
addWindowOpener({
  triggerId: 'open-sweprojects',
  windowClass: 'sweprojects-window',
  htmlPath: 'windows/sweprojects/bytes.html'
})
addWindowOpener({
  triggerId: 'open-aiprojects',
  windowClass: 'aiprojects-window',
  htmlPath: 'windows/aiprojects/astar.html'
})
addWindowOpener({
  triggerId: 'open-contacts',
  windowClass: 'contacts-window',
  htmlPath: 'windows/contacts.html'
})
addWindowOpener({
  triggerId: 'open-aboutme',
  windowClass: 'aboutme-window',
  htmlPath: 'windows/aboutme.html'
})

painter.addEventListener('dblclick', () => {
  const paintExists = document.querySelector('.paint-window');
  if (!paintExists) {
    fetch('windows/apps/paint.html') 
      .then(res => {
        if (!res.ok) throw new Error('Network error:' + res.status);
        return res.text();
      })
      .then(htmlString => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = htmlString;
        wrapper.classList.add('paint-window');
        const appScript = document.createElement('script');
        appScript.src = 'paint.js';
        appScript.id = 'paintScript';
        appScript.type = 'module';
        appScript.src  = `paint.js?cb=${Date.now()}`; //Cache busting; alternatively I could add an init function to my module, check if it exists, and run that. But tbh this is a toy-feature that I would not like to spend more time on. Got bigger fish to fry
        
        container.appendChild(wrapper);
        container.appendChild(appScript);
      })
      .catch(err => console.error('Failed to load x.html:', err));
  }
});

/* SCROLL BUTTON FUNCTIONALITY */
document.getElementById('windows-frame').addEventListener('click', async e => {
  // if the user clicked *inside* an element with class="page-selector":
  const btn = e.target.closest('.page-selector');
  
  if (!btn) return;        // ignore all other clicks
  e.preventDefault();

  const url = btn.dataset.url;
  if (!url) {
    console.error('no window data assigned to this page selector');
    return; 
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const doc = new DOMParser().parseFromString(text, 'text/html');
    const incoming = doc.querySelector('.Outer-window');
    if (!incoming) {
      console.error('fetched HTML has no outer window to store content');
      return;
    }
    const section = btn.closest('.sweprojects-window, .aiprojects-window, .workexp-window');
    if (!section) {
      console.error('Button not inside .swe-projects or .ai-projects or .workexp');
      return;
    }
    
    let windowSel;
    if (section.classList.contains('sweprojects-window')) {
      windowSel = '.sweprojects-window';
    } else if (section.classList.contains('aiprojects-window')) {
      windowSel = '.aiprojects-window';
    } else if (section.classList.contains('workexp-window')) {
      windowSel = '.workexp-window';
    } else {
      console.error("Despite the button being inside one of our 3 classes, it is not contained in parent elements class list. Check syntax");
      return;
    }
    console.log(windowSel);

    const currentContainer = document.querySelector(windowSel + ' .Outer-window');

    if (!currentContainer) {
      console.error('current page has no .sweprojects-window container');
      return;
    }
    currentContainer.innerHTML = incoming.innerHTML;

  } catch(err) {
    console.error('error loading project page:', err);
  }
});

