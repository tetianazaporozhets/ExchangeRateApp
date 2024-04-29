const currencyOne = document.querySelector("#currency-one");
const amountOne = document.querySelector('.amount-one');
const currencyTwo = document.querySelector("#currency-two");
const amountTwo = document.querySelector('.amount-two');
const swapBtn = document.querySelector('.swap');
const rateInfo = document.querySelector('.rate-info');

const calculate = () => {
   fetch(`http://api.exchangerate.host/live?access_key=5aaeddd3f30cfda57bc6a9e65de2ac5a&source=${currencyOne.value}&currencies=${currencyTwo.value}&format=1`)
   .then(res => res.json())
   .then(data => {
      console.log(data)
      const currency1 = currencyOne.value;
      const currency2 = currencyTwo.value;
      
      const quote = data.quotes[`${currency1}${currency2}`];
      rateInfo.textContent = `1 ${currency1} = ${quote.toFixed(4)} ${currency2}`
      amountTwo.value = (amountOne.value * quote).toFixed(2)
   })
}

const swap = () => {
   const oldValue = currencyOne.value;
   currencyOne.value = currencyTwo.value;
   currencyTwo.value = oldValue;
   calculate();
}
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
swapBtn.addEventListener('click', swap);
calculate()



