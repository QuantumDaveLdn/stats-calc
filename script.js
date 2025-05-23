const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

const getMedian = (array) => {
  const sorted = array.slice().sort((a, b) => a - b);
  const median =
    sorted.length % 2 === 0
      ? getMean([sorted[sorted.length / 2], sorted[sorted.length / 2 - 1]])
      : sorted[Math.floor(sorted.length / 2)];
  return median;
}

const getMode = (array) => {
  const counts = {};
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  })
  if (new Set(Object.values(counts)).size === 1) {
    return null;
  }
  const highest = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  )[0];
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  );
  return mode.join(", ");
}

const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
}

const getVariance = (array) => {
  const mean = getMean(array);
  const variance = array.reduce((acc, el) => {
    const difference = el - mean;
    const squared = difference ** 2;
    return acc + squared;
  }, 0) / array.length;
  return variance;
}

const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
}

const formatNumber = (number) => {
    if (number === null || typeof number === "undefined") return "N/A";

    return Number.isInteger(number) ? number : number.toFixed(4);
};

const calculate = () => {
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));

  
  if (numbers.length === 0) {
    
    document.querySelector("#mean").textContent = '-';
    document.querySelector("#median").textContent = '-';
    document.querySelector("#mode").textContent = '-';
    document.querySelector("#range").textContent = '-';
    document.querySelector("#variance").textContent = '-';
    document.querySelector("#standardDeviation").textContent = '-';
  } else {
    
    const mean = getMean(numbers);
    const median = getMedian(numbers);
    const mode = getMode(numbers);
    const range = getRange(numbers);
    const variance = getVariance(numbers);
    const standardDeviation = getStandardDeviation(numbers);

    document.querySelector("#mean").textContent = formatNumber(mean);
    document.querySelector("#median").textContent = formatNumber(median);
    document.querySelector("#mode").textContent = mode; 
    document.querySelector("#range").textContent = formatNumber(range);
    document.querySelector("#variance").textContent = formatNumber(variance);
    document.querySelector("#standardDeviation").textContent = formatNumber(standardDeviation);
  }
};

document.addEventListener('DOMContentLoaded', () => { 
  const form = document.querySelector('form'); 
  if (form) { 
       form.addEventListener('submit', (event) => {
          event.preventDefault(); 
          calculate(); 
      });
  }

  
  const numbersInput = document.querySelector("#numbers");
   if(numbersInput) {
      numbersInput.addEventListener('input', () => {
           if (numbersInput.value.trim() === '') {
              document.querySelector("#mean").textContent = '-';
              document.querySelector("#median").textContent = '-';
              document.querySelector("#mode").textContent = '-';
              document.querySelector("#range").textContent = '-';
              document.querySelector("#variance").textContent = '-';
              document.querySelector("#standardDeviation").textContent = '-';
          }
      });
  }
});

