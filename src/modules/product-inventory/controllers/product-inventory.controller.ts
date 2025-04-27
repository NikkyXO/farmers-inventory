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
import {
  CreateProductInventoryDto,
  UpdateProductInventoryDto,
} from '../dto/create-product-inventory.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUser, JwtAuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';

@ApiBearerAuth('JWT')
@ApiTags('Product-inventory')
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
    const user = req.user as IUser;
    console.log('Authenticated user:', user);
    return this.productInventoryService.addProduct(
      createProductInventoryDto,
      user._id,
    );
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) {
    const user = req.user as IUser;
    return this.productInventoryService.findAll({ userId: user._id });
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
    return this.productInventoryService.update(id, updateProductInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productInventoryService.remove(id);
  }

  @Patch(':id/add-quantity/:amount')
  @UseGuards(JwtAuthGuard)
  updateQuantity(@Param('id') id: string, @Param('amount') amount: number) {
    return this.productInventoryService.updateQuantity(id, amount);
  }
}
