<template>
  <div class="row">
    <div class="col-md-2 sidebar-main">
      <nav id="sidebar">
        <div class="sidebar-header">
          <h3 class="font-bold">Filter</h3>
        </div>
        <div class="accordion" id="filterAccordion">
          <div
            class="accordion-item"
            v-for="(filter, index) in filters"
            :key="index"
          >
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#' + filter.id"
                aria-expanded="true"
                :aria-controls="filter.id"
              >
                {{ filter.filter_lable }}
              </button>
            </h2>
            <div
              :id="filter.id"
              class="accordion-collapse collapse"
              data-bs-parent="#filterAccordion"
            >
              <li
                class="list-unstyled"
                v-for="option in filter.options"
                :key="option.value_key"
              >
                <a href="#"
                  ><input
                    type="checkbox"
                    class="checkbox"
                    v-model="isFilter"
                    @change="filterProduct(option.value)"
                  /><span>{{ option.value }} ({{ option.total }})</span></a
                >
              </li>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="col-md-10 product-list">
      <div class="row">
        <div class="col-md-12">
          <div class="col-md-12">
            <div class="row sort-item-count">
              <div class="col-md-6 item-count">
                {{ productsDetails.length }} Items
              </div>
              <div class="col-md-6">
                <select
                  value="product_position"
                  class="form-control product-sort"
                >
                  <option value="price_low">Price (Low to High)</option>
                  <option value="selling_price">Price (High to Low)</option>
                  <option value="discount">Discount</option>
                  <option value="price" style="display: none">Price</option>
                  <option selected="selected" value="product_position">
                    Newest
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 products"></div>
        <div
          class="col-md-3 col-sm-6 col-xs-6 col-6"
          id="productSection"
          v-for="product in productsDetails"
          :key="product.id"
        >
          <div class="slide-box">
            <div class="product-box">
              <a :href="product.image" class="view-detail"> View Detail </a>
              <a :href="product.image">
                <img
                  :src="product.image"
                  alt="Orange Pleated Kurta-Slim Pants Set"
                  title="Orange Pleated Kurta-Slim Pants Set"
                />
              </a>
            </div>
            <p>
              <a href="">{{ product.name }}</a>
            </p>
            <p>Rs.{{ product.price }}</p>
            <div class="size">
              <p>
                Size -
                <span v-for="size in product.size" :key="size"
                  >{{ size }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "KurtaList",
  data() {
    return {
      moreData: {
        page: 1,
        count: 20,
      },
      isFilter: false,
    };
  },
  computed: {
    ...mapState(["filters", "productsDetails"]),
  },
  mounted() {
    this.apiCall(this.moreData);
    this.loadProduct();
  },
  methods: {
    loadProduct() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
            this.moreData.page = this.moreData.page + 1;
            this.moreData.count = this.moreData.count + 20;
            this.apiCall(this.moreData);
        }
      };
    },
    apiCall(moreData) {
      this.$store.dispatch("allProducts", moreData);
    },
    filterProduct(filtervalue) {
      this.isFilter = !this.isFilter;
      if (this.isFilter) {
        this.productsDetails = this.productsDetails.filter(
          (product) => product.category === filtervalue
        );
      }
    },
  },
};
</script>
<style scoped src="../style/style.css"></style>
