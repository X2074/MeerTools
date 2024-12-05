<style lang="scss" scoped>
@import "./index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import BN from "bn.js";
import * as echarts from "echarts";

const legend = ref([
  { name: "Eco-development Fund", color: "#FF9AC4", value: 4732628 },
  { name: "Founding Team Incentives", color: "#12F2E7", value: 4204800 },
  { name: "POW Mining", color: "#FF29F4", value: 0 },
  { name: "Future Development Fund", color: "#FFA142", value: 4204800 },
  { name: "Umayyad 1.0 Staking Rewards", color: "#FFDB29", value: 7426492 },
  { name: "Genesis Mapping", color: "#ACFF43", value: 42108530 },
]);
let totalCirculation = ref(0);
const totalSupply = 210240000;

const POW = ref(0);
const getPow = () => {
  fetch("https://qng.rpc.qitmeer.io", {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: null,
      method: "qng_getSubsidy",
      params: [],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const bigNumber = new BN(data.result.totalsubsidy);
      const decimalNumber = bigNumber.toNumber() / 1e8;
      // setSubsidy(decimalNumber);
      POW.value = decimalNumber;
      legend.value[2].value = decimalNumber;
      getTotal();
    })
    .catch((error) => console.error(error));
};
const getTotal = () => {
  totalCirculation.value = 0;
  //获取总量
  legend.value.forEach((item) => {
    totalCirculation.value += item.value;
  });
};
const interval = ref(null);
interval.value = setInterval(() => {
  getPow();
}, 30 * 1000);
watch(POW, (newV, oldV) => {
  legend.value[2].value = newV;
  getChart();
});
const myChart = ref(null);
const getChart = () => {
  var chartData = legend.value;
  var rich = {
    white: {
      color: "#acff43",
      align: "left",
      padding: [5, 5],
      fontSize: 16,
    },
    class1: {
      color: chartData[0].value,
      align: "center",
      padding: [1, 0],
    },
    class2: {
      color: chartData[1].value,
      align: "center",
      padding: [1, 0],
    },
    class3: {
      color: chartData[2].value,
      align: "center",
      padding: [1, 0],
    },
    class4: {
      color: chartData[3].value,
      align: "center",
      padding: [1, 0],
    },
    class5: {
      color: chartData[4].value,
      align: "center",
      padding: [1, 0],
    },
    class0: {
      color: chartData[5].value,
      align: "center",
      padding: [1, 0],
    },
  };
  var placeHolderStyle = {
    normal: {
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      color: "rgba(0, 0, 0, 0)",
      borderColor: "rgba(0, 0, 0, 0)",
      borderWidth: 0,
    },
  };
  var data = [];
  for (var i = 0; i < chartData.length; i++) {
    data.push(
      {
        value: chartData[i].value,
        name: chartData[i].name,
        itemStyle: {
          color: chartData[i].color,
        },
      },
      {
        value: 4,
        name: "",
        itemStyle: placeHolderStyle,
      }
    );
  }
  var seriesObj = [
    {
      name: "",
      type: "pie",
      clockWise: false,
      radius: [50, 80],
      hoverAnimation: false,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: "outside",
            color: "rgba(154, 154, 154, 1)",
            fontSize: "12",
            formatter: function (params) {
              // var percent = 0;
              /* var total = 0;
              for (var i = 0; i < chartData.length; i++) {
                total += chartData[i].value;
              } */
              // percent = ((params.value / total) * 100).toFixed(0);
              if (params.name !== "") {
                return params.name + "\n{white|" + params.value + " MEER}";
              } else {
                return "";
              }
            },
            rich: rich,
            padding: [-30, -30, 10, -30],
          },
          labelLine: {
            length: 10,
            length2: 60,
          },
          lineStyle: {
            color: "#fff",
          },
        },
      },
      data: data,
    },
  ];
  let option = {
    tooltip: {
      show: true,
    },
    legend: {
      show: false,
    },
    toolbox: {
      show: false,
    },
    series: seriesObj,
  };

  const chart = document.getElementById("J_chart");
  myChart.value = echarts.init(chart);
  myChart.value.setOption(option);
};

onMounted(() => {
  getPow();
  nextTick(() => {
    getChart();
  });
  window.addEventListener("resize", () => {
    if (myChart.value) {
      myChart.value.dispose();
      getChart();
      myChart.value.resize();
    }
  });
});

onUnmounted(() => {
  clearInterval(interval.value);
  interval.value = null;
});
</script>