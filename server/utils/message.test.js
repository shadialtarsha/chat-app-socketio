const expect = require('expect');

const { generateMessage } = require('./message');
const { generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate a correct message object', () => {
        const from = 'Admin';
        const text = 'Hey, guys';
        const message = generateMessage(from, text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate a correct location message object', () => {
        const from = 'Admin';
        const latitude = 34.6489817;
        const longitude = 36.6238838;
        const message = generateLocationMessage(from, latitude, longitude);

        expect(message.from).toBe(from);
        expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
        expect(typeof message.createdAt).toBe('number');
    });
});