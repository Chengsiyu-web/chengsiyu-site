// 足迹区域高亮地图生成（跑一次，产物提交入库；改 VISITED/PINS 后重跑）
// world-atlas（Natural Earth 110m，公有领域）+ d3-geo 投影。
// 输出 path 只带 class/data 属性，填色交给 FootprintMap.astro 的页面 CSS。
import { geoNaturalEarth1, geoPath, geoCentroid } from "d3-geo";
import * as topojson from "topojson-client";
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const topo = require("world-atlas/countries-110m.json");

// 到访国：ISO 3166-1 numeric id + 名称兜底（个别版本 id 缺失）
const VISITED = [
  { cc: "CHN", id: "156", names: ["China"] },
  { cc: "JPN", id: "392", names: ["Japan"] },
  { cc: "ITA", id: "380", names: ["Italy"] },
  { cc: "FRA", id: "250", names: ["France"] },
  { cc: "ESP", id: "724", names: ["Spain"] },
  { cc: "CZE", id: "203", names: ["Czechia", "Czech Rep.", "Czech Republic"] },
  { cc: "HUN", id: "348", names: ["Hungary"] },
  { cc: "DNK", id: "208", names: ["Denmark"] },
  { cc: "ISL", id: "352", names: ["Iceland"] },
];

// 城市点：真实经纬度（中国簇保留微偏移做视觉分离）
const PINS = [
  { lat: 39.9, lng: 116.4 }, { lat: 36.7, lng: 117.0 }, { lat: 38.9, lng: 121.6 },
  { lat: 31.2, lng: 121.5 }, { lat: 30.3, lng: 120.2 }, { lat: 24.9, lng: 118.6 },
  { lat: 26.1, lng: 119.3 }, { lat: 23.1, lng: 113.3 }, { lat: 22.3, lng: 114.2 },
  { lat: 30.7, lng: 104.1 }, { lat: 29.6, lng: 106.5 }, { lat: 25.6, lng: 100.3 },
  { lat: 25.0, lng: 98.5 },
  { lat: 35.7, lng: 139.7 }, { lat: 35.0, lng: 135.8 }, { lat: 34.7, lng: 135.5 },
  { lat: 41.9, lng: 12.5 }, { lat: 43.8, lng: 11.3 }, { lat: 45.4, lng: 12.3 }, { lat: 45.5, lng: 9.2 },
  { lat: 48.9, lng: 2.4 }, { lat: 43.7, lng: 7.3 },
  { lat: 55.7, lng: 12.6 }, { lat: 64.1, lng: -21.9 }, { lat: 41.4, lng: 2.2 },
  { lat: 47.5, lng: 19.0 }, { lat: 50.1, lng: 14.4 },
];

const ITALY_PULSE = { lat: 43.0, lng: 12.0 }; // 意大利簇中心（呼吸点）

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const [[x0, y0], [x1, y1]] = path.bounds({ type: "Sphere" });
const pad = 1.5;
const W = x1 - x0 + pad * 2;
const H = y1 - y0 + pad * 2;

const countries = topo.objects.countries.geometries;
const match = (g, v) => g.id === v.id || v.names.includes(g.properties?.name);

const visitedGeoms = [];
for (const v of VISITED) {
  const g = countries.find((g) => match(g, v));
  if (!g) throw new Error(`country not found: ${v.cc}`);
  visitedGeoms.push({ v, g });
}
const baseGeoms = countries.filter((g) => !visitedGeoms.some(({ g: vg }) => vg === g));
const land = topojson.merge(topo, baseGeoms);

const pt = ([lng, lat]) => projection([lng, lat]);

// Natural Earth 的法国含法属圭亚那，只保留欧洲本土多边形
function featureOf(v, g) {
  let f = topojson.feature(topo, g);
  if (v.cc === "FRA" && f.geometry.type === "MultiPolygon") {
    f = {
      ...f,
      geometry: {
        type: "MultiPolygon",
        coordinates: f.geometry.coordinates.filter((poly) => {
          const c = geoCentroid({ type: "Polygon", coordinates: poly });
          return c[0] > -30;
        }),
      },
    };
  }
  return f;
}
const cityR = W * 0.0034;
const haloR = W * 0.011;

const parts = [];
parts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W.toFixed(1)} ${H.toFixed(1)}" role="img" aria-label="世界地图，高亮去过的地方">`);
parts.push(`<g transform="translate(${(-x0 + pad).toFixed(2)} ${(-y0 + pad).toFixed(2)})">`);
parts.push(`<path class="fp-land" d="${path(land)}"/>`);
for (const { v, g } of visitedGeoms) {
  parts.push(`<path class="fp-visited" data-cc="${v.cc}" d="${path(featureOf(v, g))}"/>`);
}
parts.push(`<g class="fp-cities">`);
for (const p of PINS) {
  const [cx, cy] = pt([p.lng, p.lat]);
  parts.push(`<circle class="fp-city" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${cityR.toFixed(1)}"/>`);
}
parts.push(`</g>`);
const [px, py] = pt([ITALY_PULSE.lng, ITALY_PULSE.lat]);
parts.push(`<circle class="fp-pulse-core" cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(cityR * 0.85).toFixed(1)}"/>`);
parts.push(`<circle class="fp-pulse-halo" cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${haloR.toFixed(1)}"/>`);
parts.push(`</g></svg>`);

writeFileSync("public/images/footprint-map.svg", parts.join("\n"));
console.log(
  `written: public/images/footprint-map.svg  viewBox ${W.toFixed(0)}x${H.toFixed(0)}`,
  `| ${PINS.length} cities | pulse %: ${(px - x0 + pad) / W * 100}, ${(py - y0 + pad) / H * 100}`
);
