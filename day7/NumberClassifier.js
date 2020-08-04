const factors = (number) => {
    const isFactor = (potentialFactor) => number % potentialFactor === 0;
    return Array(number).fill().map((_, i) => i + 1).filter(v => isFactor(v));
}
const sum = (factors) => factors.reduce((acc, cur) => acc + cur);
const isPerfect = (number) => sum(factors(number)) - number === number;
const isAbundant = (number) => sum(factors(number)) - number > number;
const isDeficient = (number) => sum(factors(number)) - number < number;
const isPrime = (number) => factors(number).length == 2;

module.exports = {
    isPerfect,
    isAbundant,
    isDeficient,
    isPrime,
    factors,
    sum,
}
