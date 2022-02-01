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
  category_id = Math.floor(Math.random() * (6 - 0 + 0) + 0);
}
export const TrainingCategory = [
  { id: 0, name: "Вирусология" },
  { id: 1, name: "Хирургия" },
  { id: 2, name: "Бактериология" },
  { id: 3, name: "Психиатрия" },
  { id: 4, name: "Терапия" },
  { id: 5, name: "Наркология" },
];
