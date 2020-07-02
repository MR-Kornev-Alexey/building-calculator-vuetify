<template>
  <v-container>
    <v-row class="text-center justify-center mt-8">
      <v-col cols="4" >
        <v-btn
          color="#444fee"
          text
          outlined
          v-for="index in category"
          :key="index.id_cat"
          @click="choice(index.id_cat)"
          class="btn-cat"
          >{{ index.name }}
        </v-btn>
      </v-col>
      <v-col cols="6" class="md-6 main-windows">
        <v-flex
          v-for="index in resultTileAdhesive"
          :key="index.idInn"
          class="d-flex align-self-center"
        >
          <v-checkbox
            :v-model="index.idInn"
            @change="selectData(index.idInn)"
          ></v-checkbox>
          <v-flex class="choice-table text-left align-self-center">
            {{ index.name }}
          </v-flex>
        </v-flex>
      </v-col>
    </v-row>
    <v-row v-if="flagOutEstimate" class="text-center justify-center mt-8">
      <v-col class="main-windows" cols="10">
        <div class="d-flex">
          <v-flex class="result-name">Название</v-flex>
          <v-flex class="result-110 ">Рекомендуемая толщина(мм)</v-flex>
          <v-flex class="result-100 ">Толщина слоя(мм)</v-flex>
          <v-flex class="result-100 ">Площадь (кв.м)</v-flex>
          <v-flex class="result-100 ">Расход (кг)</v-flex>
          <v-flex class="result-100 ">Требуется</v-flex>
          <v-flex class="result-100 ">Очистить</v-flex>
        </div>

        <v-flex
          v-for="index in resultEstimate"
          :key="index.idInn"
          class="d-flex align-content-center choice-table-down"
        >
          <v-flex class="d-flex align-self-center result-name">
            {{ index.name }}</v-flex
          >
          <v-flex class="d-flex align-self-center justify-center result-110">
            {{ index.thickness }}</v-flex
          >

          <v-text-field
            class="result-100"
            id="custom"
            required
            v-model.number="index.customThickness"
            type="text"
            placeholder="...толщина"
            @keyup.enter="filterData(index.type)"
          />

          <v-text-field
            class="result-100"
            id="square"
            required
            v-model.number="index.customSquare"
            type="text"
            placeholder="...площадь"
            @keyup.enter="filterData(index.type)"
          />

          <v-flex
            class="result-100  d-flex d-flex align-self-center justify-center "
            >{{ index.resultCalc }}</v-flex
          >
          <v-flex
            class="result-100  d-flex align-self-center justify-center "
            >{{ index.need }}</v-flex
          >
          <v-flex class="result-100 d-flex align-self-center justify-center "
            ><v-icon :id="index.type" @click="deleteItem(index.type)">
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
  name: "v-calculator",
  data: () => ({
    outEstimate: {},
    flagOutEstimate: false,
    newTileWindows: "",
    flagCategory: "",
    category: [
      { id_cat: 1, name: "Плиточный клей" },
      { id_cat: 2, name: "Кладочно-монтажная смесь" },
      { id_cat: 3, name: "Гипсовая штукатурка" },
      { id_cat: 4, name: "Декоративная штукатурка" },
      { id_cat: 5, name: "Цементная штукатурка и шпатлевка" },
      { id_cat: 6, name: "Смесь для устройства пола" },
      { id_cat: 7, name: "MIX BEST" },
      { id_cat: 8, name: "ЛКМ" }
    ],

    tileAdhesive: [
      {
        idInn: 1,
        type: "tileAdhesive1",
        text: "Плиточный клей",
        name: "Плиточный клей Стандарт, 25кг",
        thickness: "3-10мм",
        customThickness: 0,
        customSquare: 0,
        density: 1.4,
        weight: 25,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 2,
        type: "tileAdhesive2",
        text: "Плиточный клей",
        name: "Плиточный клей Гранит, 25кг",
        thickness: "3-10мм",
        density: 1.45,
        customThickness: 0,
        customSquare: 0,
        weight: 25,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 3,
        type: "tileAdhesive3",
        text: "Плиточный клей",
        name: "Плиточный клей Профи, 25кг",
        thickness: "3-10мм",
        density: 1.35,
        customThickness: 0,
        customSquare: 0,
        weight: 25,
        resultCalc: 0,
        need: 0
      },
      {
        idInn: 4,
        type: "tileAdhesive4",
        text: "Плиточный клей",
        name: "MIX BEST Клей плиточный базовый, 20кг",
        thickness: "3-10мм",
        customThickness: 0,
        customSquare: 0,
        density: 1.4,
        weight: 20,
        resultCalc: 0,
        need: 0
      }
    ],
    mountingMixtures: [
      {
        idInn: 1,
        type: "mountingMix1",
        customThickness: 0,
        customSquare: 0,
        density: 1.4,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Кладочно-монтажная смесь",
        name: "Техно, 25 кг (Клей для кладки блоков)",
        thickness: "3-10мм"
      },
      {
        idInn: 2,
        type: "mountingMix2",
        customThickness: 0,
        customSquare: 0,
        density: 1.5,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Кладочно-монтажная смесь",
        name: "Пескобетон М-300, 25кг",
        thickness: "более 3мм"
      },
      {
        idInn: 3,
        type: "mountingMix3",
        customThickness: 0,
        customSquare: 0,
        density: 1.45,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Кладочно-монтажная смесь",
        name: "Цементно песчанная смесь М-150, 25кг",
        thickness: "более 3мм"
      },
      {
        idInn: 4,
        type: "mountingMix4",
        customThickness: 0,
        customSquare: 0,
        density: 5,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Кладочно-монтажная смесь",
        name: "КТП 500, 25кг (Клей для приклеивания теплоизоляции)",
        thickness: "-"
      },
      {
        idInn: 5,
        type: "mountingMix5",
        customThickness: 0,
        customSquare: 0,
        density: 5,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Кладочно-монтажная смесь",
        name:
          "КТУ 1000, 25кг (Клей для приклеивания и армирования теплоизоляции)",
        thickness: "-"
      },
      {
        idInn: 6,
        type: "mountingMix6",
        customThickness: 0,
        customSquare: 0,
        density: 5,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "Кладочно-монтажная смесь",
        name: "MIX BEST Клей для теплоизоляции универсальный, 20кг",
        thickness: "-"
      },
      {
        idInn: 7,
        type: "mountingMix7",
        customThickness: 0,
        customSquare: 0,
        density: 1.45,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "Кладочно-монтажная смесь",
        name: "MIX BEST Смесь цементно-песчаная, 20кг",
        thickness: "более 3мм"
      }
    ],
    gypsumPlaster: [
      {
        idInn: 1,
        type: "gypsumPlaster1",
        customThickness: 0,
        customSquare: 0,
        density: 1.25,
        weight: 30,
        resultCalc: 0,
        need: 0,
        text: "Гипсовая штукатурка",
        name: "Пласт Гипс, 30кг",
        thickness: "2-80мм"
      },
      {
        idInn: 2,
        type: "gypsumPlaster2",
        customThickness: 0,
        customSquare: 0,
        density: 1,
        weight: 30,
        resultCalc: 0,
        need: 0,
        text: "Гипсовая штукатурка",
        name: "Пласт Гипс Тонкий, 30кг",
        thickness: "2-20мм"
      }
    ],
    decorativePlaster: [
      {
        idInn: 1,
        type: "decorativePlaster1",
        customThickness: 0,
        customSquare: 0,
        density: 3,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Декоративная  штукатурка",
        name: "Декоративная  штукатурка Короед 2, 25кг",
        thickness: "-"
      },
      {
        idInn: 2,
        type: "decorativePlaster2",
        customThickness: 0,
        customSquare: 0,
        density: 4,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Декоративная  штукатурка",
        name: "Декоративная  штукатурка Короед 3, 25кг",
        thickness: "-"
      },
      {
        idInn: 3,
        type: "decorativePlaster3",
        customThickness: 0,
        customSquare: 0,
        density: 2,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Декоративная  штукатурка",
        name: "Декоративная  штукатурка Шуба 1, 25кг",
        thickness: "-"
      },
      {
        idInn: 4,
        type: "decorativePlaster4",
        customThickness: 0,
        customSquare: 0,
        density: 3,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Декоративная  штукатурка",
        name: "Декоративная  штукатурка Шуба 2, 25кг",
        thickness: "-"
      },
      {
        idInn: 5,
        type: "decorativePlaster5",
        customThickness: 0,
        customSquare: 0,
        density: 4,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Декоративная  штукатурка",
        name: "Декоративная  штукатурка Шуба 3, 25кг",
        thickness: "-"
      },
      {
        idInn: 6,
        type: "decorativePlaster6",
        customThickness: 0,
        customSquare: 0,
        density: 3,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "Декоративная  штукатурка",
        name: "MIX BEST Декоративная штукатурка ШУБА, 20кг",
        thickness: "-"
      }
    ],
    cementPlaster: [
      {
        idInn: 1,
        type: "cementPlaster1",
        customThickness: 0,
        customSquare: 0,
        density: 1.4,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Цементная штукатурка и шпатлевка",
        name: "Пласт, 25кг (Штукатурка)",
        thickness: "2-20"
      },
      {
        idInn: 2,
        type: "cementPlaster2",
        customThickness: 0,
        customSquare: 0,
        density: 0.9,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "Цементная штукатурка и шпатлевка",
        name: "Пласт-Финиш, 20кг  (Шпатлевка)",
        thickness: "1-6"
      }
    ],
    mixForFloor: [
      {
        idInn: 1,
        type: "mixForFloor1",
        customThickness: 0,
        customSquare: 0,
        density: 1.3,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Смесь для устройства пола",
        name: "Идеал, 25кг (Наливной пол)",
        thickness: "2-10"
      },
      {
        idInn: 2,
        type: "mixForFloor2",
        customThickness: 0,
        customSquare: 0,
        density: 1.5,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Смесь для устройства пола",
        name: "Конкрет, 25 кг (Стяжка для пола)",
        thickness: "5-80"
      }
    ],
    mixBest: [
      {
        idInn: 1,
        type: "mixBest1",
        customThickness: 0,
        customSquare: 0,
        density: 5,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "MIX BEST",
        name: "MIX BEST Клей для теплоизоляции универсальный, 20кг",
        thickness: "-"
      },
      {
        idInn: 2,
        type: "mixBest2",
        customThickness: 0,
        customSquare: 0,
        density: 5,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "MIX BEST",
        name: "MIX BEST Декоративная штукатурка ШУБА, 20кг",
        thickness: "-"
      },
      {
        idInn: 3,
        type: "mixBest3",
        customThickness: 0,
        customSquare: 0,
        density: 1.45,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "MIX BEST",
        name: "MIX BEST Смесь цементно-песчаная, 20кг",
        thickness: "более 3"
      },
      {
        idInn: 4,
        type: "mixBest4",
        customThickness: 0,
        customSquare: 0,
        density: 1.4,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "MIX BEST",
        name: "MIX BEST Клей плиточный базовый, 20кг",
        thickness: "3-10"
      }
    ],
    mixLKM: [
      {
        idInn: 1,
        type: "mixLKM1",
        customThickness: 0,
        customSquare: 0,
        density: 0.125,
        weight: 5,
        resultCalc: 0,
        need: 0,
        text: "ЛКМ",
        name: "Грунт глубокого проникновения акриловый универсальный, 5л",
        thickness: "-"
      },
      {
        idInn: 2,
        type: "mixLKM2",
        customThickness: 0,
        customSquare: 0,
        density: 0.275,
        weight: 6,
        resultCalc: 0,
        need: 0,
        text: "ЛКМ",
        name: "Кварц-грунт (бетоноконтакт) 6кг",
        thickness: "-"
      },
      {
        idInn: 3,
        type: "mixLKM3",
        customThickness: 0,
        customSquare: 0,
        density: 0.2,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "ЛКМ",
        name: "Краска фасадная, 20кг (один слой)",
        thickness: "-"
      },
      {
        idInn: 4,
        type: "mixLKM4",
        customThickness: 0,
        customSquare: 0,
        density: 0.35,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "ЛКМ",
        name: "Краска фасадная, 20кг (два слоя)",
        thickness: "-"
      }
    ]
  }),

  computed: {
    resultEstimate() {
      return this.outEstimate;
    },
    resultTileAdhesive() {
      return this.newTileWindows;
    }
  },
  methods: {
    isEmpty(obj) {
      if (obj == null) return true;
      if (obj.length > 0) return false;
      if (obj.length === 0) return true;
      if (typeof obj !== "object") return true;
      for (const key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
      }
      return true;
    },
    choice(i) {
      this.flagCategory = "";
      if (i === 1) {
        this.newTileWindows = this.tileAdhesive;
        this.flagCategory = "tileAdhesive";
      } else if (i === 2) {
        this.newTileWindows = this.mountingMixtures;
        this.flagCategory = "mountingMixtures";
      } else if (i === 3) {
        this.newTileWindows = this.gypsumPlaster;
        this.flagCategory = "gypsumPlaster";
      } else if (i === 4) {
        this.newTileWindows = this.decorativePlaster;
        this.flagCategory = "decorativePlaster";
      } else if (i === 5) {
        this.newTileWindows = this.cementPlaster;
        this.flagCategory = "cementPlaster";
      } else if (i === 6) {
        this.newTileWindows = this.mixForFloor;
        this.flagCategory = "mixForFloor";
      } else if (i === 7) {
        this.newTileWindows = this.mixBest;
        this.flagCategory = "mixBest";
      } else if (i === 8) {
        this.newTileWindows = this.mixLKM;
        this.flagCategory = "mixLKM";
      }
    },
    deleteItem(id) {
      this.flagOutEstimate = false;
      delete this.outEstimate[id];
      if (!this.isEmpty(this.outEstimate)) {
        this.flagOutEstimate = true;
      }
    },
    selectData(i) {
      this.flagOutEstimate = false;
      if (this.flagCategory === "mountingMixtures") {
        const valueOfType = this.mountingMixtures[i - 1].type;
        this.outEstimate[valueOfType] = this.mountingMixtures[i - 1];
        this.flagOutEstimate = true;
      } else if (this.flagCategory === "tileAdhesive") {
        const valueOfType = this.tileAdhesive[i - 1].type;
        this.outEstimate[valueOfType] = this.tileAdhesive[i - 1];
        this.flagOutEstimate = true;
      } else if (this.flagCategory === "gypsumPlaster") {
        const valueOfType = this.gypsumPlaster[i - 1].type;
        this.outEstimate[valueOfType] = this.gypsumPlaster[i - 1];
        this.flagOutEstimate = true;
      } else if (this.flagCategory === "decorativePlaster") {
        const valueOfType = this.decorativePlaster[i - 1].type;
        this.outEstimate[valueOfType] = this.decorativePlaster[i - 1];
        this.flagOutEstimate = true;
      } else if (this.flagCategory === "cementPlaster") {
        const valueOfType = this.cementPlaster[i - 1].type;
        this.outEstimate[valueOfType] = this.cementPlaster[i - 1];
        this.flagOutEstimate = true;
      } else if (this.flagCategory === "mixForFloor") {
        const valueOfType = this.mixForFloor[i - 1].type;
        this.outEstimate[valueOfType] = this.mixForFloor[i - 1];
        this.flagOutEstimate = true;
      } else if (this.flagCategory === "mixBest") {
        const valueOfType = this.mixBest[i - 1].type;
        this.outEstimate[valueOfType] = this.mixBest[i - 1];
        this.flagOutEstimate = true;
      } else if (this.flagCategory === "mixLKM") {
        const valueOfType = this.mixLKM[i - 1].type;
        this.outEstimate[valueOfType] = this.mixLKM[i - 1];
        this.flagOutEstimate = true;
      }
    },
    filterData(value) {
      this.outEstimate[value].resultCalc = Math.ceil(
        this.outEstimate[value].customThickness *
          this.outEstimate[value].customSquare *
          this.outEstimate[value].density
      );
      this.outEstimate[value].need = Math.ceil(
        this.outEstimate[value].resultCalc / this.outEstimate[value].weight
      );
    }
  }
};
</script>
<style lang="scss">
.result-name {
  width: 400px;
  text-align: left;
}

.result-100 {
  width: 100px;
  .v-text-field__slot input {
    width: 80px;
  }
}
.result-110 {
  width: 110px;
}

.btn-choice {
  padding: 0 6px;
}
.btn-cat {
  width: 360px;
  margin: 3px 0;
  color: #444fee;
}
.choice-table {
  span {
    color: #444fee;
    text-transform: uppercase;
    margin: 0 10px;
  }
}
.choice-table-down {
  border-bottom: 2px solid #444fee;
  margin: 6px 0;
  span {
    color: #444fee;
    text-transform: uppercase;
    margin: 0 10px;
  }
}

.main-windows {
  border: 2px solid #444fee;
}
@media (max-width: 768px) {
  .main-windows div {
    font-size: 12px;
  }
  .result-name {
    width: 180px;
    text-align: left;
  }

  .result-100 {
    width: 70px;
    .v-text-field__slot input {
      width: 30px;
    }
  }
  .result-110 {
    width: 90px;
  }
}
</style>
