export class ValueObject<T> {
    constructor(
        public field: string,
        private _value: T
    ) {
        Object.freeze(this);
    }

    get value() {
        return this._value;
    }
}