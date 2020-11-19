import Bip39Address from './src/js/Bip39Address';
import {TypeBip39Address} from "./src/js/Enum/TypeBip39Address";
import HelpHex from "./src/js/Utils/HelpHex";
import IEEE754 from "./src/js/Utils/IEEE754";
import ObjBip39Address from "./src/js/Model/ObjBip39Address";
import CRC16 from './src/js/Utils/CRC16';
global.CRC16= CRC16;
// import Decimal from '@agrora/decimal';

global.Bip39Address = Bip39Address;
global.HelpHex = HelpHex;
global.IEEE754 = IEEE754;
global.TypeBip39Address = TypeBip39Address;
global.ObjBip39Address = ObjBip39Address;

/*
let MinterConvert=function(_name) {
    let MinterPIP_STR =      '0.000000000000000001';
    let MinterPIPINBIP_STR = '1000000000000000000';
    this.fromPip = function (pip) {
        return Decimal.from(pip).multiply(MinterPIP_STR).toFloat()
    }
    this.toPip = function (amount) {
        const decimal = Decimal.from(amount);
        const sum = decimal.divide(MinterPIP_STR);
        return sum.toFixed(0);
    }
}
window.minterConvert = new MinterConvert()
*/
