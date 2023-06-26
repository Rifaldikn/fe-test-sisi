<script setup>
import { ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import PageTitle from "@/components/PageTitle.vue";

const paging = ref({
  limit: 10,
  offset: 0,
  page: 1,
  keyword: "",
  loading: false,
  totalItems: 100,
});

const items = ref([
  {
    documentNumber: "2023-06-ATKR/002/ATK-0623",
    date: "14-06-2023",
    createdBy: "John Doe",
    itemCount: 0,
    status: "Draft",
  },
  {
    documentNumber: "REQ/ATK/DUMMY/01",
    date: "05-06-2023",
    createdBy: "John Doe",
    itemCount: 2,
    status: "Waiting Approval",
  },
]);
const headers = ref([
  {
    title: "No",
    align: "center",
    width: "auto",
    key: "no",
    value: "no",
    sortable: false,
  },
  {
    title: "Document No",
    align: "center",
    width: "auto",
    value: "documentNumber",
    key: "documentNumber",
  },

  {
    title: "Date",
    align: "center",
    width: "auto",
    key: "date",
    value: "date",
  },
  {
    title: "Created By",
    align: "center",
    width: "auto",
    value: "createdBy",
    key: "createdBy",
  },
  {
    title: "Item Count",
    align: "center",
    width: "auto",
    value: "itemCount",
    key: "itemCount",
  },
  {
    title: "Status",
    align: "center",
    width: "auto",
    value: "status",
    key: "status",
  },
  {
    title: "Actions",
    align: "center",
    width: "125",
    key: "actions",
  },
]);
</script>

<template>
  <v-row>
    <v-col cols="6" class="d-flex align-center justify-space-between">
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
    <v-col cols="2">
      <div>
        <div>Company</div>
        <v-autocomplete
          variant="outlined"
          rounded="lg"
          density="compact"
          round
          single-line
          hide-details
        ></v-autocomplete>
      </div>
    </v-col>

    <v-col cols="2">
      <div>
        <div>Status</div>
        <v-autocomplete
          variant="outlined"
          rounded="lg"
          density="compact"
          round
          single-line
          hide-details
        ></v-autocomplete>
      </div>
    </v-col>

    <v-col cols="2">
      <div>
        <div>Choose Date</div>
        <v-autocomplete
          variant="outlined"
          rounded="lg"
          density="compact"
          prepend-inner-icon="mdi-calendar-blank-outline"
          round
          single-line
          hide-details
        ></v-autocomplete>
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
        >reset</v-btn
      >
    </v-col>

    <v-spacer></v-spacer>

    <v-col cols="auto">
      <v-text-field
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

  <v-row>
    <v-col cols="12" class="d-flex align-center">
      <div class="mr-3">Showing</div>

      <v-select
        style="max-width: 90px"
        variant="outlined"
        density="compact"
        :items="[5, 10, 15, 25]"
        v-model="paging.limit"
        single-line
        hide-details
      ></v-select>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <v-card rounded="lg" variant="flat" border>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="paging.keyword"
          :loading="paging.loading"
          density="compact"
          hide-actions
          select-all
        >
          <template #[`item.no`]="{ index }">
            <div class="text-center">
              {{ paging.offset + index + 1 }}
            </div>
          </template>

          <template #[`item.actions`]>
            <div class="d-flex justify-space-between">
              <v-btn
                color="secondary"
                variant="text"
                icon="mdi-square-edit-outline"
              >
              </v-btn>
              <v-btn color="error" variant="text" icon="mdi-delete"></v-btn>
            </div>
          </template>

          <template #bottom></template>
        </v-data-table>
      </v-card>

      <v-col cols="12" class="d-flex space-between align-center">
        <div class="text-grey">
          Showing {{ paging.offset + 1 }} to
          {{ paging.offset + paging.limit }} of {{ items.length }} entries
        </div>
        <v-spacer></v-spacer>
        <v-pagination
          v-model="paging.page"
          :total-visible="7"
          :length="paging.totalItems"
          active-color="primary"
          density="compact"
        ></v-pagination>
      </v-col>
    </v-col>
  </v-row>
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
