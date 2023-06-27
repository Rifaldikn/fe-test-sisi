<script setup>
import { onMounted, computed } from "vue";
import { ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { useMasterDataStore } from "@/store/master";
import _ from "lodash";
import moment from "moment";

import { watch } from "vue";

const store = useMasterDataStore();

// defineExpose({
//   "filterTable",
// });

const props = defineProps({
  search: {
    type: String,
    default: "",
  },
  filter: {
    type: Object,
    default: () => {},
  },
});

const paging = ref({
  limit: 10,
  offset: 0,
  page: 1,
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
  // {
  //   documentNumber: "REQ/ATK/DUMMY/01",
  //   date: "05-06-2023",
  //   createdBy: "John Doe",
  //   itemCount: 2,
  //   status: "Waiting Approval",
  // },
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

const generateData = () => {
  for (let index = 0; index < 20; index++) {
    const randomDate = Math.floor(Math.random() * 30);
    const newDate = String(randomDate).padStart(2, "0");

    const randomItemCount = Math.floor(Math.random() * 101);
    const randomStatus = Math.floor(Math.random() * 4);

    const randomUser = Math.floor(Math.random() * 2);
    const user = ["John Doe", "Jane Doe"];

    items.value.push({
      documentNumber: `REQ/ATK/DUMMY/${index}`,
      date: `${newDate}-06-2023`,
      createdBy: user[randomUser],
      itemCount: randomItemCount,
      status: store.atkRequestStatus[randomStatus],
    });
  }
};

const filteredItems = ref([]);

const filterItem = _.debounce(() => {
  const startDate =
    moment(props.filter?.rangeOfDate?.[0]).format("DD-MM-YYYY") || "";
  const endDate =
    moment(props.filter?.rangeOfDate?.[1]).format("DD-MM-YYYY") || "";

  console.log(startDate, endDate, props.filter?.rangeOfDate);

  filteredItems.value = [...items.value]
    .filter(
      ({ status }) => status == props.filter.status || !props.filter.status
    )
    .filter(
      ({ date }) =>
        props.filter.rangeOfDate.length == 0 ||
        (date >= startDate && date <= endDate)
    );
}, 500);

const paginatedItems = computed(() => {
  return filteredItems.value.slice(
    paging.value.offset,
    paging.value.limit * paging.value.page
  );
});

watch(
  paging,
  () => {
    filterItem();
  },
  {
    deep: true,
  }
);

watch(
  props.filter,
  () => {
    filterItem();
  },
  {
    deep: true,
  }
);

onMounted(() => {
  generateData();
  filterItem();
});
</script>

<template>
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

    <v-col cols="12">
      <v-card rounded="lg" variant="flat" border>
        <v-data-table
          :headers="headers"
          :items="paginatedItems"
          :search="search"
          :loading="paging.loading"
          item-value="documentNumber"
          density="compact"
          color="primary"
          show-select
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
          :length="Math.ceil(filteredItems.length / paging.limit)"
          active-color="primary"
          density="compact"
          @update:model-value="paging.offset = (paging.page - 1) * paging.limit"
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
