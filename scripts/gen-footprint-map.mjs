// 足迹点阵地图生成（跑一次，产物提交入库；改 PLACES 后重跑）
import DottedMap from "dotted-map";
import fs from "node:fs";

// 城市级 pin：真实经纬度
const PINS = [
  // 中国 13（视觉微偏移防网格吸附重叠）
  { lat: 39.9, lng: 116.4 },   // 北京
  { lat: 36.7, lng: 117.0 },   // 济南（山东）
  { lat: 39.4, lng: 122.3 },   // 大连（微移出海方向）
  { lat: 31.6, lng: 122.2 },   // 上海（微移）
  { lat: 29.8, lng: 119.8 },   // 杭州（江浙沪，微移）
  { lat: 24.1, lng: 119.6 },   // 泉州（再移）
  { lat: 27.1, lng: 120.6 },   // 福州（再移）
  { lat: 23.4, lng: 112.8 },   // 广州（微移）
  { lat: 22.0, lng: 114.8 },   // 香港（微移）
  { lat: 30.9, lng: 103.7 },   // 成都（四川，微移）
  { lat: 29.4, lng: 107.1 },   // 重庆（微移）
  { lat: 25.8, lng: 100.9 },   // 大理（微移）
  { lat: 24.7, lng: 98.1 },    // 腾冲（微移）
  // 日本 3
  { lat: 36.2, lng: 140.4 },   // 东京（微移）
  { lat: 35.2, lng: 136.2 },   // 京都（微移）
  { lat: 34.3, lng: 134.9 },   // 大阪（微移）
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

const map = new DottedMap({ height: 62, grid: "diagonal" });

for (const p of PINS) {
  map.addPin({
    lat: p.lat,
    lng: p.lng,
    svgOptions: { color: "#B88080", radius: 0.7 },
  });
}

const svg = map.getSVG({
  radius: 0.26,
  color: "#9E9890",
  shape: "circle",
  backgroundColor: "transparent",
});

fs.writeFileSync("public/images/footprint-map.svg", svg);
console.log("written: public/images/footprint-map.svg,", PINS.length, "pins");
