# bip39-address-key2value.js

Javascript implementation for [bip39-address-key2value](https://github.com/counters/bip39-address-key2value) 


### Compile
```bash
yarn install
yarn build
```

## Examples

Encode
```javascript
let bip39Address = new Bip39Address();

const type = TypeBip39Address.ASCII;
const topic = 'key';
const payload = 'Hello World';
let address = bip39Address.encode(input_type, input_topic, input_payload)
console.log(address); // 0248656c6c6f20576f726c64016b65790165b525
```

Decode
```javascript
let bip39Address = new Bip39Address();
let helpHex = new HelpHex();
let classIEEE754 = new IEEE754();

const address = '0248656c6c6f20576f726c64016b65790165b525';
let objBip39Address = bip39Address.decode(address);
if (objBip39Address) {
    console.log(objBip39Address); //    {"type": 2,"topic": "key","payload": "48656c6c6f20576f726c64"}
    const textHex = objBip39Address.payload;
    let text = "";
    if (objBip39Address.type == TypeBip39Address.ASCII) {
        text = helpHex.getText(textHex);
    } else if (objBip39Address.type == TypeBip39Address.UTF8) {
        text = helpHex.getUnicodeText(textHex);
    } else if (objBip39Address.type == TypeBip39Address.INTEGER) {
        text = parseInt(textHex, 16);
    } else if (objBip39Address.type == TypeBip39Address.DOUBLE) {
        text = classIEEE754.decodeIEEE754Double(parseInt(textHex, 16));
    }
    console.log(text);  //    'Hello World'
}
```