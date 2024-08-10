const express = require('express');
const path = require('path');
const app = express();
const port =  process.env.PORT || 4000; // have to change this to a range within 5000- 5500 when connected to the Encs server

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) =>{
	res.sendFile(path.join(__dirname, 'A3Q1.html'));
	
});


// Function A: findSummation
app.get("/F1", (req, res) => {
  const n = parseInt(req.query.n);
  if (isNaN(n) || n <= 0) {
    return res.send(false);
  }
  const summation = (n * (n + 1)) / 2;
  res.send(String(summation));
});

// Function B: uppercaseFirstandLast
app.get("/F2", (req, res) => {
  const str = req.query.str;
  if (typeof str !== 'string') {
    return res.send(false);
  }
  const result = str.split(' ').map(word => {
    if (word.length > 1) {
      return word[0].toUpperCase() + word.slice(1, -1) + word[word.length - 1].toUpperCase();
    }
    return word.toUpperCase();
  }).join(' ');
  res.send(result);
});

// Function C: findAverageAndMedian
app.get("/F3", (req, res) => {
  const numbers = req.query.numbers.split(',').map(Number);
  if (numbers.some(isNaN)) {
    return res.send(false);
  }
  const average = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  numbers.sort((a, b) => a - b);
  const median = numbers.length % 2 === 0 ?
    (numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2]) / 2 :
    numbers[Math.floor(numbers.length / 2)];
  res.send({ average, median });
});

// Function D: find4Digits
app.get("/F4", (req, res) => {
  const str = req.query.str;
  if (typeof str !== 'string') {
    return res.send(false);
  }
  const fourDigitNumber = str.split(' ').find(num => num.length === 4 && !isNaN(num));
  res.send(fourDigitNumber || false);
});


app.listen(port, ()=>{
	console.log(`Server running at http://localhost:${port}`) // change to encs287.concordia.ca:port
	
});

