import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';
import { BaseEntity } from 'src/config/entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Category } from './category.entity';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
  versionKey: undefined,
  toJSON: {
    getters: true,
    aliases: true,
    virtuals: true,
  },
})
export class Product extends BaseEntity {
  @Prop({
    index: true,
    unique: true,
  })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop({
    required: true,
  })
  @ApiProperty()
  tags: string[];

  @Prop({
    required: true,
    default: 0,
  })
  @ApiProperty()
  quantity: number;

  @Prop({
    required: true,
    default: 5,
  })
  @ApiProperty()
  @IsOptional()
  lowStockThreshold: number;

  @Prop({ type: String, ref: 'Category' })
  category: Category;

  @Prop({ type: String, ref: 'User' })
  createdBy: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
