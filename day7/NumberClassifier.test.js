const { isPerfect, isAbundant, isDeficient, isPrime, factors, sum } = require('./NumberClassifier');

test("factors test", () => {
    const factors10 = [1, 2, 5, 10];

    expect(sum(factors(10))).toBe(18);
    expect(sum(factors(6))).toBe(12);

    expect(factors(10)).toEqual(factors10);
});

test("isPerfect test", () => {
    expect(isPerfect(10)).toBeFalsy();
    expect(isPerfect(6)).toBeTruthy();
});

test("isAbundant test", () => {
    expect(isAbundant(10)).toBeFalsy();
    expect(isAbundant(6)).toBeFalsy();
});

test("isDeficient test", () => {
    expect(isDeficient(10)).toBeTruthy();
    expect(isDeficient(6)).toBeFalsy();
});

test("isPrime Test", () => {
    expect(isPrime(10)).toBeFalsy();
    expect(isPrime(7)).toBeTruthy();
})
