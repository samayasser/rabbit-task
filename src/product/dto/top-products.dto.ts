//DTO for product returned from top 10 products endpoint
export class TopProductDTO {
  id: number;
  name: string;
  category: string;
  totalOrders: number;
  area: string;
  createdAt: Date;
}
