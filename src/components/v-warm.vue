<template>
  <v-container class="v-warm">
    <v-row>
      <h1>Расчет системы фасадной теплоизоляции</h1>
    </v-row>
    <v-row class="d-block align-content-center">
      <div class="d-flex col-md-6  item-category">
        <h3 class="d-flex align-self-center mr-4">
          Введите площадь теплоизоляции
        </h3>
        <div class="result-100">
          <v-text-field
            @change="inputSquareWarm(squareWarm)"
            @keyup.enter="inputSquareWarm(squareWarm)"
            id="custom"
            placeholder="...m2"
            required
            type="text"
            v-model.number="squareWarm"
          />
        </div>
      </div>
      <div class="d-flex col-md-6 item-category">
        <h3 class="d-flex align-self-center mr-4">
          Введите длину углов здания и дверных проемов.
        </h3>
        <div class="result-100">
          <v-text-field
            @change="inputSquareWarm(squareWarm)"
            @keyup.enter="inputSquareWarm(lengthDoors)"
            class="result-100"
            id="custom2"
            placeholder="...m"
            required
            type="text"
            v-model.number="lengthDoors"
          />
        </div>
      </div>
      <div class="d-flex col-md-6 item-category">
        <h3 class="d-flex align-self-center mr-4">
          Введите длину оконных проемов.
        </h3>
        <div class="result-80">
          <v-text-field
            @change="inputSquareWarm(squareWarm)"
            @keyup.enter="inputSquareWarm(lengthWin)"
            class="result-100"
            id="custom1"
            placeholder="...m"
            required
            type="text"
            v-model.number="lengthWin"
          />
        </div>
      </div>
    </v-row>
    <v-row class="text-center justify-center mt-8">
      <v-col cols="4">
        <v-btn
          :key="categoryKey"
          @click="chooseCategory(categoryKey)"
          class="btn-cat"
          color="#444fee"
          outlined
          text
          v-for="(category, categoryKey) in allProducts()"
          >{{ category.name }}
        </v-btn>
      </v-col>
      <v-col class="md-6 main-windows" cols="6">
        <v-flex
          :key="product.idInn"
          class="d-flex align-self-center"
          v-for="product in categoryProductsList()"
        >
          <v-checkbox
            @change="
              selectDataWarm(product.category, product.id, !product.selected)
            "
            v-model="product.selected"
          ></v-checkbox>
          <v-flex class="choice-table text-left align-self-center">
            {{ product.name }}
          </v-flex>
        </v-flex>
      </v-col>
    </v-row>
    <v-row
      class="text-center forPrint justify-center mt-8" key="receipt"
    >
      <v-col class="main-windows" cols="10" :key="receiptOnChange">
        <div class="d-flex">
          <v-flex class="result-name">Наименование материала</v-flex>
          <v-flex class="result-100 ">Размер</v-flex>
          <v-flex class="result-100 ">Расход</v-flex>
          <v-flex class="result-100 ">Количество</v-flex>
          <v-flex class="result-100 "></v-flex>
        </div>

        <v-flex
          :key="product.key"
          class="d-flex align-content-center choice-table-down"
          v-for="product in renderReceipt()"
        >
          <v-flex class="d-flex align-self-center result-name">
            {{ product.name }}
          </v-flex>
          <v-flex class="d-flex align-self-center justify-center result-110">
            {{ product.surface }} {{ product.measure }}
          </v-flex>
          <v-flex
            class="result-100  d-flex d-flex align-self-center justify-center "
            >{{ product.resultCalc }} {{ product.unit }}
          </v-flex>
          <v-flex class="result-100  d-flex align-self-center justify-center "
            >{{ product.need }} шт.
          </v-flex>
          <v-flex class="result-100 d-flex align-self-center justify-center ">
            <v-icon :id="`icon-${product.key}`" @click="deleteItemWarm(product.categoryName, product.productId)">
              mdi-delete
            </v-icon>
          </v-flex>
        </v-flex>
      </v-col>
    </v-row>
    <v-row>
      <table id="element-to-print-warm">
        <tr>
          <th colspan="3">Площадь теплоизоляции</th>
          <th>{{ this.squareWarm }}</th>
        </tr>
        <tr>
          <th colspan="3">Длина углов здания и дверных проемов</th>
          <th>{{ this.lengthDoors }}</th>
        </tr>
        <tr>
          <th colspan="3">Длина оконных проемов</th>
          <th>{{ this.lengthWin }}</th>
        </tr>
        <tr>
          <th>Название</th>
          <th>Размер</th>
          <th>Расход</th>
          <th>Требуется</th>
        </tr>
        <tr :key="product.idInn" v-for="product in renderReceipt()">
          <td>{{ product.name }}</td>
          <td>{{ product.surface }} {{ product.measure }}</td>
          <td>{{ product.resultCalc }} {{ product.unit }}</td>
          <td>{{ product.need }} шт.</td>
        </tr>
      </table>
    </v-row>
    <v-row class="d-flex mt-6">
      <v-btn
        @click="startPrinting()"
        class="btn-cat"
        color="#444fee"
        outlined
        text
        >Сохранить PDF
      </v-btn>
      <vPrint :printChoice="this.flagPrint" />
    </v-row>
    <v-row>
      <social-sharing inline-template url="https://vuejs.org/">
        <div class="ml-6 d-flex">
          <div class="mr-4 share-network">
            Поделиться
          </div>
          <div class="mr-4 share-network">
            <ShareNetwork
              description="Онлайн-расчет количества необходимых материалов. Удобно и быстро"
              hashtags="строительныйкалькулятор"
              network="whatsapp"
              quote="Онлайн-расчет количества необходимых материалов"
              title="Онлайн-расчет количества необходимых материалов. Удобно и быстро"
              url="http://calc.mrk.digital/"
            >
              Whatsapp
            </ShareNetwork>
          </div>
          <div class="mr-4 share-network">
            <ShareNetwork
              description="Онлайн-расчет количества необходимых материалов. Удобно и быстро"
              hashtags="строительныйкалькулятор"
              network="vk"
              quote="Онлайн-расчет количества необходимых материалов"
              title="Онлайн-расчет количества необходимых материалов. Удобно и быстро"
              url="http://calc.mrk.digital/"
            >
              ВКонтакте
            </ShareNetwork>
          </div>
          <div class="mr-4 share-network">
            <ShareNetwork
              description="Онлайн-расчет количества необходимых материалов. Удобно и быстро"
              hashtags="строительныйкалькулятор"
              network="facebook"
              quote="Онлайн-расчет количества необходимых материалов"
              title="Онлайн-расчет количества необходимых материалов. Удобно и быстро"
              url="http://calc.mrk.digital/"
            >
              Facebook
            </ShareNetwork>
          </div>
        </div>
      </social-sharing>
    </v-row>
  </v-container>
</template>

<script>
import Receipt from "../common/receipt";
import html2PDF from "html-pdf-adaptive";
import warmMaterials from "../common/buildWarmRegistry";
import Vue from "vue";
import SocialSharing from "vue-social-sharing";
import vPrint from "./v-print";

const constantRegistry = require("../common/product_registry.js");
const isEm = require("../common/isEmty");

Vue.use(SocialSharing);

export default {
  name: "v-warm",
  components: {
    SocialSharing,
    vPrint
  },
  data: () => ({
    receiptOnChange: 0,
    receipt: new Receipt(),
    categorySelected: "tileInsulation",
    btnResetWarm: false,
    checked: false,
    flagPrint: "",
    lengthWin: "",
    outEstimateWarm: {},
    flagWarmEstimate: false,
    squareWarm: "",
    lengthDoors: "",
    warmWindows: "",
    flagCategoryWarm: "",
    registry: constantRegistry
  }),
  mounted() {
    this.flagPrint = "element-to-print-warm";
  },
  methods: {
    allProducts() {
      return warmMaterials;
    },
    renderReceipt() {
      const allProducts = this.allProducts();
      const receipt = this.receipt.getAll();
      return Object.keys(receipt).map(key => {
        const entry = receipt[key]
        const product = allProducts[entry.categoryName].products[entry.productId];
        return {
          key: key,
          name: product.name,
          productId: product.idInn,
          categoryName: entry.categoryName,
          surface: 0,
          measure: 0,
          resultCalc: 0,
          unit: 0,
          need: 0
        };
      });
    },
    categoryProductsList() {
      const category = this.categorySelected;
      return warmMaterials.registry[category].products.map(product =>
        Object.assign(
          {
            selected: this.receipt.has(category, product.idInn),
            category: category
          },
          product
        )
      );
    },
    startPrinting() {
      document.querySelector("#element-to-print-warm").className =
        "online-table";
      const el = document.querySelector("#element-to-print-warm");
      html2PDF(el, {
        mode: "adaptive",
        pagesplit: true,
        offset: {
          x: 20,
          y: 20
        },
        outputType: "save",
        isToggleStyle: true,
        useCORS: true,
        useDefaultFoot: true
      });
      document.querySelector("#element-to-print-warm").className = "table";
    },
    changeDataSquare(newObj) {
      Object.keys(newObj).forEach(index => {
        const product = newObj[index];
        product.surface = product.resultSurfaceFormula(
          this.squareWarm,
          this.lengthDoors,
          this.lengthWin
        );
        product.resultCalc = product.resultCalcFormula(
          this.squareWarm,
          this.lengthDoors,
          this.lengthWin,
          product
        );
        product.need = product.needFormula(
          this.squareWarm,
          this.lengthDoors,
          this.lengthWin,
          product
        );
      });
    },
    inputSquareWarm(value) {
      this.flagWarmEstimate = false;
      if (!isEm.isEmpty(this.outEstimateWarm)) {
        this.changeDataSquare(this.outEstimateWarm, value);
        this.flagWarmEstimate = true;
      }
    },
    forceRenderReceipt() {
      this.receiptOnChange += 1;
    },
    deleteItemWarm(category, id) {
      this.receipt.delete(category, id);
      this.forceRenderReceipt()
    },
    selectDataWarm(category, id, selected) {
      if (selected) {
        this.receipt.add(category, id);
      } else {
        this.receipt.delete(category, id);
      }
      this.forceRenderReceipt()
    },
    chooseCategory(categoryKey) {
      this.categorySelected = categoryKey;
    }
  }
};
</script>

<style lang="scss">
.item-category,
.v-text-field {
  padding: 0;
  margin: 0;
}

.result-100 {
  width: 70px;

  .v-text-field__slot input {
    width: 30px;
  }
}

#custom,
#custom1,
#custom2 {
  margin-left: 10px;
}
</style>
