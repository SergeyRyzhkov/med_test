import { Nuxt, Builder } from "nuxt";
import nuxtConfig from "./nuxt.config";

const resetConfig = {
  loading: false,
  loadingIndicator: false,
  fetch: {
    client: false,
    server: false,
  },
  features: {
    store: true,
    layouts: false,
    meta: false,
    middleware: false,
    transitions: false,
    deprecations: false,
    validate: false,
    asyncData: false,
    fetch: false,
    clientOnline: false,
    clientPrefetch: false,
    clientUseUrl: false,
    componentAliases: false,
    componentClientOnly: false,
  },
  build: {
    indicator: false,
    terser: false,
  },
  server: { port: 3001 },
  buildDir: ".nuxt-build-jest",
};

const buildNuxt = async () => {
  const config = { ...nuxtConfig, ...resetConfig };

  const nuxt = new Nuxt(config);
  await new Builder(nuxt).build();
  nuxt.server.listen(3001, "localhost");
  return nuxt;
};

export default buildNuxt;
