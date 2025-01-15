import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '../enums/product-status.enum';

export class UpdateProductDto {
  @ApiProperty({ description: 'Name of the product', example: 'Laptop' })
  productName?: string;

  @ApiProperty({
    description: 'Status of the product',
    enum: ProductStatus,
    example: 'Active',
  })
  status?: ProductStatus;

  @ApiProperty({
    description: 'Category of the product',
    example: 'Electronics',
  })
  category?: string;

  @ApiProperty({ description: 'Type of the product', example: 'Gadget' })
  type?: string;

  @ApiProperty({ description: 'Vendor of the product', example: 'ABC Corp' })
  vendor?: string;
}
