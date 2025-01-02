import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  // Make sure PrismaService is correctly set up

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  // Fetch all products
  async findAll() {
    return this.prisma.product.findMany();  // Accessing the product model via prisma
  }

  // Fetch a product by its ID
  async findById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // Create a new product
  async create(data: { name: string; category: string; area: string }): Promise<any> {
    return this.prisma.product.create({
      data,
    });
  }
}
