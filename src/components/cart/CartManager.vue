<template>
  <section class="cart-manager">
    <article class="cart-page page">
      <button class="close-cart-button" @click="closeCart">
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </button>
      <h2>{{ $t("cart.myCart") }}</h2>
      <CartComponent @update-total="updateTotalPrice" />
      <div class="page__checkout-buttons">
        <button class="button-white" @click="closeCart">
          {{ $t("button.keepShopping") }}
        </button>
        <button class="button-black" @click="onCheckout">
          {{ $t("button.checkout") }}
        </button>
      </div>
    </article>
  </section>
</template>

<script>
import CartComponent from "./CartComponent.vue";

export default {
  name: "CartManager",
  components: {
    CartComponent,
  },
  data() {
    return {
      totalPrice: 0,
    };
  },

  methods: {
    onCheckout() {
      this.$emit("checkout", this.totalPrice);
      console.log("Emitting checkout with totalPrice:", this.totalPrice);
      this.$router.push({
        name: "payment",
      });
    },
    closeCart() {
      this.$emit("close-cart");
    },
    updateTotalPrice(total) {
      this.totalPrice = total;
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 24px;
}
</style>
