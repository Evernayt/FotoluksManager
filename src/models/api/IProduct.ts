import { GetProductsDto } from '../../api/ProductAPI/dto/get-products.dto';
import { IData } from '../IData';
import { IFilter } from '../IFilter';
import { ICategory } from './ICategory';
import { IType } from './IType';

export interface IProduct {
  id: number;
  name: string;
  pluralName: string;
  description: string;
  image: string;
  archive: boolean;
  category?: ICategory;
  types?: IType[];
}

export type IProductData = IData<IProduct[]>;

export interface IProductsFilter extends Partial<IFilter>, GetProductsDto {}
