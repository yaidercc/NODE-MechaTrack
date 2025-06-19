
export class Guards {
    static integerType(value: number) {
        if (typeof value !== "number") {
            throw new Error(`${value}: is not a number`)
        }

        if (!Number.isInteger(value)) {
            throw new Error(`${value}: is not an integer`)
        }
    }

    static stringType<T>(field: string, value: T) {
        if (typeof value !== "string") {
            throw new Error(`${field}: The value ${value} is not a string`);
        }
    }

    static enumValues<T>(field: string, value: T, validValues: Record<string, T>) {
        if (!Object.values(validValues).includes(value)) {
            throw new Error(`${field}: The value ${value} invalid value for enum`);
        }

    }

    static validatePassword(value: string) {
        const passwordRegex = '^(?=.*[A-Z])(?=.*\\d).{8,}$'
        if (!new RegExp(passwordRegex, 'gi').test(value)) {
            throw new Error(`Password: The value ${value}: the password does not meet the conditions`);
        }
    }

    static validateEmail(value: string) {
        const emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        if (!new RegExp(emailRegex, 'gi').test(value)) {
            throw new Error(`Email: The value ${value} is not a valid email`);
        }
    }
    static validatePhone(value: string) {
        const phoneRegex = '^(3)\d{9}$'
        if (!new RegExp(phoneRegex, 'gi').test(value)) {
            throw new Error(`Phone: The value ${value} is not a valid phone number`);
        }
    }
}