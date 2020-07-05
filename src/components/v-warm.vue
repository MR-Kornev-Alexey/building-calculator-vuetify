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
            id="custom"
            required
            v-model.number="squareWarm"
            type="text"
            placeholder="...m2"
            @keyup.enter="inputSquareWarm(squareWarm)"
            @change="inputSquareWarm(squareWarm)"
          />
        </div>
      </div>
      <div class="d-flex col-md-6 item-category">
        <h3 class="d-flex align-self-center mr-4">
          Введите длину углов здания и дверных проемов.
        </h3>
        <div class="result-100">
          <v-text-field
            class="result-100"
            id="custom2"
            required
            v-model.number="lengthDoors"
            type="text"
            placeholder="...m"
            @keyup.enter="inputSquareWarm(lengthDoors)"
          />
        </div>
      </div>
      <div class="d-flex col-md-6 item-category">
        <h3 class="d-flex align-self-center mr-4">
          Введите длину оконных проемов.
        </h3>
        <div class="result-80">
          <v-text-field
            class="result-100"
            id="custom1"
            required
            v-model.number="lengthWin"
            type="text"
            placeholder="...m"
            @keyup.enter="inputSquareWarm(lengthWin)"
          />
        </div>
      </div>
    </v-row>
    <v-row class="text-center justify-center mt-8">
      <v-col cols="4">
        <v-btn
          color="#444fee"
          text
          outlined
          v-for="index in registry.categoryWarm"
          :key="index.id_cat"
          @click="choiceWarm(index.id_cat)"
          class="btn-cat"
          >{{ index.name }}
        </v-btn>
      </v-col>
      <v-col cols="6" class="md-6 main-windows">
        <v-flex
          v-for="index in resultTileWarm"
          :key="index.idInn"
          class="d-flex align-self-center"
        >
          <v-checkbox
            :v-model="index.idInn"
            @change="selectDataWarm(index.idInn)"
          ></v-checkbox>
          <v-flex class="choice-table text-left align-self-center">
            {{ index.name }}
          </v-flex>
        </v-flex>
      </v-col>
    </v-row>
    <v-row
      v-if="flagWarmEstimate"
      class="text-center forPrint justify-center mt-8"
    >
      <v-col class="main-windows" cols="10">
        <div class="d-flex">
          <v-flex class="result-name">Наименование материала</v-flex>
          <v-flex class="result-100 ">Площадь (кв.м)</v-flex>
          <v-flex class="result-100 ">Расход</v-flex>
          <v-flex class="result-100 ">Требуется</v-flex>
          <v-flex class="result-100 ">Очистить</v-flex>
        </div>

        <v-flex
          v-for="index in resultEstimateWarm"
          :key="index.idInn"
          class="d-flex align-content-center choice-table-down"
        >
          <v-flex class="d-flex align-self-center result-name">
            {{ index.name }}
          </v-flex>
          <v-flex class="d-flex align-self-center justify-center result-110">
            {{ index.surface }}
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
  </v-container>
</template>

<script>
const constantRegistry = require("../common/product_registry.js");
const isEm = require("../common/isEmty");
export default {
  name: "v-warm",
  data: () => ({
    lengthWin: "",
    outEstimateWarm: {},
    flagWarmEstimate: false,
    squareWarm: "",
    lengthDoors: "",
    warmWindows: "",
    flagCategoryWarm: "",
    registry: constantRegistry
  }),
  computed: {
    resultEstimateWarm() {
      return this.outEstimateWarm;
    },
    resultTileWarm() {
      return this.warmWindows;
    }
  },
  methods: {
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
           product
        );
      });
    },
    inputSquareWarm(value) {
      this.flagWarmEstimate = false;
      this.changeDataSquare(this.outEstimateWarm, value);
      this.flagWarmEstimate = true;
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
      const entry = this.registry[this.flagCategoryWarm][i - 1];
      this.outEstimateWarm[entry.type] = entry;
      this.changeDataSquare(this.outEstimateWarm);
      this.flagWarmEstimate = true;
    },
    choiceWarm(i) {
      this.flagCategoryWarm = "";
      if (i === 1) {
        this.warmWindows = this.registry.tileInsulation;
        this.flagCategoryWarm = "tileInsulation";
      } else if (i === 2) {
        this.warmWindows = this.registry.plastering;
        this.flagCategoryWarm = "plastering";
      } else if (i === 3) {
        this.warmWindows = this.registry.tilePainting;
        this.flagCategoryWarm = "tilePainting";
      }
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
