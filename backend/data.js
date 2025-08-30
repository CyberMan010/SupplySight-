// 1. Seed sample data
let products = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
  { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 },
  { id: "P-1005", name: "Aluminum Spacer", sku: "SPC-AL-10", warehouse: "BLR-A", stock: 60, demand: 40 },
  { id: "P-1006", name: "Spring Washer", sku: "SPR-WSR-12", warehouse: "PNQ-C", stock: 90, demand: 60 },
  { id: "P-1007", name: "Lock Nut", sku: "LCK-NUT-10", warehouse: "DEL-B", stock: 30, demand: 50 },
  { id: "P-1008", name: "Flat Washer", sku: "FLT-WSR-08", warehouse: "BLR-A", stock: 120, demand: 100 },
  { id: "P-1009", name: "Hex Nut", sku: "HEX-NUT-12", warehouse: "PNQ-C", stock: 70, demand: 90 },
  { id: "P-1010", name: "Threaded Rod", sku: "THRD-ROD-16", warehouse: "DEL-B", stock: 40, demand: 30 },
  { id: "P-1011", name: "Wing Nut", sku: "WNG-NUT-08", warehouse: "BLR-A", stock: 55, demand: 45 },
  { id: "P-1012", name: "Split Pin", sku: "SPLT-PIN-06", warehouse: "PNQ-C", stock: 100, demand: 80 },
  { id: "P-1013", name: "Cotter Pin", sku: "CTTR-PIN-04", warehouse: "DEL-B", stock: 20, demand: 25 },
  { id: "P-1014", name: "Machine Screw", sku: "MCH-SCR-10", warehouse: "BLR-A", stock: 75, demand: 60 },
  { id: "P-1015", name: "Cap Nut", sku: "CAP-NUT-12", warehouse: "PNQ-C", stock: 35, demand: 40 },
  { id: "P-1016", name: "Square Nut", sku: "SQR-NUT-10", warehouse: "DEL-B", stock: 65, demand: 70 },
  { id: "P-1017", name: "T-Nut", sku: "T-NUT-08", warehouse: "BLR-A", stock: 85, demand: 90 },
  { id: "P-1018", name: "Dome Nut", sku: "DOME-NUT-10", warehouse: "PNQ-C", stock: 45, demand: 50 },
  { id: "P-1019", name: "Eye Bolt", sku: "EYE-BOLT-12", category: "steel", warehouse: "DEL-B", stock: 25, demand: 30 }
];

let warehouses = [
  { code: "BLR-A", name: "Bangalore A", city: "Bangalore", country: "India" },
  { code: "PNQ-C", name: "Pune C", city: "Pune", country: "India" },
  { code: "DEL-B", name: "Delhi B", city: "Delhi", country: "India" }
];




module.exports = { products, warehouses };