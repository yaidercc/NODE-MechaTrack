export class ValueObject<T> {
    constructor(
        public field: string,
        private _value: T
    ) {
        // Object.freeze(this._value);
    }

    get value(): T {
        return this._value;
    }
}