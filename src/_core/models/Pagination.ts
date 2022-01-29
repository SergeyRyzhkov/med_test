import { Expose } from "class-transformer";
import { BaseViewModel } from "./BaseViewModel";

export class Pagination extends BaseViewModel {
  total = 1;
  from = 1;
  to = 1;
  selectedPages: number[] = [];

  @Expose({ name: "per_page" })
  perPage = 12;

  @Expose({ name: "current_page" })
  currentPage = 1;

  @Expose({ name: "last_page" })
  lastPage = 0;

  public static createLoadMorePagination(pagination: Pagination) {
    pagination.currentPage = pagination.selectedPages.length > 0 ? Pagination.getLastSelectedPages(pagination) + 1 : 2;
    pagination.selectedPages.push(pagination.currentPage);
    return pagination;
  }

  public static clearSelectedPages(pagination: Pagination) {
    pagination.selectedPages = [];
  }

  public static getLastSelectedPages(pagination: Pagination) {
    if (pagination.selectedPages.length === 0 && !!pagination.currentPage) {
      pagination.selectedPages.push(pagination.currentPage);
    }
    return pagination.selectedPages.slice(-1)[0];
  }

  public static loadMoreHasNextPage(pagination: Pagination) {
    return Pagination.getLastSelectedPages(pagination) < pagination.lastPage;
  }
}
