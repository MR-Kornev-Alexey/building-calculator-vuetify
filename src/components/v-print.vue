<template>
  <div class="v-print">
    <!-- SOURCE -->
    <div id="printMe"></div>
    <!-- OUTPUT -->
    <v-btn color="#444fee" text outlined @click="printing" class="btn-cat"
      >Напечатать
    </v-btn>
  </div>
</template>

<script>
import { Printd } from "printd";
const cssText = `
  table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
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
`;
export default {
  name: "v-print",

  data() {
    return {
      output: null
    };
  },
  mounted() {},

  methods: {
    printing() {
      this.d = new Printd();
      this.d.print(document.getElementById("element-to-print"), [cssText]);
    }
  }
};
</script>
