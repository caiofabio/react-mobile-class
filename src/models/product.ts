export default interface Product {
    amount: number,
    factory: {
      id: number,
      name: string,
    },
    id: number,
    name: string,
    price: number
}