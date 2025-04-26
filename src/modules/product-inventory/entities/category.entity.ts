import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { BaseEntity } from 'src/config/entity';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
  versionKey: undefined,
  toJSON: {
    getters: true,
    aliases: true,
    virtuals: true,
  },
})
export class Category extends BaseEntity {
  @Prop({
    index: true,
    unique: true,
  })
  @ApiProperty()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);