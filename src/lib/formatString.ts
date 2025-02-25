export function formatPrice(price:number, currency:string = 'IDR', locale:string = 'id-ID'){
  return price.toLocaleString(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  })
}