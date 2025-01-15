import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ProductResponseDto } from './dto/product-response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { ProductComparisonResponseDto } from './dto/product-comparison-result.type';
import { ProductStatus } from './enums/product-status.enum';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Get all products
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all products',
    type: [ProductResponseDto],
  })
  @Get()
  async findAll(): Promise<ProductResponseDto[]> {
    return this.productService.findAll();
  }

  // Search products by keyword
  @ApiOperation({ summary: 'Search for products by keyword and status' })
  @ApiResponse({
    status: 200,
    description:
      'Successfully fetched products based on search keyword and status',
    type: [ProductResponseDto],
  })
  @Get('search')
  async search(
    @Query('keyword') keyword?: string,
    @Query('status') status?: ProductStatus,
  ): Promise<ProductResponseDto[]> {
    return this.productService.search(keyword, status);
  }

  // Get a product by its ID
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', description: 'ID of the product' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the product',
    type: ProductResponseDto,
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductResponseDto> {
    return this.productService.findOne(id);
  }

  // Create a new product
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({
    description: 'Product data to create',
    type: CreateProductDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Product successfully created',
    type: ProductResponseDto,
  })
  @Post()
  async create(
    @Body() productData: Partial<ProductResponseDto>,
  ): Promise<ProductResponseDto> {
    return this.productService.create(productData);
  }

  // Update an existing product
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', description: 'ID of the product to update' })
  @ApiBody({
    description: 'Product data to update',
    type: UpdateProductDto,
  })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() productData: Partial<ProductResponseDto>,
  ): Promise<ProductResponseDto> {
    return this.productService.update(id, productData);
  }

  // Delete a product
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', description: 'ID of the product to delete' })
  @ApiResponse({
    status: 204,
    description: 'Product successfully deleted',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }

  // Compare two products by their IDs
  @ApiOperation({ summary: 'Compare two products' })
  @ApiParam({ name: 'id1', description: 'ID of the first product' })
  @ApiParam({ name: 'id2', description: 'ID of the second product' })
  @ApiResponse({
    status: 200,
    description: 'Comparison result between two products',
    type: Object,
  })
  @Get('compare/:id1/:id2')
  async compare(
    @Param('id1') id1: number,
    @Param('id2') id2: number,
  ): Promise<ProductComparisonResponseDto[]> {
    return this.productService.compare(id1, id2);
  }
}
