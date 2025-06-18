export class ValueObject<T> {
    constructor(
        public field: string,
        private value: T
    ) {
        Object.freeze(this);
    }

    get getValue() {
        return this.value;
    }
}