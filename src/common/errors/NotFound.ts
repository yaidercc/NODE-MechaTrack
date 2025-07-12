export class NotFound extends Error {
    constructor(
        private resourceName: string,
        identifier?: string
    ) {
        const message = identifier
            ? `${resourceName} with ${identifier} already exists.`
            : `${resourceName} already exists.`;
        super(message)
        this.name = "AlreadyExistsError"
    }
}