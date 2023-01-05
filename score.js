const readFile = fs.readFileSync('animals.json');
const parsedData = JSON.parse(readFile);
function animals(chickens, cows, pigs) {
    chickenLegs = chickens * 2;
    cowLegs = cows * 4;
    pigLegs = pigs * 4;
    legTotal = chickenLegs + cowLegs + pigLegs;
    return legTotal;
}
let score = animals(12,21,6);
console.log(score);
let json = JSON.stringify(score);
alert(typeof json); 
alert(json);
