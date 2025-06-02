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
    if (win) win.remove();
  }
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
const aboutme = document.getElementById('open-aboutme');
const sweprojects = document.getElementById('open-sweprojects');
const aiprojects = document.getElementById('open-aiprojects');
const swetechstack = document.getElementById('open-swetechstack');
const aiinfo = document.getElementById('open-aiinfo');
const contacts = document.getElementById('open-contacts');
const credits = document.getElementById('open-credits');
const workexp = document.getElementById('open-workexp');
const closeall = document.getElementById('close-all');
const start = document.getElementById('start');

const container = document.getElementById('windows-frame');

/*
  Steps:
  1. Fetch html file --> return the content of the file in the result
  2. Manipulate dom, create container
  3. Inject html content into container
  4. Set the class name of the container, so there is no css bleed
*/

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

start.addEventListener('click', () => {
  closeAll();
  displayAboutMe();
  displayAIInfo();
  displaySWETech();
});

aboutme.addEventListener('dblclick', () => {
  displayAboutMe();
});

contacts.addEventListener('dblclick', () => {
  const contactsExists = document.querySelector('.contacts-window');
  if (!contactsExists) {
    fetch('windows/contacts.html') 
      .then(res => {
        if (!res.ok) throw new Error('Network error:' + res.status);
        return res.text();
      })
      .then(htmlString => {
        // create a wrapper div (or whatever tag you want)
        const wrapper = document.createElement('div');
        // inject the fetched HTML
        wrapper.innerHTML = htmlString;
        wrapper.classList.add('contacts-window');
        // append it to the container
        container.appendChild(wrapper);
      })
      .catch(err => console.error('Failed to load x.html:', err));
  }
});

swetechstack.addEventListener('dblclick', () => {
  displaySWETech();
});

aiinfo.addEventListener('dblclick', () => {
  displayAIInfo();
});

sweprojects.addEventListener('dblclick', () => {
  displaySWEProjects();
});

aiprojects.addEventListener('dblclick', () => {
  displayAIProjects();
});

credits.addEventListener('dblclick', () => {
  const creditsExists = document.querySelector('.credits-window');
  if (!creditsExists) {
    fetch('windows/thispage.html') 
      .then(res => {
        if (!res.ok) throw new Error('Network error:' + res.status);
        return res.text();
      })
      .then(htmlString => {
        // create a wrapper div (or whatever tag you want)
        const wrapper = document.createElement('div');
        // inject the fetched HTML
        wrapper.innerHTML = htmlString;
        wrapper.classList.add('credits-window');
        // append it to the container
        container.appendChild(wrapper);
      })
      .catch(err => console.error('Failed to load x.html:', err));
  }
});

workexp.addEventListener('dblclick', () => {
  const workexpExists = document.querySelector('.workexp-window');
  if (!workexpExists) {
    fetch('windows/workexp/syngin.html') 
      .then(res => {
        if (!res.ok) throw new Error('Network error:' + res.status);
        return res.text();
      })
      .then(htmlString => {
        // create a wrapper div (or whatever tag you want)
        const wrapper = document.createElement('div');
        // inject the fetched HTML
        wrapper.innerHTML = htmlString;
        wrapper.classList.add('workexp-window');
        // append it to the container
        container.appendChild(wrapper);
      })
      .catch(err => console.error('Failed to load x.html:', err));
  }
});

/* DISPLAY START WINDOWS */
function displayAboutMe() {
  const aboutmeExists = document.querySelector('.aboutme-window');
  if (!aboutmeExists) {
    fetch('windows/aboutme.html') 
      .then(res => {
        if (!res.ok) throw new Error('Network error:' + res.status);
        return res.text();
      })
      .then(htmlString => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = htmlString;
        wrapper.classList.add('aboutme-window');
        container.appendChild(wrapper);
      })
      .catch(err => console.error('Failed to load x.html:', err));
  }
}

function displayAIInfo() {
  const aiInfoExists = document.querySelector('.aiinfo-window');
  if (!aiInfoExists) {
    fetch('windows/aiinfo.html') 
      .then(res => {
        if (!res.ok) throw new Error('Network error:' + res.status);
        return res.text();
      })
      .then(htmlString => {
        // create a wrapper div (or whatever tag you want)
        const wrapper = document.createElement('div');
        // inject the fetched HTML
        wrapper.innerHTML = htmlString;
        wrapper.classList.add('aiinfo-window');
        // append it to the container
        container.appendChild(wrapper);

        const projLink = wrapper.querySelector('.projects-link a');
        projLink.addEventListener('click', e => {
          e.preventDefault();
          displayAIProjects();       // your function to tear down .aiinfo-window & load aiprojects
        });
      })
      .catch(err => console.error('Failed to load x.html:', err));
  }
}

function displaySWETech() {
  const swetechExists = document.querySelector('.swetech-window');
  if (!swetechExists) {
    fetch('windows/swetech.html') 
      .then(res => {
        if (!res.ok) throw new Error('Network error:' + res.status);
        return res.text();
      })
      .then(htmlString => {
        // create a wrapper div (or whatever tag you want)
        const wrapper = document.createElement('div');
        // inject the fetched HTML
        wrapper.innerHTML = htmlString;
        wrapper.classList.add('swetech-window');
        // append it to the container
        container.appendChild(wrapper);

        const projLink = wrapper.querySelector('.projects-link a');
        projLink.addEventListener('click', e => {
          e.preventDefault();
          displaySWEProjects();       // your function to tear down .aiinfo-window & load aiprojects
        });
      })
      .catch(err => console.error('Failed to load x.html:', err));
  } 
}


/* DISPLAY PROJECTS */
function displayAIProjects() {
  const aiProjectsExists = document.querySelector('.aiprojects-window');
  if (!aiProjectsExists) {
    const aiInfoExists = document.querySelector('.aiinfo-window');
    if (aiInfoExists) {
      aiInfoExists.remove();
    }
    fetch('windows/aiprojects/astar.html') 
      .then(res => {
        if (!res.ok) throw new Error('Network error:' + res.status);
        return res.text();
      })
      .then(htmlString => {
        // create a wrapper div (or whatever tag you want)
        const wrapper = document.createElement('div');
        // inject the fetched HTML
        wrapper.innerHTML = htmlString;
        wrapper.classList.add('aiprojects-window');
        // append it to the container
        container.appendChild(wrapper);
      })
      .catch(err => console.error('Failed to load x.html:', err));
  }
}

function displaySWEProjects() {
  const sweProjectsExists = document.querySelector('.sweprojects-window');
  if (!sweProjectsExists) {
    const swetechExists = document.querySelector('.swetech-window');
    if (swetechExists) {
      swetechExists.remove();
    }
    fetch('windows/sweprojects/bytes.html') 
      .then(res => {
        if (!res.ok) throw new Error('Network error:' + res.status);
        return res.text();
      })
      .then(htmlString => {
        // create a wrapper div (or whatever tag you want)
        const wrapper = document.createElement('div');
        // inject the fetched HTML
        wrapper.innerHTML = htmlString;
        wrapper.classList.add('sweprojects-window');
        // append it to the container
        container.appendChild(wrapper);
      })
      .catch(err => console.error('Failed to load x.html:', err));
  }
}

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

