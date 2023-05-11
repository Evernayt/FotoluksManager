import { GetFeaturesDto } from '../../api/FeatureAPI/dto/get-features.dto';
import { IData } from '../IData';
import { IFilter } from '../IFilter';

export interface IFeature {
  id: number;
  name: string;
  pluralName: string;
  archive: boolean;
}

export type IFeatureData = IData<IFeature[]>;

export interface IFeaturesFilter extends Partial<IFilter>, GetFeaturesDto {}
