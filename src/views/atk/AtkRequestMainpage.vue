<script setup>
import { ref } from "vue";
import { useMasterDataStore } from "@/store/master";
import { VDatePicker } from "vuetify/labs/VDatePicker";
import { toFilterDate } from "@/helpers/filters";

const store = useMasterDataStore();

import PageTitle from "@/components/PageTitle.vue";
import AtkTable from "./components/DataTable";
import FormDialog from "./components/FormDialog";
import { computed } from "vue";

const formDialog = ref(false);

const filter = ref({
  keyword: null,
  rangeOfDate: [],
  status: null,
  company: null,
});

const datePickerDialog = ref(false);

const dateRangeText = computed(() => {
  return filter.value.rangeOfDate
    .map((date) => toFilterDate(date, "DD/MM/YYYY"))
    .join(" ~ ");
});

const resetFilter = () => {
  filter.value.company = null;
  filter.value.rangeOfDate = [];
  filter.value.status = null;
};
</script>

<template>
  <v-row>
    <v-col md="6" cols="12" class="d-flex align-center justify-space-between">
      <page-title> </page-title>
    </v-col>

    <v-spacer></v-spacer>

    <v-col cols="auto" class="d-flex justify-space-around" style="width: 300px">
      <v-btn
        color="success"
        variant="outlined"
        height="30"
        width="30"
        size="50"
        rounded="lg"
      >
        <v-icon size="40" color="black">mdi-cog-outline</v-icon>
      </v-btn>

      <v-btn
        color="success"
        height="50"
        variant="flat"
        rounded="lg"
        class="text-capitalize"
        prepend-icon="mdi-plus"
        @click="formDialog = true"
      >
        Add Item
      </v-btn>

      <v-btn
        color="success"
        variant="outlined"
        height="30"
        width="30"
        size="50"
        rounded="lg"
      >
        <v-icon size="40" color="success">mdi-inbox</v-icon>
      </v-btn>
    </v-col>
  </v-row>

  <v-row align="end">
    <v-col cols="6" md="2">
      <div>
        <div>Company</div>
        <v-autocomplete
          v-model="filter.company"
          :items="store.brands"
          placeholder="Select Company"
          variant="outlined"
          rounded="lg"
          density="compact"
          item-title="name"
          round
          single-line
          hide-details
        ></v-autocomplete>
      </div>
    </v-col>

    <v-col cols="6" md="2">
      <div>
        <div>Status</div>
        <v-autocomplete
          v-model="filter.status"
          :items="store.atkRequestStatus"
          variant="outlined"
          rounded="lg"
          density="compact"
          placeholder="Select Status"
          clearable
          round
          single-line
          hide-details
        ></v-autocomplete>
      </div>
    </v-col>

    <v-col cols="auto">
      <div>
        <div>Choose Date</div>
        <v-menu
          v-model="datePickerDialog"
          offset-y
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ props }">
            <v-text-field
              :value="dateRangeText"
              variant="outlined"
              rounded="lg"
              density="compact"
              placeholder="Select Date"
              prepend-inner-icon="mdi-calendar-blank-outline"
              v-bind="props"
              style="width: 300px"
              clearable
              readonly
              round
              single-line
              hide-details
              @click:clear="filter.date = null"
            >
              <!-- :value="toFilterDate(filter.rangeOfDate, `DD MM yyyy`)" -->

              <!-- <template #default="{ item }">
                {{ toFilterDate(item.value, "DD/MM/yyyy") }}
              </template> -->
            </v-text-field>
          </template>

          <v-card width="100%">
            <v-date-picker
              v-model="filter.rangeOfDate"
              color="primary"
              @click:save="datePickerDialog = false"
              @click:cancel="datePickerDialog = false"
              format="DD-MM-YYYY"
              multiple
            ></v-date-picker>
          </v-card>
        </v-menu>
      </div>
    </v-col>

    <v-col cols="auto" class="align-end">
      <v-btn
        width="120"
        height="44"
        rounded="lg"
        color="success"
        class="text-capitalize mr-5"
        prepend-icon="mdi-filter"
        variant="flat"
      >
        filter
      </v-btn>
      <v-btn
        width="120"
        height="44"
        rounded="lg"
        color="error"
        class="text-capitalize"
        prepend-icon="mdi-cached"
        variant="flat"
        @click="resetFilter()"
        >reset</v-btn
      >
    </v-col>

    <v-spacer></v-spacer>

    <v-col cols="12" md="auto">
      <v-text-field
        v-model="filter.keyword"
        variant="outlined"
        density="compact"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search..."
        rounded="lg"
        style="width: 250px"
        single-line
        hide-details
      ></v-text-field>
    </v-col>
  </v-row>

  <AtkTable :search="filter.keyword" :filter="filter" ref="dataTable" />

  <v-dialog
    v-model="formDialog"
    max-width="90vw"
    transition="dialog-transition"
    scrollable
    persistent
  >
    <FormDialog @close="formDialog = false" />
  </v-dialog>
</template>
