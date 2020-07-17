<template>
  <v-container>
    <v-row justify="center">
      <h1>Расчет необходимого количества строительных материалов</h1>
      <p class="estimate-text">Онлайн расчет носит информативный характер. Детали уточняйте у наших менеждеров.</p>
    </v-row>
    <v-row class="text-center justify-center mt-8">
      <v-col md="4" cols="10" >
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
      <v-col md="6" cols="10" class=" main-windows">
        <v-flex
          v-for="index in resultTileAdhesive"
          :key="index.idInn"
          class="d-flex align-self-center"
        >
          <v-checkbox
            v-model="index.selected"
            @change="selectData(index.idInn)"
          ></v-checkbox>
          <v-flex class="choice-table text-left align-self-center">
            {{ index.name }}
          </v-flex>

        </v-flex>
        <v-btn v-if="btnReset"
                color="#444fee"
                text
                outlined
                @click="resetMainWindows()"
                class="btn-reset"
        >Сбросить
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      v-if="flagOutEstimate"
      class="text-center forPrint justify-center mt-8"
    >
      <v-col class="main-windows" cols="10">
        <div class="d-flex">
          <v-flex class="result-name">Название</v-flex>
          <v-flex class="result-110 ">Рекомендуемая толщина(мм)</v-flex>
          <v-flex class="result-100 ">Толщина слоя(мм)</v-flex>
          <v-flex class="result-100 ">Площадь (кв.м)</v-flex>
          <v-flex class="result-100 ">Расход (кг)</v-flex>
          <v-flex class="result-100 ">Количество</v-flex>
          <v-flex class="result-100 "></v-flex>
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

          <v-text-field v-if="index.inputThickness"
            class="result-100"
            id="custom"
            required
            v-model.number="index.customThickness"
            type="text"
            placeholder="...толщина"
            @keyup.enter="filterData(index.type)"
            @change="filterData(index.type)"
          />
          <v-flex v-if="!index.inputThickness"
                  class="d-flex align-self-center justify-center result-110">
            {{ index.customThickness }}</v-flex
          >
          <v-text-field
            class="result-100"
            id="square"
            required
            v-model.number="index.customSquare"
            type="text"
            placeholder="...площадь"
            @keyup.enter="filterData(index.type)"
            @change="filterData(index.type)"
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
    <v-row>
      <table id="element-to-print">
        <tr>
          <th>Название</th>
          <th>Рек.Толщина</th>
          <th>Толщина</th>
          <th>Площадь</th>
          <th>Расход</th>
          <th>Количество</th>
        </tr>
        <tr v-for="index in resultEstimate" :key="index.idInn">
          <td>{{ index.name }}</td>
          <td>{{ index.thickness }}</td>
          <td>{{ index.customThickness }}</td>
          <td>{{ index.resultCalc }}</td>
          <td>{{ index.customSquare }}</td>
          <td>{{ index.need }}</td>
        </tr>
      </table>
    </v-row>
    <v-row class="d-flex mt-6">
      <v-btn
        color="#444fee"
        text
        outlined
        @click="startPrinting()"
        class="btn-cat"
        >Сохранить PDF
      </v-btn>
      <vPrint :printChoice="this.flagPrint" />
    </v-row>
    <v-row>
      <social-sharing url="https://vuejs.org/" inline-template>
        <div class="ml-6 d-flex">
          <div class="mr-4 share-network">
            Поделиться
          </div>
          <div class="mr-4 share-network">
            <ShareNetwork
              network="whatsapp"
              url="http://calc.mrk.digital/"
              title="Онлайн-расчет количества необходимых материалов. Удобно и быстро"
              description="Онлайн-расчет количества необходимых материалов. Удобно и быстро"
              quote="Онлайн-расчет количества необходимых материалов"
              hashtags="строительныйкалькулятор"
            >
              Whatsapp
            </ShareNetwork>
          </div>
          <div class="mr-4 share-network">
            <ShareNetwork
              network="vk"
              url="http://calc.mrk.digital/"
              title="Онлайн-расчет количества необходимых материалов. Удобно и быстро"
              description="Онлайн-расчет количества необходимых материалов. Удобно и быстро"
              quote="Онлайн-расчет количества необходимых материалов"
              hashtags="строительныйкалькулятор"
            >
              ВКонтакте
            </ShareNetwork>
          </div>
          <div class="mr-4 share-network">
            <ShareNetwork
              network="facebook"
              url="http://calc.mrk.digital/"
              title="Онлайн-расчет количества необходимых материалов. Удобно и быстро"
              description="Онлайн-расчет количества необходимых материалов. Удобно и быстро"
              quote="Онлайн-расчет количества необходимых материалов"
              hashtags="строительныйкалькулятор"
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
import vPrint from "./v-print";
import Vue from "vue";
import SocialSharing from "vue-social-sharing";
const isEm = require("../common/isEmty");

Vue.use(SocialSharing);

export default {
  name: "v-calculator",
  components: {
    vPrint,
    SocialSharing
  },
  data: () => ({
    btnReset:false,
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
        selected:false,
        type: "tileAdhesive1",
        text: "Плиточный клей",
        name: "Плиточный клей Стандарт, 25кг",
        thickness: "3-10мм",
        customSquare: 0,
        density: 1.4,
        weight: 25,
        resultCalc: 0,
        need: 0,
        inputThickness:true,
        customThickness: 0,
      },
      {
        idInn: 2,
        selected:false,
        type: "tileAdhesive2",
        text: "Плиточный клей",
        name: "Плиточный клей Гранит, 25кг",
        thickness: "3-10мм",
        density: 1.45,
       customSquare: 0,
        weight: 25,
        resultCalc: 0,
        need: 0,
        inputThickness:true,
        customThickness: 0,
      },
      {
        idInn: 3,
        selected:false,
        type: "tileAdhesive3",
        text: "Плиточный клей",
        name: "Плиточный клей Профи, 25кг",
        thickness: "3-10мм",
        density: 1.35,
        customSquare: 0,
        weight: 25,
        resultCalc: 0,
        need: 0,
        inputThickness:true,
        customThickness: 0,
      },
      {
        idInn: 4,
        selected:false,
        type: "tileAdhesive4",
        text: "Плиточный клей",
        name: "MIX BEST Клей плиточный базовый, 20кг",
        thickness: "3-10мм",
        customSquare: 0,
        density: 1.4,
        weight: 20,
        resultCalc: 0,
        need: 0,
        inputThickness:true,
        customThickness: 0,
      }
    ],
    mountingMixtures: [
      {
        idInn: 1,
        selected:false,
        type: "mountingMix1",
        density: 1.4,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Кладочно-монтажная смесь",
        name: "Техно, 25 кг (Клей для кладки блоков)",
        thickness: "3-10мм",
        inputThickness:true,
        customThickness: 0,
      },
      {
        idInn: 2,
        selected:false,
        type: "mountingMix2",
        customSquare: 0,
        density: 1.5,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Кладочно-монтажная смесь",
        name: "Пескобетон М-300, 25кг",
        thickness: "более 3мм",
        inputThickness:true,
        customThickness: 0,
      },
      {
        idInn: 3,
        selected:false,
        type: "mountingMix3",
        customSquare: 0,
        density: 1.45,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Кладочно-монтажная смесь",
        name: "Цементно песчанная смесь М-150, 25кг",
        thickness: "более 3мм",
        inputThickness:true,
        customThickness: 0,
      },
      {
        idInn: 4,
        selected:false,
        type: "mountingMix4",
        customSquare: 0,
        density: 5,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Кладочно-монтажная смесь",
        name: "КТП 500, 25кг (Клей для приклеивания теплоизоляции)",
        thickness: "-",
        inputThickness:false,
        customThickness: 1,
      },
      {
        idInn: 5,
        selected:false,
        type: "mountingMix5",
        customSquare: 0,
        density: 5,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Кладочно-монтажная смесь",
        name:
          "КТУ 1000, 25кг (Клей для приклеивания и армирования теплоизоляции)",
        thickness: "-",
        inputThickness:false,
        customThickness: 1,
      },
      {
        idInn: 6,
        selected:false,
        type: "mountingMix6",
        customSquare: 0,
        density: 5,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "Кладочно-монтажная смесь",
        name: "MIX BEST Клей для теплоизоляции универсальный, 20кг",
        thickness: "-",
        inputThickness:false,
        customThickness: 1,
      },
      {
        idInn: 7,
        selected:false,
        type: "mountingMix7",
        customSquare: 0,
        density: 1.45,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "Кладочно-монтажная смесь",
        name: "MIX BEST Смесь цементно-песчаная, 20кг",
        thickness: "более 3мм",
        inputThickness:true,
        customThickness: 0,
      }
    ],
    gypsumPlaster: [
      {
        idInn: 1,
        selected:false,
        type: "gypsumPlaster1",
        density: 1.25,
        weight: 30,
        resultCalc: 0,
        need: 0,
        text: "Гипсовая штукатурка",
        name: "Пласт Гипс, 30кг",
        thickness: "2-80мм",
        inputThickness:true,
        customThickness: 0,
      },
      {
        idInn: 2,
        selected:false,
        type: "gypsumPlaster2",
        customSquare: 0,
        density: 1,
        weight: 30,
        resultCalc: 0,
        need: 0,
        text: "Гипсовая штукатурка",
        name: "Пласт Гипс Тонкий, 30кг",
        thickness: "2-20мм",
        inputThickness:true,
        customThickness: 0,
      }
    ],
    decorativePlaster: [
      {
        idInn: 1,
        selected:false,
        type: "decorativePlaster1",
         customSquare: 0,
        density: 3,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Декоративная  штукатурка",
        name: "Декоративная  штукатурка Короед 2, 25кг",
        thickness: "-",
        inputThickness:false,
        customThickness: 1,
      },
      {
        idInn: 2,
        selected:false,
        type: "decorativePlaster2",
        customSquare: 0,
        density: 4,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Декоративная  штукатурка",
        name: "Декоративная  штукатурка Короед 3, 25кг",
        thickness: "-",
        inputThickness:false,
        customThickness: 1,
      },
      {
        idInn: 3,
        selected:false,
        type: "decorativePlaster3",
        customSquare: 0,
        density: 2,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Декоративная  штукатурка",
        name: "Декоративная  штукатурка Шуба 1, 25кг",
        thickness: "-",
        inputThickness:false,
        customThickness: 1,
      },
      {
        idInn: 4,
        selected:false,
        type: "decorativePlaster4",
        customSquare: 0,
        density: 3,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Декоративная  штукатурка",
        name: "Декоративная  штукатурка Шуба 2, 25кг",
        thickness: "-",
        inputThickness:false,
        customThickness: 1,
      },
      {
        idInn: 5,
        selected:false,
        type: "decorativePlaster5",
        customSquare: 0,
        density: 4,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Декоративная  штукатурка",
        name: "Декоративная  штукатурка Шуба 3, 25кг",
        thickness: "-",
        inputThickness:false,
        customThickness: 1,
      },
      {
        idInn: 6,
        selected:false,
        type: "decorativePlaster6",
        customSquare: 0,
        density: 3,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "Декоративная  штукатурка",
        name: "MIX BEST Декоративная штукатурка ШУБА, 20кг",
        thickness: "-",
        inputThickness:false,
        customThickness: 1,
      }
    ],
    cementPlaster: [
      {
        idInn: 1,
        selected:false,
        type: "cementPlaster1",
        customSquare: 0,
        density: 1.4,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Цементная штукатурка и шпатлевка",
        name: "Пласт, 25кг (Штукатурка)",
        thickness: "2-20",
        inputThickness:true,
        customThickness: 0,
      },
      {
        idInn: 2,
        selected:false,
        type: "cementPlaster2",
        customSquare: 0,
        density: 0.9,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "Цементная штукатурка и шпатлевка",
        name: "Пласт-Финиш, 20кг  (Шпатлевка)",
        thickness: "1-6",
        inputThickness:true,
        customThickness: 0,
      }
    ],
    mixForFloor: [
      {
        idInn: 1,
        selected:false,
        type: "mixForFloor1",
        customSquare: 0,
        density: 1.3,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Смесь для устройства пола",
        name: "Идеал, 25кг (Наливной пол)",
        thickness: "2-10",
        inputThickness:true,
        customThickness: 0,
      },
      {
        idInn: 2,
        selected:false,
        type: "mixForFloor2",
        customSquare: 0,
        density: 1.5,
        weight: 25,
        resultCalc: 0,
        need: 0,
        text: "Смесь для устройства пола",
        name: "Конкрет, 25 кг (Стяжка для пола)",
        thickness: "5-80",
        inputThickness:true,
        customThickness: 0,
      }
    ],
    mixBest: [
      {
        idInn: 1,
        selected:false,
        type: "mixBest1",
        customSquare: 0,
        density: 5,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "MIX BEST",
        name: "MIX BEST Клей для теплоизоляции универсальный, 20кг",
        thickness: "-",
        inputThickness:false,
        customThickness: 1,
      },
      {
        idInn: 2,
        selected:false,
        type: "mixBest2",
        customSquare: 0,
        density: 5,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "MIX BEST",
        name: "MIX BEST Декоративная штукатурка ШУБА, 20кг",
        thickness: "-",
        inputThickness:true,
        customThickness: 0,
      },
      {
        idInn: 3,
        selected:false,
        type: "mixBest3",
        customSquare: 0,
        density: 1.45,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "MIX BEST",
        name: "MIX BEST Смесь цементно-песчаная, 20кг",
        thickness: "более 3",
        inputThickness:true,
        customThickness: 0,
      },
      {
        idInn: 4,
        selected:false,
        type: "mixBest4",
        customSquare: 0,
        density: 1.4,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "MIX BEST",
        name: "MIX BEST Клей плиточный базовый, 20кг",
        thickness: "3-10",
        inputThickness:true,
        customThickness: 0,
      }
    ],
    mixLKM: [
      {
        idInn: 1,
        selected:false,
        type: "mixLKM1",
        customSquare: 0,
        density: 0.125,
        weight: 5,
        resultCalc: 0,
        need: 0,
        text: "ЛКМ",
        name: "Грунт глубокого проникновения акриловый универсальный, 5л",
        thickness: "-",
        inputThickness:false,
        customThickness: 1,
      },
      {
        idInn: 2,
        selected:false,
        type: "mixLKM2",
        customSquare: 0,
        density: 0.275,
        weight: 6,
        resultCalc: 0,
        need: 0,
        text: "ЛКМ",
        name: "Кварц-грунт (бетоноконтакт) 6кг",
        thickness: "-",
        inputThickness:false,
        customThickness: 1,
      },
      {
        idInn: 3,
        selected:false,
        type: "mixLKM3",
        customSquare: 0,
        density: 0.2,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "ЛКМ",
        name: "Краска фасадная, 20кг (один слой)",
        thickness: "-",
        inputThickness:false,
        customThickness: 1,
      },
      {
        idInn: 4,
        selected:false,
        type: "mixLKM4",
        customSquare: 0,
        density: 0.35,
        weight: 20,
        resultCalc: 0,
        need: 0,
        text: "ЛКМ",
        name: "Краска фасадная, 20кг (два слоя)",
        thickness: "-",
        inputThickness:false,
        customThickness: 1,
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
  mounted() {
    this.flagPrint = "element-to-print";
  },
  methods: {
    resetAllSelect(){
      for(let index=0; index < this.tileAdhesive.length; index++ ){
        alert(this.tileAdhesive[index].idInn)
        this.tileAdhesive[index].selected = false
      }
    },
    resetMainWindows(){
      this.newTileWindows = ""
      this.btnReset = false
      this.resetAllSelect()
    },
    startPrinting() {
      document.querySelector("#element-to-print").className = "online-table";
      const el = document.querySelector("#element-to-print");
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
      document.querySelector("#element-to-print").className = "table";
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
      this.btnReset = true
    },
    deleteItem(id) {
      this.flagOutEstimate = false;
      delete this.outEstimate[id];
      if (!isEm.isEmpty(this.outEstimate)) {
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
  .estimate-text{
    font-style: italic;
  }
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
.btn-reset {
  width: 120px;
  margin: 3px 0;
  color: #444fee;
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

.print-windows {
  border: 2px solid #000;
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

table {
  border-collapse: collapse;
  width: 100%;
  display: none;
}
.online-table {
  border-collapse: collapse;
  width: 100%;
  display: table;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
}
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.share-network {
  text-transform: uppercase;
  font-weight: 500;

  a {
    color: #4e4e4e !important;
  }
}
</style>
