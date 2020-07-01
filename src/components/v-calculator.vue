<template>
  <v-container>
    <v-row class="text-center mt-8">
      <v-col class="md-3">
        <v-btn
          color="#444fee"
          text
          outlined
          v-for="index in category"
          :key="index"
          @click="choice(index.id_cat)"
          class="btn-cat"
          >{{ index.name }}
        </v-btn>
      </v-col>
      <v-col class="md-6 main-windows">
        <form @submit.prevent="filterData">
          <v-flex
            v-for="index in resultTileAdhesive"
            :key="index"
            class="d-flex align-content-center"
          >
            <v-checkbox
              :v-model="index.idInn"
              @change="selectData(index.idInn)"
            ></v-checkbox>
            <div class="d-flex align-self-center choice-table">
              <span> {{ index.text }} </span>{{ index.name }}
            </div>
          </v-flex>
          <v-flex class="d-flex text-left mt-4">
            <v-btn
              type="submit"
              class="btn-choice"
              text
              outlined
              color="#444fee"
              >Выбрать</v-btn
            >
          </v-flex>
        </form>
      </v-col>
    </v-row>
    <v-row v-if="flagOutEstimate" class="text-center mt-8">
      <v-row class="d-flex">
        <v-flex class="result-name">Название</v-flex>
        <v-flex class="result-thickness">Рекомендуемая толщина(мм)</v-flex>
        <v-flex class="result-thickness-input">Толщина слоя(мм)</v-flex>
        <v-flex class="result-square">Площадь (кв.м)</v-flex>
        <v-flex class="result-consumption">Расход (кг)</v-flex>
        <v-flex class="result-need">Требуется</v-flex>
        <v-flex class="result-delete">Очистить</v-flex>
      </v-row>
      <v-col class="main-windows" md="12">
        <v-flex
          v-for="index in resultEstimate"
          :key="index"
          class="d-flex align-content-center choice-table-down"
        >
          <v-flex class="d-flex align-self-center result-name">
            {{ index.name }}</v-flex
          >
          <v-flex class="d-flex align-self-center result-thickness">
            {{ index.thickness }}</v-flex
          >

          <v-text-field
            class="result-thickness-input"
            id="custom"
            required
            v-model.number="index.customThickness"
            type="text"
            placeholder="...толщина"
            @keyup.enter="filterData(index)"
          />

          <v-text-field
            class="result-square"
            id="square"
            required
            v-model.number="index.customSquare"
            type="text"
            placeholder="...площадь"
            @keyup.enter="filterData(index)"
          />

          <v-flex class="result-consumption">{{ index.resultCalc }}</v-flex>
          <v-flex class="result-need">{{ index.need }}</v-flex>
          <v-flex class="result-delete"
            ><v-icon :id="index.type"  @click="deleteItem(index.type)"> mdi-delete</v-icon></v-flex
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
    newTileAdhesive: "",
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
        customThickness:0,
        customSquare:0,
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
        customThickness:0,
        customSquare:0,
        weight: 25,
        resultCalc: 0,
        need: 0,
      },
      {
        idInn: 3,
        type: "tileAdhesive3",
        text: "Плиточный клей",
        name: "Плиточный клей Профи, 25кг",
        thickness: "3-10мм",
        density: 1.35,
        customThickness:0,
        customSquare:0,
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
        customThickness:0,
        customSquare:0,
        density: 1.4,
        weight: 20,
        resultCalc: 0,
        need: 0
      }
    ],
    mountingMixtures: [
      {
        idInn: 1,
        text: "Кладочно-монтажная смесь",
        name: "Техно, 25 кг (Клей для кладки блоков)",
        thickness: "3-10мм"
      },
      {
        idInn: 2,
        text: "Кладочно-монтажная смесь",
        name: "Пескобетон М-300, 25кг",
        thickness: "более 3мм"
      },
      {
        idInn: 3,
        text: "Кладочно-монтажная смесь",
        name: "Цементно песчанная смесь М-150, 25кг",
        thickness: "более 3мм"
      },
      {
        idInn: 4,
        text: "Кладочно-монтажная смесь",
        name: "КТП 500, 25кг (Клей для приклеивания теплоизоляции)",
        thickness: ""
      },
      {
        idInn: 5,
        text: "Кладочно-монтажная смесь",
        name: "КТУ 1000 (Клей для приклеивания и армирования теплоизоляции)",
        thickness: "более 3мм"
      },
      {
        idInn: 6,
        text: "Кладочно-монтажная смесь",
        name: "MIX BEST Клей для теплоизоляции универсальный, 20кг",
        thickness: ""
      },
      {
        idInn: 7,
        text: "Кладочно-монтажная смесь",
        name: "MIX BEST Смесь цементно-песчаная, 20кг",
        thickness: "более 3мм"
      }
    ]
  }),

  computed: {
    resultEstimate() {
      return this.outEstimate;
    },
    resultTileAdhesive() {
      return this.newTileAdhesive;
    }
  },
  methods: {
    isEmpty(obj) {

  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (const key in obj) {
    let hasOwnProperty;
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
},
    choice(i) {
      this.flagCategory = "";
      if (i === 1) {
        this.newTileAdhesive = this.tileAdhesive;
        this.flagCategory = "tileAdhesive";
      } else if (i === 2) {
        this.newTileAdhesive = this.mountingMixtures;
        this.flagCategory = "mountingMixtures";
      }
    },
    deleteItem(id) {
      alert(id)
      this.flagOutEstimate = false;
      delete this.outEstimate[id]
     if (!this.isEmpty(this.outEstimate)){
        this.flagOutEstimate = true;
      }
    },
    selectData(i) {
      this.flagOutEstimate = false;
      if (this.flagCategory === "mountingMixtures") {
        this.outEstimate.push(this.mountingMixtures[i - 1]);
      } else if (this.flagCategory === "tileAdhesive") {
          const valueOfType = this.tileAdhesive[i - 1].type
        this.outEstimate[valueOfType] = this.tileAdhesive[i - 1];
        this.flagOutEstimate = true;
      }
    },
    filterData(value) {
      alert(value)
      alert(value.customThickness);
      alert(value.customSquare);
      value.resultCalc = Math.ceil(
              value.customThickness * value.customSquare * value.density)
       value.need = Math.ceil(
               value.resultCalc / value.weight)
     }
  }
};
</script>
<style lang="scss">
.result-name {
  width: 500px;
}
.result-thickness,
.result-consumption {
  width: 100px;
}
.result-thickness-input,
.result-square {
  width: 180px;
  input {
    width: 150px;
  }
}

.result-delete {
  width: 100px;
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
  padding-bottom: 6px;
  span {
    color: #444fee;
    text-transform: uppercase;
    margin: 0 10px;
  }
}

.main-windows {
  border: 2px solid #444fee;
}
</style>
