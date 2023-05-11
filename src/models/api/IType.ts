import { GetTypesDto } from '../../api/TypeAPI/dto/get-types.dto';
import { IData } from '../IData';
import { IFilter } from '../IFilter';
import { IFeature } from './IFeature';
import { IParam } from './IParam';
import { IProduct } from './IProduct';

export interface IType {
  id: number;
  name: string;
  price: number;
  image: string;
  archive: boolean;
  features?: IFeature[];
  product?: IProduct;
  params?: IParam[];
}

export type ITypeData = IData<IType[]>;

export interface ITypesFilter extends Partial<IFilter>, GetTypesDto {}
