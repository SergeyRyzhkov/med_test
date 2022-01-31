import { Context } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import { ServiceLocator } from "@/_core/service/ServiceLocator";
import { UserCartService } from "@/modules/Profile/UserCartService";

export default (ctx: Context, inject: Inject) => {
  ServiceLocator.createFreshServiceLocator();
  ServiceLocator.instance.updateNuxtContext(ctx);

  ServiceLocator.instance.getService(UserCartService).restoreBrowserCartState();

  inject("serviceLocator", ServiceLocator.instance);
};
