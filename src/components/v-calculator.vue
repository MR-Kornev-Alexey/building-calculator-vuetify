<template>
  <v-container>
    <v-row justify="center">
      <h1>Расчет необходимого количества строительных материалов</h1>
      <p class="estimate-text">
        Онлайн расчет носит информативный характер. Детали уточняйте у наших
        менеждеров.
      </p>
    </v-row>
    <v-row class="text-center justify-center mt-8">
      <v-col cols="10" md="4">
        <v-btn
          :key="index.id_cat"
          @click="choice(index.id_cat)"
          class="btn-cat"
          color="#444fee"
          outlined
          text
          v-for="index in category"
          >{{ index.name }}
        </v-btn>
      </v-col>
      <v-col class=" main-windows" cols="10" md="6">
        <v-flex
          :key="index.idInn"
          class="d-flex align-self-center"
          v-for="index in newTileWindows"
        >
          <v-checkbox
            @change="selectData(index.idInn)"
            v-model="index.selected"
          ></v-checkbox>
          <v-flex class="choice-table text-left align-self-center">
            {{ index.name }}
          </v-flex>
        </v-flex>
        <v-btn
          @click="resetMainWindows()"
          class="btn-reset"
          color="#444fee"
          outlined
          text
          v-if="btnReset"
          >Сбросить
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      class="text-center forPrint justify-center mt-8"
      v-if="flagOutEstimate"
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
          :key="index.idInn"
          class="d-flex align-content-center choice-table-down"
          v-for="index in outEstimate"
        >
          <v-flex class="d-flex align-self-center result-name">
            {{ index.name }}
          </v-flex>
          <v-flex class="d-flex align-self-center justify-start result-110">
            {{ index.thickness }}
          </v-flex>

          <v-text-field
            @change="filterData(index.type)"
            @keyup.enter="filterData(index.type)"
            class="result-110"
            id="custom"
            placeholder="...толщина"
            required
            type="text"
            v-if="index.inputThickness"
            v-model.number="index.customThickness"
          />
          <v-flex
            class="d-flex align-self-center justify-start result-110"
            v-if="!index.inputThickness"
          >
            {{ index.customThickness }}
          </v-flex>
          <v-text-field
            @change="filterData(index.type)"
            @keyup.enter="filterData(index.type)"
            class="result-110"
            id="square"
            placeholder="...площадь"
            required
            type="text"
            v-model.number="index.customSquare"
          />

          <v-flex
            class="result-100  d-flex d-flex align-self-center pb-1 justify-center "
            >{{ index.resultCalc }}
          </v-flex>
          <v-flex class="result-100  d-flex align-self-center justify-center "
            >{{ index.need }} {{ index.unit }}
          </v-flex>
          <v-flex class="result-100 d-flex align-self-center justify-center ">
            <v-icon :id="index.type" @click="deleteItem(index.type)">
              mdi-delete
            </v-icon>
          </v-flex>
        </v-flex>
      </v-col>

    </v-row>
    <v-row class="justify-center">
      <div class="col-md-10 text-right">
        <v-btn v-if="btnResetEstimate"
                @click="resetMainEstimate()"
                class="btn-reset"
                color="#444fee"
                outlined
                text
        >Очистить
        </v-btn>
      </div>
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
        <tr :key="index.idInn" v-for="index in outEstimate">
          <td>{{ index.name }}</td>
          <td>{{ index.thickness }}</td>
          <td>{{ index.customThickness }}</td>
          <td>{{ index.resultCalc }}</td>
          <td>{{ index.customSquare }}</td>
          <td>{{ index.need }} {{ index.unit }}</td>
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
import buildMaterialsRegistry from "../common/buildMaterialsRegistry";
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
    btnResetEstimate:false,
    btnReset: false,
    outEstimate: {},
    flagOutEstimate: false,
    newTileWindows: "",
    flagPrint: "",
    category: [
      {
        id_cat: 0,
        name: "Плиточный клей",
        materials: buildMaterialsRegistry.tileAdhesiveDefault()
      },
      {
        id_cat: 1,
        name: "Кладочно-монтажная смесь",
        materials: buildMaterialsRegistry.mountingMixturesDefault()
      },
      {
        id_cat: 2,
        name: "Гипсовая штукатурка",
        materials: buildMaterialsRegistry.gypsumPlasterDefault()
      },
      {
        id_cat: 3,
        name: "Декоративная штукатурка",
        materials: buildMaterialsRegistry.decorativePlasterDefault()
      },
      {
        id_cat: 4,
        name: "Цементная штукатурка и шпатлевка",
        materials: buildMaterialsRegistry.cementPlasterDefault()
      },
      {
        id_cat: 5,
        name: "Смесь для устройства пола",
        materials: buildMaterialsRegistry.mixForFloorDefault()
      },
      {
        id_cat: 6,
        name: "MIX BEST",
        materials: buildMaterialsRegistry.mixBestDefault()
      },
      {
        id_cat: 7,
        name: "ЛКМ",
        materials: buildMaterialsRegistry.mixLKMDefault()
      }
    ],
  }),

  mounted() {
    this.flagPrint = "element-to-print";
  },
  methods: {
    resetMainEstimate(){
      this.outEstimate = {}
    },
    resetMainWindows() {
      this.newTileWindows = "";
      this.btnReset = false;
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
      this.newTileWindows = JSON.parse(JSON.stringify(this.category[i].materials));
      this.btnReset = true;
    },
    deleteItem(id) {
      this.flagOutEstimate = false;
      delete this.outEstimate[id];
      if (!isEm.isEmpty(this.outEstimate)) {
        this.flagOutEstimate = true;
      }
    },
    selectData(i) {
      if(this.newTileWindows[i].selected){
        this.flagOutEstimate = false
        this.outEstimate[this.newTileWindows[i].type] = this.newTileWindows[i]
        this.btnResetEstimate = this.flagOutEstimate = true
      }else {
        return false
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
.estimate-text {
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
    padding-top: 20px;
  }
}

.result-110 {
  width: 110px;
  text-align: left;
  padding-bottom: 10px;
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
