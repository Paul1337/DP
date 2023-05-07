export function debounce(func, delay) {
    let lastTime = null;
    let timerID = null;

    return function inner() {
        const now = performance.now();
        if (!lastTime || now - lastTime >= delay) {
            func.apply(this, arguments);
            lastTime = performance.now();
        } else {
            if (timerID) clearInterval(timerID);
            timerID = setTimeout(() => {
                func.apply(this, arguments);
                lastTime = performance.now();
            }, now - lastTime);
        }
    };
}
