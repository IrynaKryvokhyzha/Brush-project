<template>
  <main-master-page>
    <article class="brushes__container">
      <div class="filter">
        <label>
          <input v-model="search" placeholder="Search" class="search-input" />
        </label>
      </div>
      <div v-if="isLoading" class="loader">
        <v-progress-circular indeterminate color="green"></v-progress-circular>
      </div>
      <div v-else-if="hasError"></div>
      <article v-else class="brush">
        <div v-for="item in searchResult" :key="item.id" class="brush__item">
          <v-card class="mx-auto" max-width="350">
            <v-img class="img" :src="item.url" height="250px" cover></v-img>
            <v-card-title class="title"> {{ item.title }}</v-card-title>

            <v-card-subtitle>
              {{ getCurrentPrice(item.price) }} {{ getCurrencyTitle }}
            </v-card-subtitle>
            <v-card-subtitle> {{ item.type }} </v-card-subtitle>

            <v-card-actions class="add-to-cart-button">
              <div>
                <v-btn
                  color="light-green-darken-3"
                  variant="text"
                  @click="item.reveal = true"
                >
                  {{ $t("button.readMore") }}
                </v-btn>
                <v-btn
                  color="light-green-darken-3"
                  variant="text"
                  @click="handleButtonTitle(item.id)"
                >
                  {{
                    buttonStates[item.id]
                      ? $t("button.added")
                      : $t("button.addToCart")
                  }}
                </v-btn>
              </div>
              <div>
                <v-btn
                  v-if="userPermissions.update"
                  class="button"
                  @click="onEdit(item.id)"
                  >{{ $t("button.edit") }}</v-btn
                >
                <v-btn
                  v-if="userPermissions.delete"
                  class="button"
                  @click="deleteItem(item.id)"
                  >{{ $t("button.delete") }}</v-btn
                >
              </div>
              <v-spacer></v-spacer>
            </v-card-actions>
            <v-expand-transition>
              <v-card
                v-if="item.reveal"
                class="transition-fast-in-fast-out v-card--reveal"
                style="height: 100%;"
              >
                <v-card-text
                  class="pb-0"
                  style="max-height: 300px; overflow-y: auto;"
                >
                  <p class="text-h4 text--primary">
                    {{ $t("product.titles.productDescription") }}
                  </p>
                  <p>{{ item.description }}</p>
                </v-card-text>
                <v-card-actions class="pt-0">
                  <v-btn text color="teal accent-4" @click="item.reveal = false"
                    >{{ $t("button.close") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-expand-transition>
          </v-card>
        </div>
      </article>
      <v-btn v-if="userPermissions.add" class="button" @click="onAddBrush">{{
        $t("product.titles.addProduct")
      }}</v-btn>
    </article>
  </main-master-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MainMasterPage from "@/masterpages/MainMasterPage.vue";

export default {
  name: "BrushesList",
  components: { MainMasterPage },
  props: {
    brushItem: {
      type: Object,
    },
  },
  data() {
    return {
      reveal: false,
      search: "",
      buttonStates: {},
    };
  },
  computed: {
    ...mapGetters("brushItems", ["getBrushList", "isLoading", "hasError"]),
    ...mapGetters("users", ["userPermissions"]),
    ...mapGetters("currencyList", [
      "getCurrencyTitle",
      "getCurrentPrice",
      "getCurrencyRate",
    ]),
    searchResult() {
      if (this.search) {
        return this.getFilteredBrushList();
      } else return this.getBrushList;
    },
  },
  watch: {
    error(newValue) {
      if (newValue) {
        this.$router.push({
          name: "error",
        });
      }
    },
  },
  created() {
    this.loadBrushList();
  },

  methods: {
    ...mapActions("brushItems", ["loadBrushList", "deleteItem"]),
    ...mapActions("cartList", ["addItemToCart"]),
    handleButtonTitle(itemId) {
      this.onAddToCart(itemId);
      this.buttonStates[itemId] = true;
      setTimeout(() => {
        this.buttonStates[itemId] = false;
      }, 2000);
    },
    onAddBrush() {
      this.$router.push({
        name: "brush-editor",
      });
    },
    onAddToCart(itemId) {
      this.addItemToCart(itemId);
    },
    onEdit(brushId) {
      this.$router.push({
        name: "brush-editor",
        params: {
          brushId: brushId,
        },
      });
    },
    getFilteredBrushList() {
      return this.getBrushList.filter((item) =>
        item.title.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  padding-left: 15px;
  padding-top: 10px;
  max-width: 500px;

  @media (max-width: 1136px) {
    padding-left: 55px;
  }
  @media (max-width: 991px) {
    margin-top: -30px;
    display: block;
    max-width: 500px;
  }
  @media (max-width: 767.98px) {
    display: none;
  }
  @media (max-width: 661px) {
  }
}
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: flex;
  border: 1px solid #6b6a6a;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 24px;
}
.brushes {
  // .brushes__container

  &__container {
    margin-bottom: 200px;
  }
}
.title {
  text-transform: uppercase;
}
.brush {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  row-gap: 30px;
  justify-content: space-between;
  padding-top: 20px;
  margin-bottom: 30px;
  @media (max-width: 1136px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 991px) {
    margin-top: -15px;
  }
  @media (max-width: 767.98px) {
    grid-template-columns: auto;
    justify-content: center;
    margin-top: -50px;
  }
  @media (max-width: 661px) {
    grid-template-columns: auto;
    justify-content: center;
  }
  // .brush__item

  &__item {
    position: relative;
    transition: transform 0.3s ease 0s;

    @media (any-hover: hover) {
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
.img {
}
.add-to-cart-button {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.button {
  border: 2px solid rgba(113, 160, 121, 0.5);
  box-shadow: 5px 5px 5px 1px rgb(86, 132, 98);
}
</style>
