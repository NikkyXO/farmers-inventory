import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductInventoryService } from '../services/product-inventory.service';
import { CreateProductInventoryDto } from '../dto/create-product-inventory.dto';
import { UpdateProductInventoryDto } from '../dto/update-product-inventory.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';

@ApiBearerAuth('JWT')
@Controller('product-inventory')
export class ProductInventoryController {
  constructor(
    private readonly productInventoryService: ProductInventoryService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createProductInventoryDto: CreateProductInventoryDto,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    console.log('Authenticated user:', user);
    return this.productInventoryService.addProduct(createProductInventoryDto, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productInventoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateProductInventoryDto: UpdateProductInventoryDto,
  ) {
    return this.productInventoryService.update(+id, updateProductInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productInventoryService.remove(+id);
  }
}
