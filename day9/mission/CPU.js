const cheatSheet = {
    'LOAD_REG':'0001',
    'LOAD_VAL':'0010',
    'STORE_REG':'0011',
    'STORE_VAL':'0100',
    'AND':'0101',
    'OR':'0110',
    'ADD_REG':'0111',
    'ADD_VAL':'1000',
    'SUB_REG':'1001',
    'SUB_VAL':'1010',
    'MOV':'1011',
    'R1':'001',
    'R2':'010',
    'R3':'011',
    'R4':'100',
    'R5':'101',
    'R6':'110',
    'R7':'111',
}

class CPU {
    constructor(program) {
        this.memory = new Map();
        this.load(programs);
    }

    ControlUnit() {
        while (this.PC != this.programs.length) {
            const program = this.fetch();
            this.execute(program);
            this.dump();
        }
        this.reset();
        this.dump();
    }

    load(programs) {
        this.reset();
        this.programs = programs;
        this.ControlUnit();
    }

    reset() {
        this.memory = new Map();
        this.REGISTER = new Array(8).fill(0);
        this.PC = 0;
    }

    fetch() {
        return this.programs[this.PC++];
    }

    execute(program) {
        const finder = (cmd) => {
            let res;
            if (cmd === '1011') res = [program.slice(4,7), program.slice(7,16)];
            else if (program[10] === '1') res =  [program.slice(4,7), program.slice(7,10), program.slice(11,16)];
            else res = [program.slice(4,7), program.slice(7,10), program.slice(13,16)];
            
            return res.map((b,_) => parseInt(b,2));
        }
        const calc_reg = (base, offset) => this.REGISTER[base] + this.REGISTER[offset];
        const calc_val = (base, val) => this.REGISTER[base] + val;

        const cmd = program.slice(0,4);
        const [dst, base, offset] = finder(cmd);
        console.log(cmd, dst, base, offset);
        if (cmd === '1011') {
            this.REGISTER[dst] = base;
        } else if (cmd === '0001') {
            const mem = calc_reg(base, offset);
            this.REGISTER[dst] = (this.memory.has(mem))? this.memory[mem]:0;
        } else if (cmd === '0010') {
            const mem = calc_val(base, offset);
            this.REGISTER[dst] = (this.memory.has(mem))? this.memory[mem]:0
        } else if (cmd === '0011') {
            const key = this.REGISTER[dst];
            const val = calc_reg(base, offset);
            this.memory[key] = val;
        } else if (cmd === '0100') {
            const key = this.REGISTER[dst];
            const val = calc_val(base, offset);
            this.memory[key] = val;
        } else {
            this.ALU(cmd, dst, base, offset)
        }
    }

    dump() {
        console.log(this.REGISTER.slice(1,));
        console.log(this.memory);
    }

    ALU(cmd, dst, base, offset) {
        const AND = (base, offset) => this.REGISTER[base] & this.REGISTER[offset];
        const OR = (base, offset) => this.REGISTER[base] | this.REGISTER[offset];
        const ADD_VAL = (base, offset) => this.REGISTER[base] + offset;
        const ADD_REG = (base, offset) => this.REGISTER[base] + this.REGISTER[offset];
        const SUB_VAL = (base, offset) => this.REGISTER[base] - offset;
        const SUB_REG = (base, offset) => this.REGISTER[base] - this.REGISTER[offset];

        switch (cmd) {
            case '0101':
                this.REGISTER[dst] = AND(base, offset);
                break;
            case '0110':
                this.REGISTER[dst] = OR(base, offset);
                break;
            case '0111':
                this.REGISTER[dst] = ADD_REG(base, offset);
                break;
            case '1000':
                this.REGISTER[dst] = ADD_VAL(base, offset);
                break;
            case '1001':
                this.REGISTER[dst] = SUB_REG(base, offset);
                break;
            case '1010':
                this.REGISTER[dst] = SUB_VAL(base, offset);
                break;
        }
    }
}

CPU.prototype = {
    PC:0,
    REGISTER: new Array(8).fill(0),
};

const programToBits = (str) => {
    const code = str.replace(/\,/g,'').split(' ');
    console.log(code);

    if(code.length == 3) {
        const [cmd, destReg, val] = code;
        return `${cheatSheet[cmd]}${cheatSheet[destReg]}${strToBits(9,(val[0]==='#')?val.slice(1,):val)}`;  
    } else if (code[3][0] == '#') {
        const [cmd, reg1, reg2, offsetVal] = code;
        const rcmd = (cmd==='OR' || cmd === 'AND')? cmd : cmd + '_VAL';
        return `${cheatSheet[rcmd]}${cheatSheet[reg1]}${cheatSheet[reg2]}1${strToBits(5,offsetVal.slice(1,))}`;
    } else {
        const [cmd, reg1, reg2, reg3] = code;
        const rcmd = (cmd==='OR' || cmd === 'AND')? cmd : cmd + '_REG';
        return `${cheatSheet[rcmd]}${cheatSheet[reg1]}${cheatSheet[reg2]}000${cheatSheet[reg3]}`;
    }
}

const strToBits = (bitNum, val) => {
    const bit = parseInt(val).toString(2);
    return zeroPad(bitNum, bit);
}

const zeroPad = (bitNum, bit) => (bitNum > bit.length)?'0'.repeat(bitNum - bit.length) + bit:bit;

module.exports = {
    CPU,
    programToBits,
}

const asmbCodes1 = [
    'LOAD R1, R2, R3',
    'STORE R5, R3, R4',
    'LOAD R7, R2, #30',
    'AND R3, R1, R6',
    'ADD R4, R2, R5',
    'SUB R4, R6, #8',
    "MOV R4, #250",
];

const asmbCodes2 = [
    'MOV R4, 0xA0',
    'MOV R5, 0x02',
    'LOAD R1, R4, R5',
    'ADD R2, R1, #4',
    'SUB R3, R1, R2',
    'STORE R3, R4, #4',
]

const programs = asmbCodes2.map((v) => programToBits(v));
console.log(programs);
const cpu = new CPU(programs);
