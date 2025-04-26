import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-product-inventory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) 
    private categoryRepo: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  async addCategory(data: CreateCategoryDto) {
    console.log({ data })
    const category = new this.categoryRepo({
      ...data,
    });
    console.log({ category })
    return await category.save();
  }


  findOne(id: string): Promise<Category | null> {
    return this.categoryRepo.findOne({ _id: id });
  }

  async updateCategory(id: string, data: any) {
    return await this.categoryRepo.updateOne(
        { _id: id },
        { ...data},
        {
          new: true,
        },
      );
  }

  async getAllCategories() {
    return await this.categoryRepo.find();
  }

  remove(id: string) {
    return `This action removes a #${id} productInventory`;
  }
}
