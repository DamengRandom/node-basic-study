console.log('rendered js file ...');

// fetch('http://puzzle.mead.io/puzzle').then(res => {
//   return res.json().then(data => console.log('response', data));
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageZero = document.querySelector('#message-0');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', event => {
  event.preventDefault();
  const location = search.value;
  messageZero.textContent = 'loading ..';
  messageOne.textContent = '';

  fetch(`/weather?location=${location}`).then(res => {
    return res.json().then(data => {
      try {
        messageZero.textContent = '';
        const loc = data.location;
        messageOne.textContent=`location is ${loc}, and temperature is ${data.forecast.apparentTemperature} degree.`;
      } catch(error) {
        messageTwo.textContent = `Error: ${error}`;
        return error;
      }
    });
  });
});
