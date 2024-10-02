export const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
        callback(...args);
        }, wait);
    };
}

/*
Pour utiliser ensuite le debounce :

const fonctionDébouncée = debounce(fonction, 350);

document.addEventListener("mon input", fonctionDébouncée);
*/