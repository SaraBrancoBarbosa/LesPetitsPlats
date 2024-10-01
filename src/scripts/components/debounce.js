// Ecrire trois caractères minimum pour lancer la recherche
export function setInputField(inputValue) {
  if(inputValue.length >= 3){
      // Commencer la recherche
  } else {
      // Laisser comme tel
  }
}

export const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
        callback(...args);
        }, wait);
    };
}

// Pour utiliser ensuite le debounce :
/*

const handleMouseMove = debounce((mouseEvent) => {
  // Do stuff with the event!
}, 350);

document.addEventListener('mousemove', handleMouseMove);    // Add listener
document.removeEventListener('mousemove', handleMouseMove); // Remove listener

*/