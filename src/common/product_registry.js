function needWithoutSurface(surfaceArea, lengthDoors, lengthWin, product) {
  const resultCalc = resultCalcWithoutSurface(
    surfaceArea,
    lengthDoors,
    lengthWin,
    product
  );
  return Math.ceil(resultCalc / product.weight);
}

function resultCalcWindows(surfaceArea, lengthDoors, lengthWin, product) {
  return Math.ceil(lengthWin / product.density);
}

function needOnlyWindows(surfaceArea, lengthDoors, lengthWin, product) {
  const resultCalc = resultCalcWindows(
    surfaceArea,
    lengthDoors,
    lengthWin,
    product
  );
  return Math.ceil(resultCalc / product.weight);
}

function resultCalcWithoutSurface(
  surfaceArea,
  lengthDoors,
  lengthWin,
  product
) {
  return Math.ceil((lengthDoors + lengthWin) / product.density);
}

/* eslint-disable no-unused-vars */
function resultCalcWithSurface(surfaceArea, lengthDoors, lengthWin, product) {
  return Math.ceil(+surfaceArea * product.density);
}

function needWitSurface(surfaceArea, lengthDoors, lengthWin, product) {
  const resultCalc = resultCalcWithSurface(
    surfaceArea,
    lengthDoors,
    lengthWin,
    product
  );
  return Math.ceil(resultCalc / product.weight);
}

/* eslint-disable no-unused-vars */
function resultSurface(surfaceArea, lengthDoors, lengthWin) {
  return surfaceArea;
}

function resultOnlyWindows(surfaceArea, lengthDoors, lengthWin) {
  return lengthWin;
}
function resultWithoutSurface(surfaceArea, lengthDoors, lengthWin) {
  return lengthDoors + lengthWin;
}

module.exports = {
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
      surface: 0,
      resultCalc: 0,
      measure: "m2",
      need: 0,
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
    },
    {
      idInn: 2,
      type: "warmAdhesive2",
      name:
        "Кварц-грунт, 6кг (для подготовки бетонного основания к монтажу плит)",
      unit: "кг",
      density: 0.3,
      weight: 5,
      surface: 0,
      resultCalc: 0,
      measure: "m2",
      need: 0,
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
    },
    {
      idInn: 3,
      type: "warmAdhesive3",
      name: "Минераловатная плита 1200×600×100 мм ",
      unit: "шт.",
      density: 1.4,
      weight: 3,
      surface: 0,
      resultCalc: 0,
      measure: "m2",
      need: 0,
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
    },
    {
      idInn: 4,
      type: "warmAdhesive4",
      name: "Пенополистирол ПСБ-С 25Ф 1200×100×100 мм",
      unit: "шт.",
      density: 0.8,
      weight: 1,
      surface: 0,
      measure: "m2",
      resultCalc: 0,
      need: 0,
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
    },
    {
      idInn: 5,
      type: "warmAdhesive5",
      name: "КТП 500, 25кг (Клей для приклеивания теплоизоляции)",
      unit: "кг",
      density: 5,
      weight: 25,
      surface: 0,
      measure: "m2",
      resultCalc: 0,
      need: 0,
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
    },
    {
      idInn: 6,
      type: "warmAdhesive6",
      name: "Дюбель тарельчатый с металическим стержнем и термоголовкой",
      unit: "шт.",
      density: 5,
      weight: 1,
      surface: 0,
      measure: "m2",
      resultCalc: 0,
      need: 0,
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
    },
    {
      idInn: 7,
      type: "warmAdhesive7",
      name:
        "КТУ 1000, 25кг (Клеевой состав для нанесения армирующего штукатурного слоя)",
      unit: "кг.",
      density: 5,
      weight: 25,
      surface: 0,
      measure: "m2",
      resultCalc: 0,
      need: 0,
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
    },
    {
      idInn: 8,
      type: "warmAdhesive8",
      name: "Армирующая сетка из стекловолокна щелочестойкая",
      unit: "м2",
      density: 1.1,
      weight: 50,
      surface: 0,
      measure: "метров",
      resultCalc: 0,
      need: 0,
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
    },
    {
      idInn: 9,
      type: "warmAdhesive9",
      name:
        "Уголок с армирующей сеткой и сердечником из ПВХ  150/100мм, (2,5м)",
      unit: "шт.",
      density: 2.5,
      weight: 1,
      surface: 0,
      measure: "метров",
      resultCalc: 0,
      need: 0,
      needFormula: needWithoutSurface,
      resultCalcFormula: resultCalcWithoutSurface,
      resultSurfaceFormula: resultWithoutSurface
    },
    {
      idInn: 10,
      type: "warmAdhesive10",
      name: "Профиль примыкания оконный с сеткой (2,4м)",
      unit: "шт.",
      density: 2.4,
      weight: 1,
      surface: 0,
      resultCalc: 0,
      measure: "метров",
      need: 0,
      needFormula: needOnlyWindows,
      resultCalcFormula: resultCalcWindows,
      resultSurfaceFormula: resultOnlyWindows
    },
    {
      idInn: 11,
      type: "warmAdhesive11",
      name:
        "Грунт глубокопроникающий акриловый, 5л (для подготовки основания под нанесение декоративной штукатурки)",
      unit: "литров",
      density: 0.15,
      weight: 5,
      surface: 0,
      resultCalc: 0,
      measure: "m2",
      need: 0,
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
    },
    {
      idInn: 12,
      type: "warmAdhesive12",
      name:
        "Кварц-грунт, 6кг  (для подготовки основания под нанесение декоративной штукатурки) ",
      unit: "кг",
      density: 0.3,
      weight: 6,
      surface: 0,
      resultCalc: 0,
      need: 0,
      measure: "m2",
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
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
      surface: 0,
      resultCalc: 0,
      need: 0,
      measure: "m2",
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
    },
    {
      idInn: 2,
      type: "plastering2",
      name: "Декоративная штукатурка «Короед» зерно 3,0 мм",
      unit: "кг",
      density: 4,
      weight: 25,
      surface: 0,
      resultCalc: 0,
      need: 0,
      measure: "m2",
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
    },
    {
      idInn: 3,
      type: "plastering3",
      name: "Декоративная штукатурка «Шуба» зерно 1,0 мм",
      unit: "кг",
      density: 2,
      weight: 25,
      resultCalc: 0,
      surface: 0,
      need: 0,
      measure: "m2",
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
    },
    {
      idInn: 4,
      type: "plastering4",
      name: "Декоративная штукатурка «Шуба» зерно 2,0 мм",
      unit: "кг",
      density: 3,
      weight: 25,
      resultCalc: 0,
      surface: 0,
      need: 0,
      measure: "m2",
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
    },
    {
      idInn: 5,
      type: "plastering5",
      name: "Декоративная штукатурка «Короед» зерно 3,0 мм",
      unit: "кг",
      density: 4,
      weight: 25,
      surface: 0,
      resultCalc: 0,
      need: 0,
      measure: "m2",
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
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
      surface: 0,
      resultCalc: 0,
      need: 0,
      measure: "m2",
      needFormula: needWitSurface,
      resultCalcFormula: resultCalcWithSurface,
      resultSurfaceFormula: resultSurface
    }
  ]
};
