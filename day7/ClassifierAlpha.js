const factors = (number) => {
    const isFactor = (potentialFactor) => number % potentialFactor === 0;
    const factorSet = new Set();

    for (let pod = 1; pod <= Math.sqrt(number); pod++) {
        if (isFactor(pod)) {
            factorSet.add(pod);
            factorSet.add(number / pod);
        }
    }
    return factorSet;
}

const sum = (factors) => Array.from(factors).reduce((acc, cur) => acc + cur);

const isPerfect = (number) => sum(factors(number)) - number === number;
const isAbundant = (number) => sum(factors(number)) - number > number;
const isDeficient = (number) => sum(factors(number)) - number < number;

module.exports = {
    isPerfect,
    isAbundant,
    isDeficient,
    factors,
    sum, 
}
