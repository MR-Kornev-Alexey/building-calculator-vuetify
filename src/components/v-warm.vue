<template>
  <v-container class="v-warm">
    <v-row>
      <h1>Расчет системы фасадной теплоизоляции</h1>
    </v-row>
    <v-row class="d-flex align-content-center">
      <v-col class="align-self-center" cols="6">
        <h3>Введите площадь теплоизоляции</h3>
      </v-col>
      <v-col cols="2">
        <v-text-field
          class="result-100"
          id="custom"
          required
          v-model.number="squareWarm"
          type="text"
          placeholder="...m2"
          @keyup.enter="filterData(index.type)"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex align-content-center">
      <v-col class="align-self-center" cols="6">
        <h3>Введите длину углов здания и дверных проемов.</h3>
      </v-col>
      <v-col cols="2">
        <v-text-field
          class="result-100"
          id="custom"
          required
          v-model.number="lengthDoors"
          type="text"
          placeholder="...m2"
          @keyup.enter="filterData(index.type)"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex align-content-center">
      <v-col class="align-self-center" cols="6">
        <h3>Введите длину оконных проемов.</h3>
      </v-col>
      <v-col cols="2">
        <v-text-field
          class="result-100"
          id="custom"
          required
          v-model.number="lengthDoors"
          type="text"
          placeholder="...m2"
          @keyup.enter="filterData(index.type)"
        />
      </v-col>
    </v-row>
    <v-row class="text-center justify-center mt-8">
      <v-col cols="4">
        <v-btn
          color="#444fee"
          text
          outlined
          v-for="index in categoryWarm"
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
          <v-flex class="result-100 ">Расход (кг)</v-flex>
          <v-flex class="result-100 ">Требуется</v-flex>
          <v-flex class="result-100 ">Очистить</v-flex>
        </div>

        <v-flex
          v-for="index in resultEstimateWarm"
          :key="index.idInn"
          class="d-flex align-content-center choice-table-down"
        >
          <v-flex class="d-flex align-self-center result-name">
            {{ index.name }}</v-flex
          >
          <v-flex class="d-flex align-self-center justify-center result-110">
          </v-flex>
          <v-flex
            class="result-100  d-flex d-flex align-self-center justify-center "
            >{{ index.resultCalc }}</v-flex
          >
          <v-flex
            class="result-100  d-flex align-self-center justify-center "
            >{{ index.need }}</v-flex
          >
          <v-flex class="result-100 d-flex align-self-center justify-center "
            ><v-icon :id="index.type" @click="deleteItemWarm(index.type)">
              mdi-delete</v-icon
            ></v-flex
          >
        </v-flex>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "v-warm",
  data: () => ({
    outEstimateWarm: {},
    flagWarmEstimate: true,
    squareWarm: 0,
    lengthDoors: 0,
    warmWindows: "",
    flagCategoryWarm: "",
    categoryWarm: [
      { id_cat: 1, name: "Утеплитель" },
      { id_cat: 2, name: "Декоративная штукатурка" },
      { id_cat: 3, name: "Краска фасадная" }
    ],
    tileInsulation: [
      {
        idInn: 1,
        type: "warmAdhesive1",
        name:
          "Грунт глубокопроникающий акриловый, 5л (для подготовки основания к монтажу плит)",
        unit: "литров",
        density: 0.15,
        weight: 5,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 2,
        type: "warmAdhesive2",
        name:
          "Кварц-грунт, 6кг (для подготовки бетонного основания к монтажу плит)",
        unit: "кг",
        density: 0.3,
        weight: 5,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 3,
        type: "warmAdhesive3",
        name: "Минераловатная плита 1200×600×100 мм ",
        unit: "шт.",
        density: 1.4,
        weight: 3,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 4,
        type: "warmAdhesive4",
        name: "Пенополистирол ПСБ-С 25Ф 1200×100×100 мм",
        unit: "шт.",
        density: 0.8,
        weight: 1,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 5,
        type: "warmAdhesive5",
        name: "КТП 500, 25кг (Клей для приклеивания теплоизоляции)",
        unit: "кг",
        density: 5,
        weight: 25,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 6,
        type: "warmAdhesive6",
        name: "Дюбель тарельчатый с металическим стержнем и термоголовкой",
        unit: "шт.",
        density: 5,
        weight: 0,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 7,
        type: "warmAdhesive7",
        name:
          "КТУ 1000, 25кг (Клеевой состав для нанесения армирующего штукатурного слоя)",
        unit: "кг.",
        density: 5,
        weight: 25,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 8,
        type: "warmAdhesive8",
        name: "Армирующая сетка из стекловолокна щелочестойкая",
        unit: "м2",
        density: 1.1,
        weight: 50,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 9,
        type: "warmAdhesive9",
        name:
          "Уголок с армирующей сеткой и сердечником из ПВХ  150/100мм, (2,5м)",
        unit: "шт.",
        density: 0.4,
        weight: 1,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 10,
        type: "warmAdhesive10",
        name: "Профиль примыкания оконный с сеткой (2,4м)",
        unit: "шт.",
        density: 0.42,
        weight: 1,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 11,
        type: "warmAdhesive11",
        name:
          "Грунт глубокопроникающий акриловый, 5л (для подготовки основания под нанесение декоративной штукатурки)",
        unit: "литров",
        density: 0.15,
        weight: 5,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 12,
        type: "warmAdhesive12",
        name:
          "Кварц-грунт, 6кг  (для подготовки основания под нанесение декоративной штукатурки) ",
        unit: "кг",
        density: 0.3,
        weight: 6,
        resultCalc: 0,
        need: 0
      }
    ],
    plastering: [
      {
        idInn: 1,
        type: "plastering1",
        name: "Декоративная штукатурка «Короед» зерно 2,0 мм",
        unit: "кг",
        density: 3,
        weight: 25,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 2,
        type: "plastering2",
        name: "Декоративная штукатурка «Короед» зерно 3,0 мм",
        unit: "кг",
        density: 4,
        weight: 25,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 3,
        type: "plastering3",
        name: "Декоративная штукатурка «Шуба» зерно 1,0 мм",
        unit: "кг",
        density: 2,
        weight: 25,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 4,
        type: "plastering4",
        name: "Декоративная штукатурка «Шуба» зерно 2,0 мм",
        unit: "кг",
        density: 3,
        weight: 25,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 5,
        type: "plastering5",
        name: "Декоративная штукатурка «Короед» зерно 3,0 мм",
        unit: "кг",
        density: 4,
        weight: 25,
        resultCalc: 0,
        need: 0
      }
    ],
    tilePainting: [
      {
        idInn: 1,
        type: "tilePainting1",
        name: "Краска фасадная 2 слоя",
        unit: "кг",
        density: 0.35,
        weight: 20,
        resultCalc: 0,
        need: 0
      }
    ]
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
    deleteItemWarm(i) {
      alert(i);
    },
    selectDataWarm(i) {
      this.flagWarmEstimate = false;
      if (this.flagCategoryWarm === "tileInsulation") {
        const valueOfType = this.tileInsulation[i - 1].type;
        this.outEstimateWarm[valueOfType] = this.tileInsulation[i - 1];
        this.flagWarmEstimate = true;
      } else if (this.flagCategoryWarm === "plastering") {
        const valueOfType = this.plastering[i - 1].type;
        this.outEstimateWarm[valueOfType] = this.plastering[i - 1];
        this.flagOutEstimate = true;
      } else if (this.flagCategoryWarm === "tilePainting") {
        const valueOfTypeWarm = this.tilePainting[i - 1].type;
        alert(valueOfTypeWarm);
        this.outEstimateWarm[valueOfTypeWarm] = this.tilePainting[i - 1];
        alert(this.outEstimateWarm[valueOfTypeWarm]);
        this.flagOutEstimate = true;
      }
    },
    choiceWarm(i) {
      this.flagCategoryWarm = "";
      if (i === 1) {
        this.warmWindows = this.tileInsulation;
        this.flagCategoryWarm = "tileInsulation";
      } else if (i === 2) {
        this.warmWindows = this.plastering;
        this.flagCategoryWarm = "plastering";
      } else if (i === 3) {
        this.warmWindows = this.tilePainting;
        this.flagCategoryWarm = "tilePainting";
      }
    }
  }
};
</script>

<style></style>
