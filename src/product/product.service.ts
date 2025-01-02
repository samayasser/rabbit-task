import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { ProductDTO } from './dto/product.dto';
import { TopProductDTO } from './dto/top-products.dto';


@Injectable()
export class ProductService {
  constructor(
    private readonly productsRepository: ProductRepository,
    private prismaService: PrismaService,
  ) {}

  
  async getAllProducts(filters: GetAllProductsDTO, page: number = 1, pageSize: number = 20): Promise<ProductDTO[]> {
    // Build the where clause dynamically based on filters
    const where: any = {};
  
    if (filters.categories && filters.categories.length) {
      where.category = { in: filters.categories }; // Use IN to filter by multiple categories
    }
  
    // Select only necessary fields to reduce data transfer
    const selectFields = {
      id: true,
      name: true,
      category: true,
      area: true,
      createdAt: true
    };
  
    // Fetch products with filters and pagination
    const products = await this.prismaService.product.findMany({
      where,
      select: selectFields, // Only select the fields you need
      skip: (page - 1) * pageSize, // Pagination: offset based on the page number
      take: Number(pageSize), // Limit the number of records per request
      orderBy: {
        id: 'asc', // Example: Order by creation date, can be changed based on your needs
      },
    });
  
    return products;
}

  

  async getTop10ProductsByArea(area: string): Promise<TopProductDTO[]> {
    // Step 1: Aggregate order counts per product in the specified area
    const productOrders = await this.prismaService.orderItem.groupBy({
      by: ['productId'],
      where: {
        product: { area },
      },
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 10, // Get only the top 10
    });
  
    // Step 2: Fetch product details for the top 10 products
    const productIds = productOrders.map((order) => order.productId);
    const products = await this.prismaService.product.findMany({
      where: {
        id: { in: productIds },
      },
    });
  
    // Step 3: Combine product details with their order counts
    return products.map((product) => {
      const order = productOrders.find((o) => o.productId === product.id);
      return {
        id: product.id,
        name: product.name,
        category: product.category,
        area: product.area,
        createdAt: product.createdAt,
        totalOrders: order?._sum?.quantity || 0,
      };
    });
  }
  
  
  async getProductById(id: number): Promise<ProductDTO> {
    return this.productsRepository.findById(id);
  }
}
