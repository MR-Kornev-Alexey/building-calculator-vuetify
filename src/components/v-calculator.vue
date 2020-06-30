<template>
  <v-container>
    <v-row class="text-center mt-8">
      <v-col class="md-3">
        <v-btn
          color="#444fee"
          text
          outlined
          v-for="i in category"
          :key="i"
          @click="choice(i.id_cat)"
          class="btn-cat"
          >{{ i.name }}
        </v-btn>
      </v-col>
      <v-col class="md-6 main-windows">
        <v-flex
          v-for="i in resultTileAdhesive"
          :key="i"
          class="d-flex align-content-center"
        >
          <v-checkbox :v-model="i.idAdhesive"></v-checkbox>
          <div class="d-flex align-self-center choice-table">
            <span> {{ i.text }} </span>{{ i.name }}
          </div>
        </v-flex>
        <v-flex class="d-flex text-left mt-4">
          <v-btn class="btn-choice" text outlined color="#444fee"
            >Выбрать</v-btn
          >
        </v-flex>
      </v-col>
    </v-row>
    <v-row class="text-center mt-8">
      <v-row class="d-flex">
        <v-flex class="result-name">Название</v-flex>
        <v-flex class="result-thickness">Рекомендуемая толщина(мм)</v-flex>
        <v-flex class="result-thickness-input">Толщина слоя(мм)</v-flex>
        <v-flex class="result-square">Площадь (кв.м)</v-flex>
        <v-flex class="result-consumption">Расход (кг)</v-flex>
        <v-flex class="result-delete">Очистить</v-flex>
      </v-row>
      <v-col class="main-windows" md="12">
        <v-flex
          v-for="i in tileAdhesive"
          :key="i"
          class="d-flex align-content-center choice-table-down"
        >
          <v-flex class="d-flex align-self-center result-name">
            <span> {{ i.text }} </span>{{ i.name }}</v-flex
          >
          <v-flex class="d-flex align-self-center result-thickness">
            {{ i.thickness }}</v-flex
          >
          <label class="result-thickness-input">
            <input
              class="input"
              id="custom"
              required
              v-model="customThickness"
              type="text"
              placeholder="...толщина"
            />
          </label>
          <label class="result-square">
            <input
              class="input"
              id="square"
              required
              v-model="customSquare"
              type="text"
              placeholder="...площадь"
            />
          </label>
          <v-flex class="result-consumption">счет</v-flex>
          <v-flex class="result-delete"
            ><v-icon @click="deleteItem"> mdi-delete</v-icon></v-flex
          >
        </v-flex>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
let tileAdhesive;
export default {
  name: "v-calculator",
  data: () => ({
    newTileAdhesive: "",
    customThickness: "",
    customSquare: "",
    category: [
      { id_cat: 1, name: "Плиточный клей", meta: tileAdhesive },
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
        text: "Плиточный клей",
        name: "Стандарт, 25кг",
        thickness: "3-10мм"
      },
      {
        idInn: 2,
        text: "Плиточный клей",
        name: "Гранит, 25кг",
        thickness: "3-10мм"
      },
      {
        idInn: 3,
        text: "Плиточный клей",
        name: "Профи, 25кг",
        thickness: "3-10мм"
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
    resultTileAdhesive() {
      return this.newTileAdhesive;
    }
  },
  methods: {
    choice(i) {
      if (i === 1) {
        this.newTileAdhesive = this.tileAdhesive;
      } else if (i === 2) {
        this.newTileAdhesive = this.mountingMixtures;
      }
    },
    deleteItem() {
      return true;
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
