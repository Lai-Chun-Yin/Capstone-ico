import * as Raven from "raven-js";

function init() {
  Raven.config("https://91edd81c00144fa8b680b002cb7d5ee8@sentry.io/1273221", {
    release: "0-2-0",
    environment: "development-test"
  }).install();
}

function log(error: any) {
  Raven.captureException(error);
  console.error(error);
}

export default {
  init,
  log
};
