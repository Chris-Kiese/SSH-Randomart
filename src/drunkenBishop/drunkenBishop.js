//Define field for randomart
const fieldsize = 8;
const x = fieldsize*2 + 1; //17
const y = fieldsize + 1; //9
let field;

//Symbols used for the randomart
const symbols = ' .o+=*B0X@%&#/^SEF'

//Get the single number of a position to keep track in the field array
const numberOfPosition = (x,y) => x+17*y

//Define start & current position on the field
const startPosition = numberOfPosition(Math.floor(x/2),Math.floor(y/2));
let currentPosition;

const initPositionType = () => {
    const pos = [];
    for(let i=0; i<153; i++) {
        if(i==0) pos.push('a');
        else if (i === 16) pos.push('b');
        else if (i === 136) pos.push('c');
        else if (i === 152) pos.push('d');
        else if(i > 0 && i < 16) pos.push('T');
        else if(i%17 === 0) pos.push('L')
        else if(i%17 === 16) pos.push('R')
        else if(i > 136 && i < 152) pos.push('B')
        else pos.push('M')
    }

    return pos;
}

const positionTypeField = initPositionType()

const movement = (bits) => {
    let ul = -18;
    let ur = -16;
    let dl = 16;
    let dr = 18;

    if(positionTypeField[currentPosition] === 'T') {
        ul = -1;
        ur = 1;
    } else if(positionTypeField[currentPosition] === 'B'){
        dl = -1
        dr = 1
    } else if(positionTypeField[currentPosition] === 'L'){
        ul = -17;
        dl = 17;
    } else if (positionTypeField[currentPosition] === 'R'){
        ur = -17;
        dr = 17;
    } else if (positionTypeField[currentPosition] === 'a'){
        ul = 0;
        ur = 1;
    } else if(positionTypeField[currentPosition]=== 'b'){
        ul = -1;
        ur = 0;
    } else if(positionTypeField[currentPosition] === 'c'){
        dl = 0;
        dr = 1;
    } else if(positionTypeField[currentPosition] === 'd'){
        dl = -1;
        dr = 0;
    }

    switch(bits){
        case '00':
            currentPosition += ul;
            break;
        case '01': 
            currentPosition += ur;
            break;
        case '10': 
            currentPosition += dl;
            break;
        case '11': 
            currentPosition += dr;
            break;
        default: break;
    }
}

const decode = (fingerprint, md5) => {
    let hexString = '';
    let hex;
    let bitPairs = [];
    let byte;

    if(md5) {
        hexString = fingerprint.replace(/:/g, '')
        
        if(hexString.length !== 32) throw new Error('Fingerprint is not a valid MD5 fingerprint!');
    } else {
        if(fingerprint.length !== 43) throw new Error('Fingerprint is not a valid SHA256 fingerprint!');
        
        //Decode base64 SHA256 to hexstring
        const buffer = Buffer.alloc(32, fingerprint, 'base64');
        for(let i=0; i<buffer.length; i++) {
            hex = buffer[i].toString(16)
            hexString += '00'.substr(hex.length) + hex
        }
        if(hexString.length !== 64) throw new Error('Fingerprint is not a valid SHA256 fingerprint!');
    }

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
    return bitPairs
}

const walk = (steps) => {
    for(let i=0; i<steps.length; i++) {
        //change current position according to bits
        movement(steps[i])
        //Increase counter of current position
        field[currentPosition]++;
    }
    //Set start & end position to the according values
    field[startPosition] = 15;
    field[currentPosition] =16;
}

const addBorders = (content, md5) => {
    let ra = '+---[RSA 2048]----+\n';
    const lines = content.split('\n');
    for(let i=0; i<lines.length; i++){
        ra += '|' + lines[i] + '|\n';
    }
    ra += (md5)
        ?   '+------[MD5]------+'
        : '+----[SHA256]-----+';
    return ra
}

const parseRandomart = (md5) => {
    let content ='';
    let count;
    
    //Create Randomart
    for(let i=0; i<field.length; i++) {
        //Add Linebreak
        if((i%17 === 0 && i!==0)) content+='\n'

        //Add symbol
        count = field[i]
        content += (count >= 0 && count <= 16) 
            ? symbols.charAt(count)
            : '?'     
    }

    return addBorders(content);
}

export const drunkenBishop = (fingerprint, md5) => {
    //Initialize field & start position
    field = new Array(x*y).fill(0); //fieldsize: 153
    currentPosition = startPosition;

    //Decode to bitpairs and move accordingly
    walk(decode(fingerprint, md5));

    return parseRandomart(md5);
}

export default drunkenBishop;
