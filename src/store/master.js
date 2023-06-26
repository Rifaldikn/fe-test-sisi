// Utilities
import { defineStore } from "pinia";

export const useMasterDataStore = defineStore("masterData", {
  state: () => ({
    warehouses: [
      {
        id: 1,
        name: "Jakarta",
      },
      {
        id: 2,
        name: "Tangerang",
      },
      {
        id: 3,
        name: "Bogor",
      },
      {
        id: 4,
        name: "Depok",
      },
      {
        id: 5,
        name: "Bekasi",
      },
    ],
    brands: [
      {
        id: 1,
        name: "Joyko",
      },
      {
        id: 2,
        name: "Kenko",
      },
      {
        id: 3,
        name: "Kenko",
      },
      {
        id: 4,
        name: "Faber Castel",
      },
      {
        id: 5,
        name: "Bindex",
      },
      {
        id: 6,
        name: "Sidu",
      },
      {
        id: 7,
        name: "Stabilo",
      },
    ],
    uom: [
      {
        name: "Bal",
      },
      {
        name: "Pcs",
      },
      {
        name: "Dus",
      },
      {
        name: "Pak",
      },
    ],
    items: [
      {
        id: 1,
        name: "Pensil",
      },
      {
        id: 2,
        name: "Penghapus",
      },
      {
        id: 3,
        name: "Pulpel",
      },
      {
        id: 4,
        name: "Penggaris",
      },
    ],
  }),
});
