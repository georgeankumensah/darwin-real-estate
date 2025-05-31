export function validateEnumValue<T extends Record<string, string>>(
    enumObject: T,
    value: string,
    fallback: T[keyof T]
): T[keyof T] {
    return Object.values(enumObject).includes(value as T[keyof T])
        ? (value as T[keyof T])
        : fallback;
}
