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
                <h3>Введите длину углов здания и дверных проемов. </h3>
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
                <h3>Введите длину оконных проемов. </h3>
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
                            @change="selectData(index.idInn)"
                    ></v-checkbox>
                    <v-flex class="choice-table text-left align-self-center">
                        {{ index.name }}
                    </v-flex>
                </v-flex>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "v-warm",
        data: () => ({
            squareWarm: 0,
            lengthDoors: 0,
            warmWindows: "",
            flagCategoryWarm: "",
            outEstimateWarm: "",
            categoryWarm: [
                {id_cat: 1, name: "Утеплитель"},
                {id_cat: 2, name: "Декоративная штукатурка"},
                {id_cat: 3, name: "Краска фасадная"},
               ],
            tileInsulation: [
                {
                    idInn: 1,
                    type: "warmAdhesive1",
                    name: "Грунт глубокопроникающий акриловый, 5л (для подготовки основания к монтажу плит)",
                    unit: "литров",
                    density: 0.15,
                    weight: 5,
                    resultCalc: 0,
                    need: 0
                },
                {
                    idInn: 2,
                    type: "warmAdhesive2",
                    name: "Кварц-грунт, 6кг (для подготовки бетонного основания к монтажу плит)",
                    unit: "литров",
                    density: 0.15,
                    weight: 5,
                    resultCalc: 0,
                    need: 0
                },
                {
                    idInn: 2,
                    type: "warmAdhesive2",
                    name: "Кварц-грунт, 6кг (для подготовки бетонного основания к монтажу плит)",
                    unit: "литров",
                    density: 0.15,
                    weight: 5,
                    resultCalc: 0,
                    need: 0
                },
                {
                    idInn: 2,
                    type: "warmAdhesive2",
                    name: "Кварц-грунт, 6кг (для подготовки бетонного основания к монтажу плит)",
                    unit: "литров",
                    density: 0.15,
                    weight: 5,
                    resultCalc: 0,
                    need: 0
                },
                {
                    idInn: 2,
                    type: "warmAdhesive2",
                    name: "Кварц-грунт, 6кг (для подготовки бетонного основания к монтажу плит)",
                    unit: "литров",
                    density: 0.15,
                    weight: 5,
                    resultCalc: 0,
                    need: 0
                },



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
                },

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
            resultEstimate() {
                return this.outEstimateWarm;
            },
            resultTileWarm() {
                return this.warmWindows;
            }
        },
        methods: {
            choiceWarm(i) {
                this.flagCategoryWarm = "";
                if (i === 1) {
                    this.warmWindows = this.tileInsulation;
                    this.flagCategory = "tileInsulation";
                } else if (i === 2) {
                    this.warmWindows = this.plastering;
                    this.flagCategory = "plastering";
                } else if (i === 3) {
                    this.warmWindows = this.tilePainting;
                    this.flagCategory = "tilePainting";
                }

            },
        }
    };
</script>

<style scoped></style>
