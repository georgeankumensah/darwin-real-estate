export function formatPrice(
    value: number | string,
    currency: "USD" | "GHS" = "USD"
): string {
    const num = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(num)) return "";

    const locale = currency === "GHS" ? "en-GH" : "en-US";

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(num);
}
