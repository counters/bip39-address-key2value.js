// IEEE754.js
export default function() {

    // Convert a JavaScript number to IEEE-754 Double Precision
// value represented as an array of 8 bytes (octets)
//
// http://cautionsingularityahead.blogspot.com/2010/04/javascript-and-ieee754-redux.html
    function toIEEE754(v, ebits, fbits) {

        var bias = (1 << (ebits - 1)) - 1;

        // Compute sign, exponent, fraction
        var s, e, f;
        if (isNaN(v)) {
            e = (1 << bias) - 1; f = 1; s = 0;
        }
        else if (v === Infinity || v === -Infinity) {
            e = (1 << bias) - 1; f = 0; s = (v < 0) ? 1 : 0;
        }
        else if (v === 0) {
            e = 0; f = 0; s = (1 / v === -Infinity) ? 1 : 0;
        }
        else {
            s = v < 0;
            v = Math.abs(v);

            if (v >= Math.pow(2, 1 - bias)) {
                var ln = Math.min(Math.floor(Math.log(v) / Math.LN2), bias);
                e = ln + bias;
                f = v * Math.pow(2, fbits - ln) - Math.pow(2, fbits);
            }
            else {
                e = 0;
                f = v / Math.pow(2, 1 - bias - fbits);
            }
        }

        // Pack sign, exponent, fraction
        var i, bits = [];
        for (i = fbits; i; i -= 1) { bits.push(f % 2 ? 1 : 0); f = Math.floor(f / 2); }
        for (i = ebits; i; i -= 1) { bits.push(e % 2 ? 1 : 0); e = Math.floor(e / 2); }
        bits.push(s ? 1 : 0);
        bits.reverse();
        var str = bits.join('');

        // console.log(bits.toString())
        // Bits to bytes
        var bytes = [];
        while (str.length) {
            bytes.push(parseInt(str.substring(0, 8), 2));
            str = str.substring(8);
        }
        return bytes;
    }

/*
    function dec2bin(dec){
        return (dec >>> 0).toString(2);
    }
*/

    function fromIEEE754(bytes, ebits, fbits) {

        // Bytes to bits
        var bits = [];
        for (var i = bytes.length; i; i -= 1) {
            var byte = bytes[i - 1];
            for (var j = 8; j; j -= 1) {
                bits.push(byte % 2 ? 1 : 0); byte = byte >> 1;
            }
        }
        bits.reverse();
        var str = bits.join('');

        // Unpack sign, exponent, fraction
        var bias = (1 << (ebits - 1)) - 1;
        var s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
        var e = parseInt(str.substring(1, 1 + ebits), 2);
        var f = parseInt(str.substring(1 + ebits), 2);

        // Produce number
        if (e === (1 << ebits) - 1) {
            return f !== 0 ? NaN : s * Infinity;
        }
        else if (e > 0) {
            return s * Math.pow(2, e - bias) * (1 + f / Math.pow(2, fbits));
        }
        else if (f !== 0) {
            return s * Math.pow(2, -(bias-1)) * (f / Math.pow(2, fbits));
        }
        else {
            return s * 0;
        }
    }

    this.fromIEEE754Double = function (b) {
        const byteArray = fromIEEE754(b, 11, 52);
        return byteArray
    }
    this.toIEEE754Double= function(v, Bytes=false) {
        const byteArray =  toIEEE754(v, 11, 52);
        if (Bytes) return byteArray; else return byteArrayToLong(byteArray);
    }
    this.fromIEEE754Single= function(b) {
        // console.log(b) ;
        return fromIEEE754(b,  8, 23);
    }
    this.toIEEE754Single= function (v, Bytes=false) {
        const byteArray =  toIEEE754(v,  8, 23);
        if (Bytes) return byteArray; else return byteArrayToLong(byteArray);
    }

    this.decodeIEEE754Single= function(number) {
        var byteArray = [0, 0, 0, 0];
        for ( var i = byteArray.length; i ; i -= 1 ) {
            var byte = number & 0xff;
            byteArray [ i-1 ] = byte;
            number = (number - byte) / 256 ;
        }
        // console.log(byteArray) ;
        return fromIEEE754(byteArray,  8, 23);
    }

    this.decodeIEEE754Double = function (number) {
        var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];
        for ( var i = byteArray.length; i ; i -= 1 ) {
            var byte = number & 0xff;
            byteArray [ i-1 ] = byte;
            number = (number - byte) / 256 ;
        }
        // console.log(byteArray) ;
        return fromIEEE754(byteArray, 11, 52);
    }

    function byteArrayToLong(/*byte[]*/byteArray) {
        var value = 0;
        // for ( var i = byteArray.length - 1; i >= 0; i--) {
        for ( var i = 0; i < byteArray.length;  i++) {
            value = (value * 256) + byteArray[i];
        }
        return value;
    }
// Convert array of octets to string binary representation
// by bartaz

    function toIEEE754DoubleString(v) {
        return toIEEE754Double(v)
            .map(function(n){ for(n = n.toString(2);n.length < 8;n="0"+n); return n })
            .join('')
            .replace(/(.)(.{11})(.{52})/, "$1 $2 $3")
    }
}

