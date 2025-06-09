export class ValueObject<T> {
    constructor(
        private value: T,
        public field: string
    ) {
        Object.freeze(this);
    }

    get getValue() {
        return this.value;
    }
}