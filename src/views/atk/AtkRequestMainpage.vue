<script setup>
import { ref } from "vue";

import PageTitle from "@/components/PageTitle.vue";
import AtkTable from "./components/DataTable";
import FormDialog from "./components/FormDialog";

const formDialog = ref(false);
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

  <AtkTable />

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
