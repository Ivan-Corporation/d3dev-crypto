import ReactEcharts from "echarts-for-react";

function Chart({ cryptoData }: any) {
  function calculateMA(dayCount: number, data: string | any[]) {
    var result = [];
    for (var i = 0, len = data.length; i < len; i++) {
      if (i < dayCount) {
        result.push("-");
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
        sum += +data[i - j][1];
      }
      result.push(sum / dayCount);
    }
    return result;
  }
  const dates = cryptoData?.data.map(function (item: { Date: any }) {
    return item.Date;
  });
  const data = cryptoData?.data.map(function (item: {
    Open: string | number;
    Close: string | number;
    High: string | number;
    Low: string | number;
  }) {
    return [+item.Open, +item.Close, +item.High, +item.Low];
  });
  const options = {
    title: {
      text: "  Coin: " + cryptoData?.data[0].Symbol,
      textStyle: {
        color: "white",
      },
    },
    legend: {
      top: 50,
      data: [
        "Data",
        "MA5",
        "MA10",
        "MA20",
        "MA30",
        "Volume",
        "VolumeUSDT",
        "TradeCount",
      ],
      selected: {
        MA5: true,
        MA10: true,
        MA20: true,
        MA30: false,
        Volume: false,
        VolumeUSDT: false,
        TradeCount: false,
      },
      inactiveColor: "#777",
      textStyle: {
        color: "#ccc",
        // ...
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        animation: true,
        type: "cross",
        lineStyle: {
          color: "#376df4",
          width: 2,
          opacity: 1,
        },
      },
    },
    xAxis: {
      type: "category",
      data: dates,
      axisLine: { lineStyle: { color: "#8392A5" } },
    },
    yAxis: {
      scale: true,
      axisLine: { lineStyle: { color: "#8392A5" } },
      splitLine: { show: false },
    },
    grid: {
      bottom: 100,
    },
    dataZoom: [
      {
        textStyle: {
          color: "#8392A5",
        },
        handleIcon:
          "path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
        dataBackground: {
          areaStyle: {
            color: "#8392A5",
          },
          lineStyle: {
            opacity: 0.8,
            color: "#8392A5",
          },
        },
        brushSelect: true,
      },
      {
        type: "inside",
      },
    ],
    series: [
      {
        type: "candlestick",
        name: "Day",
        data: data,
        itemStyle: {
          color: "#FD1050",
          color0: "#0CF49B",
          borderColor: "#FD1050",
          borderColor0: "#0CF49B",
        },
      },
      {
        name: "MA5",
        type: "line",
        data: calculateMA(5, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1,
        },
      },
      {
        name: "MA10",
        type: "line",
        data: calculateMA(10, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1,
        },
      },
      {
        name: "MA20",
        type: "line",
        data: calculateMA(20, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1,
        },
      },
      {
        name: "MA30",
        type: "line",
        data: calculateMA(30, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1,
        },
      },
      {
        name: "Volume",
        type: "line",
        areaStyle: {},
        data: cryptoData?.data.map((item: any) => item["Volume POND"]),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1,
        },
      },
      {
        name: "VolumeUSDT",
        type: "line",
        areaStyle: {},
        data: cryptoData?.data.map((item: any) => item["Volume USDT"]),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1,
        },
      },
      {
        name: "TradeCount",
        type: "line",
        areaStyle: {},
        data: cryptoData?.data.map((item: any) => item["tradecount"]),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1,
        },
      },
    ],
  };
  return (
    <div className="w-full py-8 border rounded-lg shadow bg-gray-800 border-gray-700">
      <ReactEcharts option={options} style={{ height: 500 }} />
    </div>
  );
}

export default Chart;
