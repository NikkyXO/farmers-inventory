import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { v4 } from 'uuid';

export class BaseEntity {
  @Prop({
    required: true,
    type: Schema.Types.Mixed,
    default: () => v4(),
    alias: 'id',
  })
  _id: string;

  @Prop({
    required: false,
    type: Schema.Types.Date,
    default: null,
  })
  deletedAt: Date;

  @Prop({
    required: false,
    type: Schema.Types.Date,
    default: null,
  })
  createdAt: Date;

  @Prop({
    required: false,
    type: Schema.Types.Date,
    default: null,
  })
  updatedAt: Date;
}

export interface QueryProduct {
  userId: string;
  all?: boolean;
}

export class UpdateQueryProduct {
  @ApiProperty({
    required: true,
    type: String,
  })
  id: string;
}