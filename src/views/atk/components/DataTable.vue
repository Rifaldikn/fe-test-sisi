<script setup>
import { ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";

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
