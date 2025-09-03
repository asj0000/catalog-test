const fs = require("fs");

// Step 1: Read the JSON file
const data = JSON.parse(fs.readFileSync("input.json", "utf8"));
// Hardcoded data
// const data = {
//   "keys": {
//     "n": 4,
//     "k": 3
//   },
//   "1": {
//     "base": "10",
//     "value": "4"
//   },
//   "2": {
//     "base": "2",
//     "value": "111"
//   },
//   "3": {
//     "base": "10",
//     "value": "12"
//   },
//   "6": {
//     "base": "4",
//     "value": "213"
//   }
// };

// Extract n and k
const { n, k } = data.keys;

// Step 1: Collect available points
let points = [];
for (const key of Object.keys(data)) {
  if (key !== "keys") {
    const item = data[key];
    const base = parseInt(item.base);
    const valueStr = item.value;
    const value = BigInt(parseInt(valueStr, base)); // convert to decimal
    points.push([BigInt(key), value]); // x = key, y = value
  }
}

// Sort points by x to keep order consistent
points.sort((a, b) => (a[0] < b[0] ? -1 : 1));

// Step 2: Lagrange Interpolation constant term
function lagrangeInterpolationAtZero(points, k) {
  let result = 0n;

  for (let i = 0; i < k; i++) {
    let [xi, yi] = points[i];
    let term = yi;

    for (let j = 0; j < k; j++) {
      if (i !== j) {
        let [xj] = points[j];
        term = term * (-xj) / (xi - xj); // Lagrange basis at x=0
      }
    }

    result += term;
  }

  return result;
}
// Step 4: Get the constant C
const constantC = lagrangeInterpolationAtZero(points, k);

console.log(constantC.toString());
