// Same tests as in core.js but using TypeScript
// Now able to remove the type annotations from the tests

export function calculateDiscount(price: number, discountCode: string) {
  if (price <= 0) {
    return 'Invalid price';
  }

  let discount = 0;
  if (discountCode === 'SAVE10') {
    discount = 0.1;
  } else if (discountCode === 'SAVE20') {
    discount = 0.2;
  }

  return price - price * discount;
}
