// const { ipcRenderer } = require('electron');

// // Function to enable or disable mouse events for the overlay window
// function setIgnoreMouseEvents(ignore, options) {
//     ipcRenderer.send('set-ignore-mouse-events', ignore, options);
// }

// // Add event listeners to the li elements
// document.querySelectorAll('nav ul li').forEach(li => {
//     li.addEventListener('mouseenter', () => {
//         setIgnoreMouseEvents(false); // Enable mouse events when hovered
//     });

//     li.addEventListener('mouseleave', () => {
//         setIgnoreMouseEvents(true, { forward: true }); // Disable mouse events when not hovered
//     });
// });

const { ipcRenderer } = require('electron');

// Function to set the window on top
function setWindowOnTop(windowName, isOnTop) {
    ipcRenderer.send('set-window-on-top', windowName, isOnTop);
}

// Add event listener to the nav element
const nav = document.querySelector('nav');
// console.log('moro')
nav.addEventListener('mouseenter', (event) => {
    // console.log('moro')

    // if (event.target.tagName === 'LI') {
        setWindowOnTop('overlayWindow', true); // Set mainWindow on top when hovered
    // }
});

nav.addEventListener('mouseleave', (event) => {
    // if (event.target.tagName === 'LI') {
        setWindowOnTop('overlayWindow', false); // Remove mainWindow from top when not hovered
    // }
});