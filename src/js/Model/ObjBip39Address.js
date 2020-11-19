/**
 * ObjBip39Address
 * @constructor
 * @param {int} type - TypeBip39Address value
 * @param {(string|null)} topic - Topic, Key
 * @param {string} payload - Payload, Message
 */
export default function(type, topic, payload) {
    this.type = type;
    this.topic = topic;
    this.payload = payload;
}
