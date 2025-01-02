import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { TopProductDTO } from './dto/top-products.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query() filters: GetAllProductsDTO, // Filter parameters (e.g., categories)
    @Query('page') page: number = 1, // Page number (default to 1 if not provided) to optimize fetching
    @Query('pageSize') pageSize: number = 20 // Items per page (default to 20 if not provided) to optimize fetching
  ) {
    return this.productsService.getAllProducts(filters, page, pageSize);
  }

  

  @Get('top-ordered')
  async getTopOrderedProducts(
    @Query('area') area: string,
  ): Promise<TopProductDTO[]> {
    if (!area) {
      throw new Error('Area is required');
    }

    return this.productsService.getTop10ProductsByArea(area);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }
}
