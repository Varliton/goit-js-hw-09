import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import  { Notify } from 'notiflix';
const timerRef = document.querySelector('.timer').children;

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
let timerInterval = null;

let dateTimePicker = flatpickr('#datetime-picker', 
    {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < new Date()) {
        Notify.failure('Please choose a date in the future');
      } else {
          startBtn.disabled = false;
    };
  },
})

startBtn.addEventListener('click', () => {
    timerInterval = setInterval(onStartTimer, 1000, dateTimePicker, timerRef);
});

function onStartTimer(date, elementsRef) {
    const currentTime = new Date();
    const startTime = convertMs(
        date.selectedDates[0].getTime() - currentTime.getTime()
    );
    onUpdateTimer(elementsRef, startTime)
}

function onUpdateTimer(elements, obj) {
    elements[0].firstElementChild.textContent = addLeadingZero(obj.days);
    elements[1].firstElementChild.textContent = addLeadingZero(obj.hours);
    elements[2].firstElementChild.textContent = addLeadingZero(obj.minutes);
    elements[3].firstElementChild.textContent = addLeadingZero(obj.seconds);
    if (Object.values(obj).every(el => el == 0)) {
      clearInterval(timerRef);
      Notify.success('The countdown is complete');
    }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value < 10) {
    return value.toString().padStart(2, 0);
  }
  return value;
}



import { Notify } from 'notiflix';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const firstDelay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));

  for (i = 0, i < formData.get('amount'); (i += 1); ) {
    createPromise(i + 1, firstDelay + i * step)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({}) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
