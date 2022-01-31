import { Module, VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator";

@Module({
  name: "CartStore",
  stateFactory: true,
  namespaced: true,
})
export default class CartStore extends VuexModule {
  private productIdListState: number[] = [];

  @VuexMutation
  private _addProductId(id: number) {
    this.productIdListState.push(id);
  }

  @VuexMutation
  private _clear() {
    this.productIdListState = [];
  }

  @VuexMutation
  private _setProductIdList(ids: number[]) {
    this.productIdListState = ids;
  }

  @VuexAction
  addProductId(id: number) {
    this._addProductId(id);
  }

  @VuexAction
  setProductIdList(ids: number[]) {
    this._setProductIdList(ids);
  }

  @VuexAction
  clear() {
    this._clear();
  }

  get productIdList() {
    return this.productIdListState;
  }

  get cartItemsCount() {
    return this.productIdListState?.length;
  }
}
