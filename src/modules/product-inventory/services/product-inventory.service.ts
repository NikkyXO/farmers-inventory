import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductInventoryDto } from '../dto/create-product-inventory.dto';
import { UpdateProductInventoryDto } from '../dto/update-product-inventory.dto';
import { Product } from '../entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryProduct } from 'src/config/entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ProductInventoryService {
  constructor(
    @InjectModel(Product.name)
    private productRepo: Model<Product>,
  ) {}

  async findAll(data: QueryProduct): Promise<Product[]> {
    const { userId } = data;
    return await this.productRepo.find({ userId });
  }

  async addProduct(data: CreateProductInventoryDto, userId: string) {
    const product = new this.productRepo({
      ...data,
      createdBy: userId,
    });
    return await product.save();
  }

  async getAllUserProductCount(userId: string): Promise<number> {
    return await this.productRepo.countDocuments({ userId });
  }

  findOne(id: string): Promise<Product | null> {
    return this.productRepo.findOne({ _id: id });
  }

  async updateQuantity(id: string, numberChange: number) {
    const product = await this.productRepo.findById(id)
    if (!product) {
      throw new BadRequestException('product doesnt exist')
    }
    product.quantity += numberChange
    product.updatedAt = new Date();
    return product.save()
  }

  async getAllProducts() {
    return await this.productRepo.find();
  }

  async update(id: string, updateProductInventoryDto: UpdateProductInventoryDto) {
    return await this.productRepo.updateOne(
      { _id: id },
      { ...updateProductInventoryDto},
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    return await this.productRepo.deleteOne({ _id: id})
  }

  @Cron('0 8 * * *')
  async notifyLowStockUsers() {
    const lowStockItems = await this.productRepo.find({
      $expr: { $lt: ['quantity', '$lowStockThreshold']},
    }).populate('createdBy');

    const userAlertsMap = new Map<string, { email: string; items: string[]}> ()

    for (const item of lowStockItems) {
      const userId = item.createdBy._id.toString();
      if (!userAlertsMap.has(userId)) {
        userAlertsMap.set(userId, {
          email: item.createdBy.email, items: []
        })
      }
      userAlertsMap.get(userId)?.items.push(item.name)
    }

    for (const { email, items } of userAlertsMap.values()) {
      // send emails
      console.log (`Sending to &{emails}`, items)
      // await this.mailerService.sendMail({...})
    }
  }
}
