import { Model as BaseModel } from "vue-api-query";

export default class Model extends BaseModel {
  baseURL() {
    return process.env.VUE_APP_URL || "http://localhost:4000";
  }

  request(config) {
    return this.$http.request(config);
  }
}

