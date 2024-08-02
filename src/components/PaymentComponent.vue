<template>
  <div class="payment__container">
    <div class="content">
      <stripe-card-component class="stripe" :totalPrice="totalPrice" />
      <cart-component class="cart" @checkout="handleCheckout" />
    </div>
    <div class="btn">
      <button class="button-white" @click="onHome">
        {{ $t("button.keepShopping") }}
      </button>
    </div>
  </div>
</template>

<script>
import CartComponent from "./cart/CartComponent.vue";
import StripeCardComponent from "./StripeCardComponent.vue";

export default {
  name: "PaymentComponent",
  components: {
    StripeCardComponent,
    CartComponent,
  },
  data() {
    return {
      totalPrice: 0,
    };
  },
  mounted() {
    console.log("PaymentComponent mounted with totalPrice:", this.totalPrice);
  },
  methods: {
    handleCheckout(totalPrice) {
      console.log("Checkout totalPrice:", totalPrice);
      this.totalPrice = totalPrice;
    },
    onHome() {
      this.$router.push({
        name: "home",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.payment__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  @media (max-width: 768px) {
    padding: 0;
  }
}
.content {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  padding: 20px;
  @media (max-width: 1003px) {
    grid-template-columns: 1fr;
  }
}
.stripe {
  height: 300px;
}
.cart {
  padding: 0 10px;
}
.btn {
  align-self: center;
}
</style>
