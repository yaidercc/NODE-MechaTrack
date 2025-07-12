
export class ValueObjectTimeStamp {
    private _value: string | null = null;
    public field: string;

    constructor(field: string, value: string | null, nullable = false) {
        this.field = field
        if (!value && !nullable) {
            throw new Error(`${this.field}: The value cannot be null`);
        }
        if (!value && nullable) {
            return
        }
        if (value) {
            this.ensureIsTimestamp(new Date(value));
            this._value = value
        }
    }

    private ensureIsTimestamp(value: Date) {
        if (value.toString() === 'Invalid Date') {
            throw new Error(`${this.field}: Invalid value ${value} for object timestamp`);
        }
    }
    get value() {
        return this._value
    }

}
