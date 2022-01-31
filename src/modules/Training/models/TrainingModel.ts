import SeoModel from "../../../_core/models/SeoModel";

export default class TrainingModel extends SeoModel {
  id: number;
  name: string;
  description?: string;
  location?: string;
  city: string;
  date: string;
  duration?: any;
  price: number;
  price_description: string;
  status: string;
  is_online: boolean;
  lecturer: string;
  lecturer_description?: string;
  lecturer_position?: string;
  days: { name: string; content: string }[] = [];
}
