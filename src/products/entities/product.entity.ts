import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { ManyToOne } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Product {
  @ApiProperty({
    example: 'aedac0ff-2505-427d-8c26-eac2001cfd57',
    description: 'The unique identifier of the product',
    uniqueItems: true    
  })
  @PrimaryGeneratedColumn('uuid')
  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  @ApiProperty({
    example: 'Nike Air Max 270',
    description: 'The title of the product',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({ example: 100, description: 'The price of the product' })
  @Column('numeric', { default: 0 })
  price: number;

  @ApiProperty({
    example: `The Men's shies features a uniquely fit,`,
    description: 'The description of the product',
    default: null
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty(
    {
      example: 'nike_air_max_270',
      description: 'The slug of the product',
      uniqueItems: true
    }
  )
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty(
    {
      example: 10,
      description: 'The stock of the product',
      default: 0
    }
  )
  @Column('int', {
    default: 0,
  })
  stock: number;

  @ApiProperty({
    example: ['S', 'M', 'L', 'XL'],
    description: 'The sizes of the product',
    default: [],
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty(
    {
      example:'Women',
      description:'The genders availables for the product',
    }
  )
  @Column('text')
  gender: string;

  @ApiProperty()
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty()
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug.toLowerCase().replace(' ', '_').replace("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug.toLowerCase().replace(' ', '_').replace("'", '');
  }
}
