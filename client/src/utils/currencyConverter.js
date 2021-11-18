export default function currencyConverter(value) {
  return Intl.NumberFormat("en-US", {
    //Formatear como número
    style: "currency",
    currency: "USD",
  }).format(value);
}
