import { Notify } from "notiflix";

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', getInputData);

function getInputData(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;

  let delayValue = +delay.value;
  const stepValue = +step.value;
  const amountValue = +amount.value;

  if (delayValue < 0 || amountValue < 0 || stepValue < 0) {
    Notify.warning('input ">0" values');
    return;
  }

  registerPromise(delayValue, stepValue, amountValue);
  event.currentTarget.reset();
}


function registerPromise(delay, step, amount) {
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((response, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        response({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}