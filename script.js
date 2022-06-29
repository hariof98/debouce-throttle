const defaultRequest  = document.querySelector('.container__default');
const deboubceRequest = document.querySelector('.container__debounce');
const throttleRequest = document.querySelector('.container__throttle');

const defaultRequestApi  = document.querySelector('.container__button');

// Input
document.querySelector('.container__input').addEventListener("input", el => {
    defaultRequest.innerText = el.target.value;
    document.querySelector('.container__default__api').innerText = el.target.selectionStart;
    myDebounce(el.target.value);
    myThrottle(el.target.value);
});

// Button Click
defaultRequestApi.addEventListener("click", el => {
    document.querySelector('.container__default__api').innerText = el.detail;
    defaultRequest.innerText = el.detail;
    myDebounce(el.detail);
    myThrottle(el.detail);
})


const myDebounce = debounce((text) => {
    deboubceRequest.innerText = text;
});

const myThrottle = throttle((text) => {
    throttleRequest.innerText = text;
});

function debounce(callback, timeDelay= 1000){
    let timeout;
    let i = 0;

    return(...args) => {
        clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            callback(...args);
            i++;
            document.querySelector('.container__debounce__api').innerText = i;
        }, timeDelay);
    }
}

function throttle(callback, delay=1000){
    let isWaiting = false;
    let textCapture;
    let i = 0;

    return(...args) => {
        if (isWaiting) {
            textCapture  = args; // saving the arguments typed after the 1st second untill the delay is over 
            return
        }

        callback(...args);
        isWaiting = true; 
        i++;
        document.querySelector('.container__throttle__api').innerText = i;

        setTimeout(timeFunction, delay);
    }

    function timeFunction(){
        if(textCapture == null){
            isWaiting = false;
        }
        else{
            callback(...textCapture);
            textCapture = null;
            i++;
            document.querySelector('.container__throttle__api').innerText = i;
            setTimeout(timeFunction, delay);
        }
    }
}
