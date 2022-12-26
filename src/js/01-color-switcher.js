const refs = {
    startBtn : document.querySelector('[data-start]'),
    stopBtn : document.querySelector('[data-stop]'),
    bodyRef : document.querySelector('body'),
}
let switchInterval = null;
refs.startBtn.addEventListener('click', onColorSwitch);
refs.stopBtn.addEventListener('click', onColorStop)

const changeBodyColor = () => {
    refs.bodyRef.style.backgroundColor = getRandomHexColor();
}

function onColorSwitch () {
    changeBodyColor();
    switchInterval = setInterval(()=> {
        changeBodyColor();
    }, 1000);
    refs.startBtn.disabled = true;
}

function onColorStop () {
    clearInterval(switchInterval);
    refs.startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}