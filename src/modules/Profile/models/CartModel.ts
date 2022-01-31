import TrainingModel from "@/modules/Training/models/TrainingModel";
import { BaseViewModel } from "@/_core/models/BaseViewModel";

export default class CartModel extends BaseViewModel {
  id: number;
  user_id: number | null;
  product_list: TrainingModel[] = [];
}
