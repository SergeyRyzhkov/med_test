import { getModule } from "vuex-module-decorators";
import TrainingModel from "../Training/models/TrainingModel";
import { TrainingService } from "../Training/TrainingService";
import { BaseService } from "@/_core/service/BaseService";
import CartStore from "@/modules/Profile/store/CartStore";
import { ServiceLocator } from "@/_core/service/ServiceLocator";

export class UserCartService extends BaseService {
  private CART_STATE_COOKIE_NAME = "rsn_medtech_educ_test";

  public get сartStore() {
    return getModule(CartStore, this.nuxtContext.store);
  }

  addToCart(product: TrainingModel) {
    this.сartStore.addProductId(product.id);
    this.updateBrowserCartState();
  }

  deleteFromCart(product: TrainingModel) {
    const index = this.сartStore.productIdList.indexOf(product.id);
    if (index > -1) {
      this.сartStore.productIdList.splice(index, 1);
    }
    this.updateBrowserCartState();
  }

  clearCart() {
    this.сartStore.clear();
    this.updateBrowserCartState();
  }

  exists(product: TrainingModel) {
    return this.сartStore.productIdList.includes(product?.id);
  }

  async getTrainingList() {
    const promises = this.сartStore.productIdList.map((iter) =>
      ServiceLocator.instance.getService(TrainingService).getById(iter)
    );
    return await Promise.all(promises);
  }

  restoreBrowserCartState() {
    this.сartStore.setProductIdList(this.nuxtContext.app.$cookies.get(this.CART_STATE_COOKIE_NAME) || []);
  }

  updateBrowserCartState() {
    this.nuxtContext.app.$cookies.set(this.CART_STATE_COOKIE_NAME, this.сartStore.productIdList, {
      maxAge: 60 * 60 * 24 * 30,
    });
  }
}
