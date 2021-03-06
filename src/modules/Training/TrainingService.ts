import TrainingModel from "./models/TrainingModel";
import { BaseService } from "@/_core/service/BaseService";
import { Pagination } from "@/_core/models/Pagination";
import Cacheable from "@/_core/MethodCacheDecorator";

export class TrainingService extends BaseService {
  @Cacheable(0)
  async getAll(pagination?: Pagination, _dateFrom?: string, _dateTo?: string) {
    return await this.getArrayOrEmptyWithPagination(
      TrainingModel,
      `training?date_from=${_dateFrom}&date_to=${_dateTo}`,
      {},
      pagination
    );
  }

  @Cacheable(0)
  getBySlug(slug: string) {
    return this.getById(this.getIdBySlug(slug));
  }

  @Cacheable(0)
  getById(id: number) {
    return id ? this.getOneOrDefault(TrainingModel, `training/${id}`) : new TrainingModel();
  }

  async findByNamOrDescription(searchPattern: string) {
    const all = await this.getAll();
    if (!!searchPattern) {
      return all.data?.filter(
        (iter) =>
          iter.name.toUpperCase().includes(searchPattern.toUpperCase()) ||
          iter.description?.toUpperCase().includes(searchPattern.toUpperCase())
      );
    }
    return all.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async filterByCategory({ id, name }) {
    const all = await this.getAll();
    return all.data?.filter((iter) => iter.category_id === id);
  }
}
