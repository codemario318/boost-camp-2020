const {CPU, programToBits } = require('./CPU');
const asmbCodes = [
    'LOAD R1, R2, R3',
    'STORE R5, R3, R4',
    'LOAD R7, R2, #30',
    'AND R3, R1, R6',
    'ADD R4, R2, R5',
    'SUB R4, R6, #8',
    "MOV R4, #250",
];

const asmbRes = [
    '0001001010000011',
    '0011101011000100',
    '0010111010111110',
    '0101011001000110',
    '0111100010000101',
    '1010100110101000',
    '1011100011111010',
];

test("assambly decoder test", () => {
    asmbCodes.forEach((code,i) => {
        expect(programToBits(code)).toBe(asmbRes[i]);
    });
})
