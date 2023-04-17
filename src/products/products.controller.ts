import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorators';
import { User } from 'src/auth/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiTags('products')
@Controller('products')
// @Auth( ValidRoles.admin ) // This is a global guard

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth()
  @ApiResponse({status:201,description:'The product has been successfully created.',type:Product})
  @ApiResponse({status:403,description:'Forbidden. Token related error.'})
  @ApiResponse({status:401,description:'Unauthorized. Token related error.'})
  @ApiResponse({status:400,description:'Bad Request. Validation error.'})
  create(@Body() createProductDto: CreateProductDto, @GetUser() user:User) {
   
    return this.productsService.create(createProductDto,user);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id:string){
    return this.productsService.findOnePlain(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @GetUser() user:User) {
    return this.productsService.update(id, updateProductDto,user);
  }

  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id:string){
    return this.productsService.remove(id);
  }
}
