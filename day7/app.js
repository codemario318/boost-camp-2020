const {
    factors,
    sum
} = require('./NumberClassifier');

function app(n) {
    function makeClassifierLog(number) {
        function ClassifierAlpha() {
            const isPerfect = () => sumOfFactors - number === number;
            const isAbundant = () => sumOfFactors - number > number;
            const isDeficient = () => sumOfFactors - number < number;

            if (isPerfect()) {
                return 'Perfect';
            }
            else if (isAbundant()) {
                return 'Abundant';
            }
            else if (isDeficient()) {
                return 'Deficient';
            }
        }
        const isPrime = () => (factorArr.length == 2) ? 'Prime' : '';

        const factorArr = factors(number),
            sumOfFactors = sum(factorArr);

        return `${number} : ${ClassifierAlpha()}, ${isPrime(factorArr.size)}`
    }
    return Array(n - 1).fill().map((_, i) => i + 2).map(index => makeClassifierLog(index)).reduce((prev, cur) => `${prev}\n${cur}`);
}

console.log(app(100));