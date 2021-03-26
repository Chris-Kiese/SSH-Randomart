const randomart = (fingerprint) => {
    //Initialize field
    const width = 17;
    const height = 9;
    const field = Array(height).fill(Array(width).fill(0));

    //Symbols used for the randomart
    const symbols = ' .o+=*B0X@%&#/^SE'

    //positions
    const startX = 8;
    const startY = 4;
    let posX = startX;
    let posY = startY;

    /** Decode fingerprint **/
    if(fingerprint.length !== 43) throw new Error('Fingerprint is not a valid SHA256 fingerprint!');
    let hexString = '';
    let hex;
    const bitPairs = [];
    let byte;

    //base64 -> Hex
    const buffer = Buffer.alloc(32, fingerprint, 'base64');
    for(let i=0; i<buffer.length; i++) {
        hex = buffer[i].toString(16)
        hexString += '00'.substr(hex.length) + hex
    }
    if(hexString.length !== 64) throw new Error('Fingerprint is not a valid SHA256 fingerprint!');

    //hex -> byte
    for(let i=0; i<(hexString.length/2); i++) {
        //hex -> byte
        hex = hexString[2*i] + hexString[2*i+1];

        byte = parseInt(hex, 16).toString(2);
        byte = '00000000'.substr(byte.length)+byte;

        //byte -> bit pairs in correct order
        for(let j=0; j<4; j++) {
            bitPairs.push(byte[6-2*j] + byte[7-2*j])
        }

    }
    console.log(`Bit Pairs: ${bitPairs}`)
    /** Walk **/
    for(let i=0; i<bitPairs.length; i++) {
        //change current position according to bits
        switch(bitPairs[i]){
            case '00':
                posX += (posX > 0) ? -1 : 0;
                posY += (posY > 0) ? -1 : 0;
                break;
            case '01': 
                posX += (posX < 16) ? 1 : 0;
                posY += (posY > 0) ? -1 : 0;
                break;
            case '10': 
                posX += (posX > 0) ? -1: 0;
                posY += (posY < 8) ? 1 : 0;
                break;
            case '11': 
                posX += (posX < 16) ? 1 : 0;
                posY += (posY < 8) ? 1 : 0;
                break;
            default: break;
        }
        field[posY][posX]++;
        console.log(`Current pos x: ${posX} y: ${posY} count: ${field[posY][posX]}\n`)
    }
    //Set start and end positions
    field[startY][startX] = 15;
    field[posY][posX] = 16;

    /** Parse randomart**/
    let ra = '+---[RSA 2048]----+\n|';
    for(let i=0; i<field.length; i++){
        for(let j=0; j<field[i].length; j++){
            //Add Linebreak
            if(j === 0 && i !== 0) ra+='|\n|'
            ra += (field[i][j] <= 16 && field[i][j] >= 0) 
                ? symbols.charAt(field[i][j])
                : 'F'
        }
    }
    ra += '|\n+----[SHA256]-----+'

    return ra;
}

let test = randomart('wjqs7Nq/4Yg/OVm0bZgera0u40GHzj3IargfNJOiOvA');
console.log(test)
