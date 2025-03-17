export const PriceFormat = (price: number) => {
  return <span>{new Intl.NumberFormat("en-US").format(price)}</span>;
};
