import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productsDetails: [],
    filters: [],
  },
  mutations: {
    productsDetails(state, data) {
      state.productsDetails = data;
    },
    filters(state, data) {
      if(state.filters.length === 0) {
        state.filters = data;
      }
    },
  },
  actions: {
    allProducts({ commit }, data) {
      return new Promise((resolve) => {
        axios
          .get(
            `https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=${data.page}&count=${data.count}&sort_by=${data.sort_by}&sort_dir=${data.sort_dir}&filter=${data.filter}`
          )
          .then((response) => {
            response.data.result.filters.forEach((element) => {
              element.id = element.filter_lable
                .split(" ")
                .join("_")
                .toLowerCase();
              element.id = element.id.replace(/[^\w\s]/gi, "_");
            });
            response.data.result.products.forEach((element) => {
              element.size = element.size
                .replace(/\(|\)|\[|\]/g, "")
                .split(",");
              element.allsize = [...element.size];
            });
            var products = response.data.result.products;
            var filters = response.data.result.filters;
            commit("productsDetails", products);
            commit("filters", filters);
            resolve(response);
          })
          .catch((error) => {
            resolve(error);
          });
      });
    },
  },
  modules: {},
});
