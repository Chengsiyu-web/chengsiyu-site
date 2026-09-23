// 足迹点阵地图生成（跑一次，产物提交入库；改 PLACES 后重跑）
import DottedMap from "dotted-map";
import fs from "node:fs";

// 城市级 pin：真实经纬度
const PINS = [
  // 中国 13
  { lat: 39.9, lng: 116.4 },   // 北京
  { lat: 36.7, lng: 117.0 },   // 济南（山东）
  { lat: 38.9, lng: 121.6 },   // 大连
  { lat: 31.2, lng: 121.5 },   // 上海
  { lat: 30.3, lng: 120.2 },   // 杭州（江浙沪）
  { lat: 24.9, lng: 118.6 },   // 泉州
  { lat: 26.1, lng: 119.3 },   // 福州
  { lat: 23.1, lng: 113.3 },   // 广州
  { lat: 22.3, lng: 114.2 },   // 香港
  { lat: 30.7, lng: 104.1 },   // 成都（四川）
  { lat: 29.6, lng: 106.5 },   // 重庆
  { lat: 25.6, lng: 100.3 },   // 大理
  { lat: 25.0, lng: 98.5 },    // 腾冲
  // 日本 3
  { lat: 35.7, lng: 139.7 },   // 东京
  { lat: 35.0, lng: 135.8 },   // 京都
  { lat: 34.7, lng: 135.5 },   // 大阪
  // 意大利 4
  { lat: 41.9, lng: 12.5 },    // 罗马
  { lat: 43.8, lng: 11.3 },    // 佛罗伦萨
  { lat: 45.4, lng: 12.3 },    // 威尼斯
  { lat: 45.5, lng: 9.2 },     // 米兰
  // 法国 2
  { lat: 48.9, lng: 2.4 },     // 巴黎
  { lat: 43.7, lng: 7.3 },     // 尼斯（南法）
  // 各一城 5
  { lat: 55.7, lng: 12.6 },    // 哥本哈根
  { lat: 64.1, lng: -21.9 },   // 雷克雅未克
  { lat: 41.4, lng: 2.2 },     // 巴塞罗那
  { lat: 47.5, lng: 19.0 },    // 布达佩斯
  { lat: 50.1, lng: 14.4 },    // 布拉格
];

const map = new DottedMap({ height: 46, grid: "diagonal" });

for (const p of PINS) {
  map.addPin({
    lat: p.lat,
    lng: p.lng,
    svgOptions: { color: "#B88080", radius: 0.55 },
  });
}

const svg = map.getSVG({
  radius: 0.22,
  color: "#9E9890",
  shape: "circle",
  backgroundColor: "transparent",
});

fs.writeFileSync("public/images/footprint-map.svg", svg);
console.log("written: public/images/footprint-map.svg,", PINS.length, "pins");
