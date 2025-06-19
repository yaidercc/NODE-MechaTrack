const ValueObject = require("./ValueObject");

export class ValueObjectTimeStamp extends ValueObject {
    constructor(field: string, value: string | Date, nullable = false) {
        super(field, value);
        if (!value && !nullable) {
            throw new Error(`${this.field}: The value cannot be null`);
        }
        if (!value && nullable) {
            return
        }
        value = new Date(value);
        this.ensureIsTimestamp(value);
    }

    private ensureIsTimestamp(value: Date) {
        if (value.toString() === 'Invalid Date') {
            throw new Error(`${this.field}: Invalid value ${value} for object timestamp`);
        }
    }
}
