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
      state.filters = data;
    },
  },
  actions: {
    allProducts({ commit }, data) {
      axios
        .get(
          `https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=${data.page}&count=${data.count}&sort_by=&sort_dir=desc&filter=`
        )
        .then((response) => {          
          response.data.result.filters.forEach((element) => {
            element.id = element.filter_lable.split(" ").join("").toLowerCase();
            element.id = element.id.replace(/[^\w\s]/gi, "");            
          });
          response.data.result.products.forEach((element) => {
            element.size = element.size.replace(/\(|\)|\[|\]/g,'').split(",");
            element.allsize = [...element.size]           
          });
          var products = response.data.result.products;
          var filters = response.data.result.filters;
          commit("productsDetails", products);
          commit("filters", filters);
          console.log(products)
        });
    },
  },
  modules: {},
});
