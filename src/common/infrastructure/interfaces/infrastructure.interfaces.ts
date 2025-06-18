export interface UpdateAggregate<T> {
    changedAttributes: T,
    id: {
        value: string
    }
}