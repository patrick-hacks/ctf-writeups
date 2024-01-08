const bitsMap = new Map([
    ['11', 'R'],
    ['00', 'D'],
    ['01', 'L'],
    ['10', 'U']
]);

function processNumber(num) {
    num += 32;
    const bits = num.toString(2).padStart(6, '0');

    for (let i = 0; i < bits.length; i += 2) {
      const twoBits = bits.slice(i, i + 2);
      if (bitsMap.has(twoBits)) {
        const character = bitsMap.get(twoBits);
        switch (character) {
            case 'R':
                position_x += 1
            break
            case 'D':
                position_y += 1
            break
            case 'L':
                position_x -= 1
            break
            case 'U':
                position_y -= 1
            break
        }
        // console.log(`Number: ${num}, Bits: ${twoBits}, Character: ${character}`);
      } else {
        // console.log(`Number: ${num}, Bits: ${twoBits}, Character: Not mapped`);
      }
      k = k + 211 * (position_x + 9) * (position_y + 9) * 239 & 4294967295
    }
}

// Result from find_numbers
// Solutions for the individual levels
numbers = [
    [
        -19, -29, -29,  -6, 
        -14,  22, 13,  15,  
        18,  16, -13, -12, 
        22,  27,  12, -22,
    ],
    [
        28, -2, 19, 17,
        19, -32, -12, 20,
        19, -30, 12, 5,
        6, 29, -5, 24,
    ],
    [
        28, -4, 16, -15,
        16, 19, -31, -14,
        16, 17, -11, 29,
        -21, 17, -31, 26,
    ],
    [
        16, 11, 18, 18,
        31, 17, 16, 28,
        -2, 16, -15, -25,
        -29, -25, 6, -12,
    ]

]

function reset() {
    k = 0
    position_x = -7
    position_y = -7
}

for (let i = 0; i < 4; i++) {
    reset()
    numbers[i].forEach(processNumber);
    console.log(k)
}
// 40645773

40645774
130661539
116339703
150379278
