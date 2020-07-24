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
            type="number"
            v-model.number="squareWarm"
          />
        </div>
        <v-flex class="align-self-center ml-2">m&sup2;</v-flex>
      </div>
      <div class="d-flex col-md-6 item-category">
        <h3 class="d-flex align-self-center mr-4">
          Длина углов здания и дверных проемов.
        </h3>
        <div class="result-100">
          <v-text-field
            @change="inputSquareWarm(squareWarm)"
            @keyup.enter="inputSquareWarm(lengthDoors)"
            class="result-100"
            id="custom2"
            placeholder="...m"
            required
            type="number"
            v-model.number="lengthDoors"
          />
        </div>
        <v-flex class="align-self-center ml-2">m</v-flex>
      </div>
      <div class="d-flex col-md-6 item-category">
        <h3 class="d-flex align-self-center mr-4">
          Длина оконных проемов.
        </h3>
        <div class="result-80">
          <v-text-field
            @change="inputSquareWarm(squareWarm)"
            @keyup.enter="inputSquareWarm(lengthWin)"
            class="result-100"
            id="custom1"
            placeholder="...m"
            required
            type="number"
            v-model.number="lengthWin"
          />
        </div>
        <v-flex class="align-self-center ml-2">m</v-flex>
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
          v-for="(category, categoryKey) in allProducts().registry"
          >{{ category.name }}
        </v-btn>
      </v-col>
      <v-col :key="productSelectionOnChange" class="md-6 main-windows" cols="6">
        <v-flex
          :key="product.idInn"
          class="d-flex align-self-center"
          v-for="product in categoryProductsList()"
        >
          <v-checkbox
            @change="selectDataWarm(product)"
            v-model="product.selected"
          ></v-checkbox>
          <v-flex class="choice-table text-left align-self-center">
            {{ product.name }}
          </v-flex>
        </v-flex>
      </v-col>
    </v-row>
    <v-row
      :key="receiptOnChange"
      class="text-center forPrint justify-center mt-8"
    >
      <v-col class="main-windows" cols="10">
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
            >{{ product.need }} {{ product.unit_size }}
          </v-flex>
          <v-flex class="result-100 d-flex align-self-center justify-center ">
            <v-icon
              :id="`icon-${product.key}`"
              @click="deleteItemWarm(product.categoryName, product.productId)"
            >
              mdi-delete
            </v-icon>
          </v-flex>
        </v-flex>
      </v-col>
    </v-row>
    <v-row id="element-to-print-warm" class="divPDF" justify="center">
      <v-col cols="10" class="text-center">
        <img src="img/main-print.jpg" alt="logo" />
      </v-col>
      <table>
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
          <td>{{ product.need }} {{ product.unit_size }}</td>
        </tr>
      </table>
    </v-row>
    <v-row class="d-flex mt-6 justify-center">
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
    <v-row class="d-flex mt-6 justify-center">
      <social-sharing inline-template url="https://vuejs.org/">
        <div class="ml-6 d-flex">
          <div class="mx-4 pt-1 share-network">
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
              <img src="img/whatsapp.png" height="32px" alt="WhatsApp" />
            </ShareNetwork>
          </div>
        </div>
      </social-sharing>
    </v-row>
    <v-row class=" pl-6">
      <div class="col-10 " style="padding-left: 64px">
        * необязательный параметр
      </div>
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
    productSelectionOnChange: 0,
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
        const entry = receipt[key];
        const product =
          allProducts.registry[entry.categoryName].products[entry.productId];
        return {
          key: key,
          name: product.name,
          productId: product.idInn,
          categoryName: entry.categoryName,
          surface: this.squareWarm,
          measure: product.measure,
          resultCalc: product.resultCalcFormula(
            this.squareWarm,
            0,
            0,
            product.density
          ),
          unit: product.unit,
          need: product.needFormula(
            this.squareWarm,
            0,
            0,
            product.density,
            product.weight
          ),
          unit_size: product.unit_size
        };
      });
    },
    categoryProductsList() {
      const category = this.categorySelected;
      return this.allProducts()
        .registry[category].products.map(product => {
          return {
            selected: this.receipt.has(category, product.idInn),
            categoryName: category,
            productId: product.idInn,
            shown: product.shown,
            // this.isShown(product),
            name: product.name,
            dependsOut: product.dependsOut
          };
        })
        .filter(product => product.shown);
    },
    isShown(product) {
      const deps = product.dependsOn;
      if (deps === undefined || deps === null || deps.length === 0) {
        return true;
      }
      for (let i = 0; i < deps.length; i++) {
        const dep = deps[i];
        if (this.receipt.has(dep.categoryName, dep.productId)) {
          return true;
        }
      }
      return false;
    },
    startPrinting() {
      document.querySelector("#element-to-print-warm").className =
        "online-table";
      const el = document.querySelector("#element-to-print-warm");
      html2PDF(el, {
        format: "a4",
        mode: "adaptive",
        pagesplit: true,
        offset: {
          x: 10,
          y: 10
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
    forceRenderProductSelection() {
      this.productSelectionOnChange += 1;
    },
    deleteItemWarm(category, id) {
      this.receipt.delete(category, id);
      this.forceRenderReceipt();
      this.forceRenderProductSelection();
    },
    addDependsOut(product) {
      const deps = product.dependsOut
      alert(deps);
      for (let i = 0; i < deps.length; i++) {
        const category = deps[i].categoryName;
        const id = deps[i].productId;
        alert(id);
        this.receipt.add(category, id);
      }
    },
    selectDataWarm(product) {
      const category = product.categoryName;
      const id = product.productId;
      const selected = product.selected;

      if (selected) {
        this.receipt.add(category, id);
        this.addDependsOut(product);
      } else {
        this.receipt.delete(category, id);
      }
      this.forceRenderReceipt();
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
