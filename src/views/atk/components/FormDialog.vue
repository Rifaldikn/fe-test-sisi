<script setup>
import { ref } from "vue";
import { required } from "@/helpers/inputRules.js";
import { VDataTable } from "vuetify/labs/VDataTable";
import { useMasterDataStore } from "@/store/master";

import FieldTitle from "@/components/FieldTitle.vue";

const masterStore = useMasterDataStore();

const emit = defineEmits(["close"]);

const formBase = {
  warehouse: null,
  itemName: null,
  uom: null,
  quantity: null,
  brand: null,
  remarks: null,
};

const headers = [
  {
    title: "Warehouse",
    align: "center",
    width: "auto",
    value: "warehouse.name",
    key: "warehouse.name",
  },
  {
    title: "Item Name",
    align: "center",
    width: "auto",
    value: "itemName.name",
    key: "itemName",
  },
  {
    title: "Quantity",
    align: "center",
    width: "auto",
    value: "quantity",
    key: "quantity",
  },
  {
    title: "Brand",
    align: "center",
    width: "auto",
    value: "brand.name",
    key: "brand",
  },
  {
    title: "UOM",
    align: "center",
    width: "auto",
    value: "uom.name",
    key: "uom.name",
  },
  {
    title: "Remarks",
    align: "center",
    width: "auto",
    value: "remarks",
    key: "remarks",
  },
  {
    title: "Actions",
    align: "center",
    width: "auto",
    value: "actions",
    key: "actions",
  },
];

const form = ref();

const saveDialog = ref(false);

const items = ref([]);

const rules = ref({
  isValid: false,
  warehouse: [required],
  itemName: [required],
  uom: [required],
  quantity: [required],
  brand: [required],
  remarks: "",
});

const addItem = () => {
  items.value.push(form.value);
  initState();
};

const removeItem = (index) => {
  items.value.splice(index, 1);
};

const editItem = (index) => {
  const selectedItem = items.value[index];
  Object.assign(form.value, selectedItem);
};

const initState = () => {
  form.value = { ...formBase };
};

initState();
</script>

<template>
  <v-card>
    <v-card-title primary-title class="bg-primary d-flex">
      <div class="text-h5 font-weight-bold">Atk Request</div>
      <v-spacer></v-spacer>
      <v-btn
        color="error"
        rounded="lg"
        variant="flat"
        size="x-small"
        height="35"
      >
        <v-icon size="25" color="white" @click="emit('close')"
          >mdi-close</v-icon
        >
      </v-btn>
    </v-card-title>

    <v-form v-model="rules.isValid">
      <v-card-text>
        <v-row class="pa-5">
          <v-col class="d-flex align-center">
            <v-icon color="warning" size="30">mdi-alert-circle-outline</v-icon>
            <div class="text-h6 px-1">Atk Request Info</div>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12" md="6">
            <FieldTitle mandatory> Warehouse</FieldTitle>
            <v-autocomplete
              :items="masterStore.warehouses"
              v-model="form.warehouse"
              variant="outlined"
              density="compact"
              placeholder="Select Warehouse"
              :rules="rules.warehouse"
              item-title="name"
              return-object
              single-line
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="6">
            <FieldTitle mandatory> Item Name</FieldTitle>
            <v-autocomplete
              v-model="form.itemName"
              :items="masterStore.items"
              variant="outlined"
              density="compact"
              placeholder="Item Name"
              :rules="rules.itemName"
              item-title="name"
              return-object
              single-line
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="6">
            <FieldTitle mandatory> UOM</FieldTitle>
            <v-autocomplete
              v-model="form.uom"
              :items="masterStore.uom"
              variant="outlined"
              density="compact"
              placeholder="UOM"
              :rules="rules.uom"
              item-title="name"
              return-object
              single-line
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="6">
            <FieldTitle mandatory>Quantity</FieldTitle>
            <v-text-field
              v-model="form.quantity"
              variant="outlined"
              density="compact"
              placeholder="Quantity"
              :rules="rules.quantity"
              type="number"
              single-line
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <FieldTitle mandatory>Brand</FieldTitle>
            <v-autocomplete
              v-model="form.brand"
              :items="masterStore.brands"
              variant="outlined"
              density="compact"
              placeholder="Brand"
              :rules="rules.brand"
              item-title="name"
              return-object
              single-line
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="6">
            <FieldTitle>Remarks</FieldTitle>
            <v-text-field
              v-model="form.remarks"
              variant="outlined"
              density="compact"
              placeholder="Remarks"
              single-line
            ></v-text-field>
          </v-col>
        </v-row>

        <v-col cols="12" class="d-flex justify-center">
          <v-btn
            color="primary"
            class="text-capitalize"
            variant="flat"
            rounded="lg"
            height="40"
            width="130"
            :disabled="!rules.isValid"
            @click="addItem()"
            >add</v-btn
          >
        </v-col>

        <v-col cols="12">
          <v-card variant="flat" border>
            <v-data-table :items="items" :headers="headers" density="compact">
              <template #[`item.actions`]="{ index }">
                <div class="d-flex justify-space-around">
                  <v-btn
                    color="secondary"
                    variant="text"
                    icon="mdi-square-edit-outline"
                    @click="editItem(index)"
                  >
                  </v-btn>
                  <v-btn
                    color="error"
                    variant="text"
                    icon="mdi-delete"
                    @click="removeItem(index)"
                  ></v-btn>
                </div>
              </template>

              <template #[`bottom`]> </template>
            </v-data-table>
          </v-card>
        </v-col>

        <v-col cols="12" class="d-flex justify-center">
          <v-btn
            color="success"
            class="text-capitalize"
            variant="flat"
            rounded="lg"
            height="40"
            width="130"
            :disabled="!rules.isValid && items.length == 0"
            @click="saveDialog = true"
            >save
          </v-btn>
        </v-col>
      </v-card-text>
    </v-form>
  </v-card>

  <v-dialog
    v-model="saveDialog"
    scrollable
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card class="pa-3">
      <v-card-text>
        <pre>
    {{ items }}
  </pre
        >
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
:deep(th) {
  background-color: #005289 !important;
  color: white !important;
}

:deep(tr:nth-child(even) td) {
  background-color: #f2f2f2 !important;
}

:deep(.v-pagination__list li.v-pagination__prev button),
:deep(.v-pagination__list li.v-pagination__next button) {
  border: #005289 solid 2px !important;
  border-radius: 5px;
}

:deep(
    .v-pagination__list
      li.v-pagination__item.v-pagination__item--is-active
      button
  ) {
  background-color: #005289 !important;
  color: white !important;
}
</style>
