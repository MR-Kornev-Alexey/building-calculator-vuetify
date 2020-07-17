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
          :key="index.id_cat"
          @click="choiceWarm(index.id_cat)"
          class="btn-cat"
          color="#444fee"
          outlined
          text
          v-for="index in categoryWarm"
          >{{ index.name }}
        </v-btn>
      </v-col>
      <v-col class="md-6 main-windows" cols="6">
        <v-flex
          :key="index.idInn"
          class="d-flex align-self-center"
          v-for="index in warmWindows"
        >
          <v-checkbox
            :checked="checked"
            @change="selectDataWarm(index.idInn)"
            v-model="index.selected"
          ></v-checkbox>
          <v-flex class="choice-table text-left align-self-center">
            {{ index.name }}
          </v-flex>
        </v-flex>
      </v-col>
    </v-row>
    <v-row
      class="text-center forPrint justify-center mt-8"
      v-if="flagWarmEstimate"
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
          :key="index.idInn"
          class="d-flex align-content-center choice-table-down"
          v-for="index in outEstimateWarm"
        >
          <v-flex class="d-flex align-self-center result-name">
            {{ index.name }}
          </v-flex>
          <v-flex class="d-flex align-self-center justify-center result-110">
            {{ index.surface }} {{ index.measure }}
          </v-flex>
          <v-flex
            class="result-100  d-flex d-flex align-self-center justify-center "
            >{{ index.resultCalc }} {{ index.unit }}
          </v-flex>
          <v-flex class="result-100  d-flex align-self-center justify-center "
            >{{ index.need }} шт.
          </v-flex>
          <v-flex class="result-100 d-flex align-self-center justify-center ">
            <v-icon :id="index.type" @click="deleteItemWarm(index.type)">
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
        <tr :key="index.idInn" v-for="index in outEstimateWarm">
          <td>{{ index.name }}</td>
          <td>{{ index.surface }} {{ index.measure }}</td>
          <td>{{ index.resultCalc }} {{ index.unit }}</td>
          <td>{{ index.need }} шт.</td>
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
import html2PDF from "html-pdf-adaptive";
import warmMaterials from "../common/buildWarmRegistry";

const constantRegistry = require("../common/product_registry.js");
const isEm = require("../common/isEmty");
import Vue from "vue";
import SocialSharing from "vue-social-sharing";

Vue.use(SocialSharing);
import vPrint from "./v-print";

export default {
  name: "v-warm",
  components: {
    SocialSharing,
    vPrint
  },
  data: () => ({
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
    registry: constantRegistry,
    categoryWarm: [
      {
        id_cat: 0,
        name: "Утеплитель",
        materials: warmMaterials.tileInsulationDefault
      },
      {
        id_cat: 1,
        name: "Декоративная штукатурка",
        materials: warmMaterials.plasteringDefault
      },
      {
        id_cat: 2,
        name: "Краска фасадная",
        materials: warmMaterials.tilePaintingDefault
      }
    ]
  }),
  mounted() {
    this.flagPrint = "element-to-print-warm";
  },
  methods: {
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

    deleteItemWarm(id) {
      this.flagWarmEstimate = false;
      delete this.outEstimateWarm[id];
      if (!isEm.isEmpty(this.outEstimateWarm)) {
        this.flagWarmEstimate = true;
      }
    },
    selectDataWarm(i) {
      this.flagWarmEstimate = false;
      this.outEstimateWarm[this.warmWindows[i].type] = this.warmWindows[i];
      this.changeDataSquare(this.outEstimateWarm);
      this.flagWarmEstimate = true;
    },
    choiceWarm(i) {
      this.warmWindows = this.categoryWarm[i].materials()
      this.btnResetWarm = true;
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
