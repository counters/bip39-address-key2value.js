export default function() {
    // this.id = id;
    // this.symbol = symbol;
    this.getASCII = function (string) {
        return string.split('')
            .map(x=>this.fromNum(x.charCodeAt(0)))
            .reduce((a,b)=>a+b);
    }
    this.getUnicode = function (string) {
        // console.log(string);
        return hexEncode(string);
        // return string.split('').map(x=>this.from16Num(x.charCodeAt(0))).reduce((a,b)=>a+b);
    }
    this.fromNum = function (num) {
        let hex = num.toString(16);
        if (hex.length % 2 === 0) return hex; else return "0"+hex;
    }
    this.from16Num = function (string) {
        return hexDecode(string);
        let hex = string.toString(16);
        for (let i = 0; hex.length % 4 === 0; i++) {
            hex ="0"+hex;
        }
        return hex
    }

    this.getText = function (textHex) {
        // const textHex = objBip39Address.payload;
        let text="";
        for (let i = 0; i < textHex.length; i=i+2) {
            // console.log("i: " + textHex.substr(i, 2) + "");
            text += String.fromCharCode(parseInt(textHex.substr(i, 2), 16));
        }
        return text;
    }
    this.getUnicodeText = function (textHex) {
        return hexDecode(textHex);
    }


    function hexEncode(str){
        let hex;
        let result = "";
        for (let i=0; i<str.length; i++) {
            hex = str.charCodeAt(i).toString(16);
            result += ("000"+hex).slice(-4);
        }
        return result
    }
    function hexDecode(hex){
        const hexes = hex.match(/.{1,4}/g) || [];
        let back = "";
        for(let j = 0; j<hexes.length; j++) {
            back += String.fromCharCode(parseInt(hexes[j], 16));
        }

        return back;
    }
}

