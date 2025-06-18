
export class Guards {
    static integerType(value: number) {
        if (typeof value !== "number") {
            throw new Error(`${value}: is not a number`)
        }

        if (!Number.isInteger(value)) {
            throw new Error(`${value}: is not an integer`)
        }
    }

    static stringType(value: string) {
        if (typeof value !== "string") {
            throw new Error(`${value}: is not a string`)
        }
    }

    static enumValues<T>(value: T, validValues: Record<string, T>) {
        if (!Object.values(validValues).includes(value)) {
            throw new Error(`${value} invalid value for enum`)
        }

    }
}