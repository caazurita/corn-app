export class Sale {
  name: string;
  type: string;
  quantity: number;
  createdAt: Date;

  constructor(
    name: string,
    type: string,
    quantity: number,
    createdAt: Date
  ) {
    this.name = name;
    this.type = type;
    this.quantity = quantity;
    this.createdAt = createdAt;
  }
}
