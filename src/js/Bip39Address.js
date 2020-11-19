// import HelpHex from "./Utils/HelpHex.js";
// import {TypeBip39Address} from "./Enum/TypeBip39Address.js";
// import IEEE754 from "./Utils/IEEE754.js";
// import ObjBip39Address from "./Model/ObjBip39Address.js";
export default function () {
    let helpHex = new HelpHex();
    let classIEEE754 = new IEEE754();
    var _CRC16 = new CRC16();

    const delimiter = '01';
    const delimiter2 = '03';
    // const delimiter = '__';
    // const delimiter2 = '--';

    /**
     * encode from ObjBip39Address
     * @param {ObjBip39Address} objBip39Address - Payload, Message
     * @returns {(string|null)} 012345678790
     */
    this.encodeObj = function (objBip39Address) {
        return this.encode(objBip39Address.type, objBip39Address.topic, objBip39Address.payload)
    }

    /**
     * @param {int} type - TypeBip39Address value
     * @param {(string|null)} topic - Topic, Key
     * @param {string} payload - Payload, Message
     * @returns {(string|null)} 012345678790
     */
    this.encode = function (type, topic, payload) {
        // console.log(type, topic, payload);
        // console.log(TypeBip39Address.ASCII, TypeBip39Address.INTEGER, TypeBip39Address.UTF8);
        let address = "";
        address += helpHex.fromNum(type);
        // address += " ";

        let payloadHex;
        if (type===TypeBip39Address.ASCII){
            payloadHex = helpHex.getASCII(payload);
        } else if (type===TypeBip39Address.INTEGER){
            // console.log(payload.toString(16));
            payloadHex = helpHex.fromNum(Number(payload));
            // console.log(Number(payload));
            // console.log(payloadHex);
        } else if (type===TypeBip39Address.UTF8){
            // console.log(payload);
            payloadHex = helpHex.getUnicode(payload);
            // console.log(payloadHex);
        } else if (type===TypeBip39Address.DOUBLE){
            // console.log(payload);
            payloadHex = helpHex.fromNum(classIEEE754.toIEEE754Double(payload));
            // payloadHex = helpHex.getASCII(payload);
            // console.log(payloadHex);
        } else if (type===TypeBip39Address.MPIP){
            // console.log(payload);
            payloadHex = helpHex.fromNum(classIEEE754.toIEEE754Double(payload));
            // payloadHex = helpHex.getASCII(payload);
            // console.log(payloadHex);
        } else {
            // payloadHex = payload
            return null;
        }

        address += payloadHex;
        if (topic!=='') address += delimiter + helpHex.getASCII(topic);
        else
            address += delimiter2;
        // console.log("address.length: "+address.length);
        if (address.length>36) {
            return null;
        } else if (address.length<36) {
            address += delimiter;
            for (var i = 0; address.length < 36; i++) {
                address += helpHex.fromNum((Math.floor(Math.random() * 93)+32)); // 125-32
            }
        }
        // console.log("address: "+address+", "+_CRC16.get(address)+", 0x"+helpHex.fromNum(_CRC16.get(address)));
        address += helpHex.fromNum(_CRC16.get(address));
        return address;
    }
    /**
     * @param {string} address - 010203040506...0b0c0d0e0f
     * @returns {(ObjBip39Address|null)} ObjBip39Address
     */
    this.decode = function (address) {
        if (address.length !== 40) return null;
        let topic= "";
        let topicNull = false;
        let payload = "";
        let random = "";
        // let type = parseInt(address.substr(0, 2), 16);
        let type = parseInt(address.substr(0, 2),16);
        let findDelimiter = 0;
        for (let i = 2; i < 36; i=i+2) {
            const strHex = address.substr(i, 2);
            if (strHex === delimiter) {
                findDelimiter++;
                // random += strHex;
                continue;
            } else if (strHex === delimiter2) {
                topicNull=true;
                findDelimiter++;
                continue;
            }
            if (findDelimiter===0) payload += strHex;
            else if(findDelimiter===1) topic += String.fromCharCode(parseInt(strHex, 16));
            // else if(findDelimiter===1) topic += strHex;
            else random += strHex;
        }
        const _crc16 = address.substr(36, 4);
        // console.log("for CRC:"+address.substr(0, 36));
        const currCrc16 = helpHex.fromNum(_CRC16.get(address.substr(0, 36)))
        if (_crc16==currCrc16) {
            // console.log("address.length: "+address.length);
            // console.log(findDelimiter, random, topic);

            if (  topicNull )  {
                topic = null;
            }

            // Если один разделитель и пустой рандом то есть KEY
            return (new ObjBip39Address(type, topic, payload));
        }
        return null;
    }

    // console.log('init Bip39Address');

}

