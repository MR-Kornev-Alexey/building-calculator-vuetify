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

function needWithSurface(surfaceArea, lengthDoors, lengthWin, product) {
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

module.exports.registry = {
  tileInsulation: {
    id_cat: 0,
    name: "Утеплитель",
    products: [
      {
        idInn: 0,
        order: 1,
        shown: true,
        conflict: [
          {
            categoryName: "tileInsulation",
            productId: 1
          }
        ],
        dependsOut: [
          {
            categoryName: "tileInsulation",
            productId: 2
          },
          {
            categoryName: "tileInsulation",
            productId: 3
          },
          {
            categoryName: "tileInsulation",
            productId: 4
          },
          {
            categoryName: "tileInsulation",
            productId: 5
          },
          {
            categoryName: "tileInsulation",
            productId: 6
          },
          {
            categoryName: "tileInsulation",
            productId: 7
          }
        ],
        type: "warmAdhesive3",
        name: "Минераловатная плита 1200×600×100 мм ",
        unit: "шт.",
        density: 1.39,
        weight: 3,
        surface: 0,
        resultCalc: 0,
        measure: "m2",
        need: 0,
        unit_size: "упак.",
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      },
      {
        idInn: 1,
        order: 1,
        shown: true,
        conflict: [
          {
            categoryName: "tileInsulation",
            productId: 0
          }
        ],
        dependsOut: [
          {
            categoryName: "tileInsulation",
            productId: 2
          },
          {
            categoryName: "tileInsulation",
            productId: 3
          },
          {
            categoryName: "tileInsulation",
            productId: 4
          },
          {
            categoryName: "tileInsulation",
            productId: 5
          },
          {
            categoryName: "tileInsulation",
            productId: 6
          },
          {
            categoryName: "tileInsulation",
            productId: 7
          }
        ],
        meta: "all",
        type: "warmAdhesive4",
        name: "Пенополистирол ПСБ-С 25Ф 1200×100×100 мм",
        unit: "шт.",
        density: 0.8,
        weight: 1,
        surface: 0,
        measure: "m2",
        resultCalc: 0,
        need: 0,
        unit_size: "упак.",
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      },
      {
        idInn: 2,
        order: 2,
        shown: false,
        dependsOn: [
          {
            categoryName: "tileInsulation",
            productId: 0
          },
          {
            categoryName: "tileInsulation",
            productId: 1
          }
        ],
        type: "warmAdhesive5",
        name: "КТП 500, 25кг (Клей для приклеивания теплоизоляции)",
        unit: "кг",
        density: 5,
        weight: 25,
        surface: 0,
        measure: "m2",
        resultCalc: 0,
        need: 0,
        unit_size: "меш.",
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      },
      {
        idInn: 3,
        order: 3,
        shown: false,
        dependsOn: [
          {
            categoryName: "tileInsulation",
            productId: 0
          },
          {
            categoryName: "tileInsulation",
            productId: 1
          }
        ],
        type: "warmAdhesive6",
        name:
          "Дюбель тарельчатый с металлическим стержнем и термоголовкой - размер зависит от толщины утеплителя и вида основания",
        unit: "шт.",
        density: 5,
        weight: 1,
        surface: 0,
        measure: "m2",
        resultCalc: 0,
        unit_size: "шт.",
        need: 0,
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      },
      {
        idInn: 4,
        order: 4,
        shown: false,
        dependsOn: [
          {
            categoryName: "tileInsulation",
            productId: 0
          },
          {
            categoryName: "tileInsulation",
            productId: 1
          }
        ],
        type: "warmAdhesive7",
        name:
          "КТУ 1000, 25кг (Клеевой состав для нанесения армирующего штукатурного слоя)",
        unit: "кг.",
        density: 5,
        weight: 25,
        surface: 0,
        measure: "m2",
        resultCalc: 0,
        unit_size: "меш.",
        need: 0,
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      },
      {
        idInn: 5,
        order: 5,
        shown: false,
        type: "warmAdhesive8",
        name: "Армирующая сетка из стекловолокна щелочестойкая (1x50м)",
        unit: "м2",
        density: 1.1,
        weight: 50,
        surface: 0,
        measure: "m2",
        resultCalc: 0,
        unit_size: "рул.",
        need: 0,
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      },
      {
        idInn: 6,
        order: 0,
        shown: false,
        type: "warmAdhesive1",
        name:
          "Грунт глубокопроникающий акриловый, 5л (для подготовки основания к монтажу плит)",
        unit: "литр.",
        density: 0.15,
        weight: 5,
        surface: 0,
        resultCalc: 0,
        measure: "m2",
        need: 0,
        unit_size: "канистр.",
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      },
      {
        idInn: 7,
        order: 0,
        shown: false,
        type: "warmAdhesive2",
        dependsOn: [
          {
            categoryName: "plastering",
            productId: 0
          },
          {
            categoryName: "plastering",
            productId: 1
          }
        ],
        name:
          "Кварц-грунт, 6кг (для подготовки бетонного основания к монтажу плит)",
        unit: "кг",
        density: 0.3,
        weight: 5,
        surface: 0,
        resultCalc: 0,
        measure: "m2",
        need: 0,
        unit_size: "ведр.",
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      }
    ]
  },
  plastering: {
    id_cat: 1,
    order: 8,
    name: "Декоративная штукатурка",
    products: [
      {
        idInn: 0,
        order: 8,
        conflict: [
          {
            categoryName: "plastering",
            productId: 1
          },
          {
            categoryName: "plastering",
            productId: 2
          },
          {
            categoryName: "plastering",
            productId: 3
          },
          {
            categoryName: "plastering",
            productId: 4
          },
          {
            categoryName: "plastering",
            productId: 5
          }
        ],
        shown: true,
        meta: "all",
        dependsOut: [
          {
            categoryName: "plastering",
            productId: 6
          }
        ],
        type: "plastering1",
        name: "Декоративная штукатурка «Короед» зерно 2,0 мм (25кг)",
        unit: "кг",
        density: 3,
        weight: 25,
        surface: 0,
        resultCalc: 0,
        need: 0,
        unit_size: "меш.",
        measure: "m2",
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      },
      {
        idInn: 1,
        order: 8,
        conflict: [
          {
            categoryName: "plastering",
            productId: 0
          },
          {
            categoryName: "plastering",
            productId: 2
          },
          {
            categoryName: "plastering",
            productId: 3
          },
          {
            categoryName: "plastering",
            productId: 4
          },
          {
            categoryName: "plastering",
            productId: 5
          }
        ],
        shown: true,
        dependsOut: [
          {
            categoryName: "plastering",
            productId: 6
          }
        ],
        meta: "all",
        type: "plastering2",
        name: "Декоративная штукатурка «Короед» зерно 3,0 мм (25кг)",
        unit: "кг",
        density: 4,
        weight: 25,
        surface: 0,
        resultCalc: 0,
        need: 0,
        measure: "m2",
        unit_size: "меш.",
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      },
      {
        idInn: 2,
        order: 8,
        conflict: [
          {
            categoryName: "plastering",
            productId: 0
          },
          {
            categoryName: "plastering",
            productId: 1
          },
          {
            categoryName: "plastering",
            productId: 3
          },
          {
            categoryName: "plastering",
            productId: 4
          },
          {
            categoryName: "plastering",
            productId: 6
          }
        ],
        shown: true,
        dependsOut: [
          {
            categoryName: "plastering",
            productId: 5
          }
        ],
        meta: "all",
        type: "plastering3",
        name: "Декоративная штукатурка «Шуба» зерно 1,0 мм (25кг)",
        unit: "кг",
        density: 2,
        weight: 25,
        resultCalc: 0,
        surface: 0,
        need: 0,
        measure: "m2",
        unit_size: "меш.",
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      },
      {
        idInn: 3,
        order: 8,
        conflict: [
          {
            categoryName: "plastering",
            productId: 0
          },
          {
            categoryName: "plastering",
            productId: 1
          },
          {
            categoryName: "plastering",
            productId: 2
          },
          {
            categoryName: "plastering",
            productId: 4
          },
          {
            categoryName: "plastering",
            productId: 6
          }
        ],
        shown: true,
        dependsOut: [
          {
            categoryName: "plastering",
            productId: 5
          }
        ],
        meta: "all",
        type: "plastering4",
        name: "Декоративная штукатурка «Шуба» зерно 2,0 мм (25кг)",
        unit: "кг",
        density: 3,
        weight: 25,
        resultCalc: 0,
        surface: 0,
        need: 0,
        measure: "m2",
        unit_size: "меш.",
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      },
      {
        idInn: 4,
        conflict: [
          {
            categoryName: "plastering",
            productId: 0
          },
          {
            categoryName: "plastering",
            productId: 1
          },
          {
            categoryName: "plastering",
            productId: 2
          },
          {
            categoryName: "plastering",
            productId: 3
          },
          {
            categoryName: "plastering",
            productId: 6
          }
        ],
        order: 8,
        shown: true,
        dependsOut: [
          {
            categoryName: "plastering",
            productId: 5
          }
        ],
        meta: "all",
        type: "plastering5",
        name: "Декоративная штукатурка «Шуба» зерно 3,0 мм (25кг)",
        unit: "кг",
        density: 4,
        weight: 25,
        surface: 0,
        resultCalc: 0,
        need: 0,
        measure: "m2",
        unit_size: "меш.",
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      },
      {
        idInn: 5,
        order: 7,
        conflict: [
          {
            categoryName: "plastering",
            productId: 6
          }
        ],
        shown: false,
        dependsOn: [
          {
            categoryName: "plastering",
            productId: 2
          },
          {
            categoryName: "plastering",
            productId: 3
          },
          {
            categoryName: "plastering",
            productId: 4
          }
        ],
        type: "warmAdhesive1",
        name:
          "Грунт глубокопроникающий акриловый, 5л (для подготовки основания под нанесение декоративной штукатурки)",
        unit: "литр.",
        density: 0.15,
        weight: 5,
        surface: 0,
        resultCalc: 0,
        measure: "m2",
        need: 0,
        unit_size: "канистр.",
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      },
      {
        idInn: 6,
        order: 7,
        shown: false,
        type: "warmAdhesive2",
        dependsOn: [
          {
            categoryName: "plastering",
            productId: 0
          },
          {
            categoryName: "plastering",
            productId: 1
          }
        ],
        name:
          "Кварц-грунт, 6кг (для подготовки основания под нанесение декоративной штукатурки)",
        unit: "кг",
        density: 0.3,
        weight: 5,
        surface: 0,
        resultCalc: 0,
        measure: "m2",
        need: 0,
        unit_size: "ведр.",
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      }
    ]
  },
  tilePainting: {
    products: [
      {
        idInn: 0,
        order: 9,
        shown: false,
        type: "tilePainting1",
        name: "Краска фасадная 2 слоя",
        unit: "кг",
        density: 0.35,
        weight: 20,
        surface: 0,
        resultCalc: 0,
        need: 0,
        measure: "m2",
        unit_size: "ведр.",
        needFormula: needWithSurface,
        resultCalcFormula: resultCalcWithSurface,
        resultSurfaceFormula: resultSurface
      }
    ]
  },
  winAndDoors: {
    products: [
      {
        idInn: 0,
        order: 6,
        shown: true,
        type: "winAndDoors0",
        name:
          "Уголок с армирующей сеткой и сердечником из ПВХ  150/100мм, (2,5м)",
        unit: "шт.",
        density: 2.5,
        weight: 1,
        surface: 0,
        measure: "метров",
        resultCalc: 0,
        need: 0,
        unit_size: "шт.",
        needFormula: needWithoutSurface,
        resultCalcFormula: resultCalcWithoutSurface,
        resultSurfaceFormula: resultWithoutSurface
      },
      {
        idInn: 1,
        order: 6,
        shown: true,
        type: "winAndDoors1",
        name: "Профиль примыкания оконный с сеткой (2,4 м)",
        unit: "шт.",
        density: 2.4,
        weight: 1,
        surface: 0,
        resultCalc: 0,
        measure: "метров",
        unit_size: "шт.",
        need: 0,
        needFormula: needOnlyWindows,
        resultCalcFormula: resultCalcWindows,
        resultSurfaceFormula: resultOnlyWindows
      }
    ]
  }
};
