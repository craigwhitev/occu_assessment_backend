import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Like, Repository } from 'typeorm';
import { ProductStatus } from './enums/product-status.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch products');
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product)
        throw new NotFoundException(`Product with ID ${id} not found`);
      return product;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch the product');
    }
  }

  async search(keyword?: string, status?: ProductStatus): Promise<Product[]> {
    try {
      const whereConditions: any = {};

      if (keyword) {
        whereConditions.productName = Like(`%${keyword}%`);
      }

      if (status) {
        whereConditions.status = status;
      }

      return await this.productRepository.find({
        where: whereConditions,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to search products');
    }
  }

  async create(productData: Partial<Product>): Promise<Product> {
    try {
      const newProduct = this.productRepository.create(productData);
      return await this.productRepository.save(newProduct);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async update(id: number, productData: Partial<Product>): Promise<Product> {
    try {
      const product = await this.findOne(id);
      Object.assign(product, productData);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update product');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const product = await this.findOne(id);
      await this.productRepository.remove(product);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete product');
    }
  }

  async compare(id1: number, id2: number) {
    try {
      const product1 = await this.findOne(id1);
      const product2 = await this.findOne(id2);

      const differences = [];
      for (const key of ['category', 'type', 'vendor', 'status']) {
        if (product1[key] !== product2[key]) {
          differences.push({
            field: key,
            values: [product1[key], product2[key]],
          });
        }
      }
      return differences;
    } catch (error) {
      throw new InternalServerErrorException('Failed to compare products');
    }
  }
}
