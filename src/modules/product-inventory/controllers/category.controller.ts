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
import { CategoryService } from '../services/category.service';
import {
  CreateCategoryDto,
  CreateProductInventoryDto,
} from '../dto/create-product-inventory.dto';
import { UpdateProductInventoryDto } from '../dto/update-product-inventory.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';

@ApiBearerAuth('JWT')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: Request) {
    const user = req.user as string;
    console.log('Authenticated user in category:', user);
    return this.categoryService.addCategory(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, createCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
