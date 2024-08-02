<template>
  <section class="cart__container">
    <article class="cart-page page">
      <!-- <button class="close-cart-button" @click="closeCart"> -->
      <!-- <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </button> -->
      <div v-for="itemId in getCartList" :key="itemId" class="page__item">
        <div class="cart__products products">
          <div class="products__products-image">
            <img :src="getItemImage(itemId.id)" alt="product image" />
          </div>
          <div class="products__product-content content-product">
            <div class="content-product__title">
              {{ getItemTitle(itemId.id) }}
            </div>
            <!-- Зробити кнопки + та - щоб кількість коригувати -->
            <div>{{ $t("cart.quantity") }}: {{ itemId.quantity }}</div>
            <div class="content-product__price">
              {{ getCurrentPrice(getItemPriceWithQuantity(itemId.id)) }}
              {{ getCurrencyTitle }}
            </div>
            <div class="content-product__item-price">
              ({{ getCurrentPrice(getItemPrice(itemId.id)) }}
              {{ getCurrencyTitle }} / {{ $t("cart.item") }})
            </div>
            <button
              class="button-remove"
              variant="text"
              @click="rejectItem(itemId.id)"
            >
              {{ $t("cart.remove") }}
            </button>
          </div>
        </div>
      </div>
      <div class="page__actions">
        <div class="subtotal">
          {{ $t("cart.subtotal") }}: {{ totalPrice }}
          {{ getCurrencyTitle }}
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CartComponent",

  computed: {
    ...mapGetters("brushItems", ["getBrushList", "getBrushById"]),
    ...mapGetters("procreateItems", ["getSetItemsList"]),
    ...mapGetters("travelItems", ["getTravelKitItemsList"]),
    ...mapGetters("currencyList", [
      "getCurrencyTitle",
      "getCurrentPrice",
      "getCurrencyRate",
    ]),
    ...mapGetters("cartList", ["getCartList", "getItemById"]),
    totalPrice() {
      return (
        this.getCartList.reduce((totalPrice, item) => {
          const price = this.getItemPriceWithQuantity(item.id);

          return totalPrice + price;
        }, 0) * this.getCurrencyRate
      );
    },
  },
  watch: {
    totalPrice(newValue) {
      this.$emit("update-total", newValue);
    },
  },
  created() {
    this.$i18n.locale = localStorage.getItem("lastLanguage") || "en";
    if (localStorage.getItem("lastLanguage") !== this.$i18n.locale) {
      localStorage.setItem("lastLanguage", this.$i18n.locale);
      // window.dispatchEvent(new Event('storage'))
    }
    const self = this;
    window.addEventListener("storage", function () {
      if (self.$i18n.locale !== localStorage.getItem("lastLanguage")) {
        self.$i18n.locale = localStorage.getItem("lastLanguage");
        self.$router.go();
      }
    });
  },
  methods: {
    ...mapActions("cartList", ["loadCartList", "rejectItem"]),
    onAddBrush() {
      this.$router.push({
        name: "brush-editor",
      });
    },
    closeCart() {
      this.$emit("close-cart");
    },
    getItemImage(itemId) {
      const brush = this.getBrushList.find((item) => item.id == itemId);
      const setItem = this.getSetItemsList.find((item) => item.id == itemId);
      const kitItem = this.getTravelKitItemsList.find(
        (item) => item.id == itemId
      );
      if (brush) {
        return brush.url;
      } else if (setItem) {
        return setItem.url;
      } else if (kitItem) {
        return kitItem.url;
      } else {
        return require("@/images/brushes/brushes2.webp");
      }
    },
    getItemTitle(itemId) {
      const brush = this.getBrushList.find((item) => item.id == itemId);
      const setItem = this.getSetItemsList.find((item) => item.id == itemId);
      const kitItem = this.getTravelKitItemsList.find(
        (item) => item.id == itemId
      );
      if (brush) {
        return brush.title;
      } else if (setItem) {
        return setItem.title;
      } else if (kitItem) {
        return kitItem.title;
      } else {
        return "";
      }
    },
    getItemPrice(itemId) {
      const brush = this.getBrushList.find((item) => item.id == itemId);
      const setItem = this.getSetItemsList.find((item) => item.id == itemId);
      const kitItem = this.getTravelKitItemsList.find(
        (item) => item.id == itemId
      );
      if (brush) {
        return brush.price;
      } else if (setItem) {
        return setItem.price;
      } else if (kitItem) {
        return kitItem.price;
      } else {
        return 0;
      }
    },
    getItemPriceWithQuantity(itemId) {
      const cartItem = this.getItemById(itemId);
      return this.getItemPrice(itemId) * cartItem.quantity;
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 24px;
}
</style>
