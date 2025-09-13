export function formatPrice(amount, currency = "NGN", locale = "en-NG") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-NG", options);
}

// Example:
console.log(formatDate("2025-09-10")); //"Sep 10, 2025"
