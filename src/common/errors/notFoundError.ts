export class NotFoundError extends Error {
    constructor(
        private resourceName: string,
        identifier?: string
    ) {
        const message = identifier
            ? `${resourceName} with ${identifier} was not found.`
            : `${resourceName} was not found.`;
        super(message)
        this.name = "NotFoundError"
    }
}