
export class ValueObjectTimeStamp {
    private _value: Date | null = null;
    public field: string;

    constructor(field: string, value: Date | null, nullable = false) {
        this.field = field
        if (!value && !nullable) {
            throw new Error(`${this.field}: The value cannot be null`);
        }
        if (!value && nullable) {
            return
        }
        if (value) {
            this.ensureIsTimestamp(value);
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
    get asISOString(): string | null {
        return this._value?.toISOString() ?? null;
    }
}
