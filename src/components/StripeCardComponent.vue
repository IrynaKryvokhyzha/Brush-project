<template>
  <div class="stripe">
    <form @submit.prevent="handleSubmit">
      <h2>Payment</h2>
      <div class="payment-method">
        <label for="card-element" class="payment-method__label">
          Credit card
          <div class="payment-icons">
            <img
              src="https://img.icons8.com/color/48/000000/visa.png"
              alt="Visa"
            />
            <img
              src="https://img.icons8.com/color/48/000000/mastercard.png"
              alt="MasterCard"
            />
          </div>
        </label>
        <div ref="cardElement" id="card-element"></div>
        <button type="submit" class="button">Submit payment</button>
      </div>
      <p v-if="message" class="error-message">{{ message }}</p>
    </form>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";

export default {
  name: "StripeCardComponent",
  props: {
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      stripe: null,
      card: null,
      message: "",
    };
  },
  async mounted() {
    console.log(
      "StripeCardComponent mounted with totalPrice:",
      this.totalPrice
    );
    this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
    const elements = this.stripe.elements();
    this.card = elements.create("card", {
      style: {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    });
    this.card.mount(this.$refs.cardElement);

    this.card.on("focus", () => {
      this.message = "";
    });
    this.card.on("blur", () => {
      this.message = "";
    });
  },

  methods: {
    async handleSubmit() {
      const { paymentMethod, error } = await this.stripe.createPaymentMethod({
        type: "card",
        card: this.card,
        billing_details: {
          name: "Cardholder Name",
        },
      });
      if (error) {
        console.error(error);
        this.message = error.message;
        return;
      } else {
        console.log("Payment method created:", paymentMethod);

        console.log("Payment Method ID:", paymentMethod.id);
        console.log("Total Price:", this.totalPrice);
        try {
          const response = await fetch(
            "https://us-central1-dr-brushes.cloudfunctions.net/createPaymentIntent",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                paymentMethodId: paymentMethod.id,
                amount: this.totalPrice * 100, // Convert to cents
              }),
            }
          );
          const result = await response.json();

          if (result.error) {
            console.log("Error from server:", result.error);
            this.$router.push({
              name: "error",
            });
            return;
          }
          console.log("Payment successful:", result);
          if (!result.paymentIntent || !result.paymentIntent.someArray) {
            console.error("Unexpected result structure:", result);
            this.message = result.error;
            return;
          }
          //  this.$router.push({
          //    name: "payment-success",
          //  });
        } catch (fetchError) {
          console.error("Failed to fetch:", fetchError);
          this.message = fetchError.message;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.stripe {
  padding: 30px 10px;
  width: 100%;
  margin: 0 auto;

  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
h2 {
  font-size: 28px;
  padding-bottom: 10px;
}
#card-element {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.payment-method {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.payment-method__label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  margin-bottom: 10px;
}
.error-message {
  color: red;
  padding: 5px;
}
</style>
