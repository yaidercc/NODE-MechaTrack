export const requiredEnv = (value: string | undefined, key: string) => {
    if (!value) throw new Error(`Missing enviroment variable for: ${key}`)
    return value
}