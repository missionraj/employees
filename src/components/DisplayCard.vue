<script setup lang="ts">
import { ref } from "vue";
import { EmployeeStruct } from "../types/employee";

import { useEmployeesStore } from "../store"
const employeeStore = useEmployeesStore();

const props = (
    defineProps<{
    employee: EmployeeStruct;   
    }>()
  );
const showChilds = ref(false);
const toggleChilds = (id:number) => {
  showChilds.value = !showChilds.value;
  employeeStore.setEmployeeDetails(id);
}  
</script>

<template>
  <div class="p-2">
    <div class="flex items-center" @click="toggleChilds(props.employee.id)"> 
    <i class="arrow" :class="{  'down': showChilds, 'right': !showChilds}"></i>
    <img :src="props.employee.profile_pic" alt="" class="h-20 w-20 rounded-xl px-1"> 
    <div class="px-2">
      <p> {{ props.employee.first_name }} {{ props.employee.last_name }} </p>
      <p class="font-bold"> {{ props.employee.email }}  </p>
      <p> employees : {{ props.employee.employees.length  }} </p>
    </div>  
    
  </div>
  <div class="ml-5" v-if="showChilds">
    <display-card v-for="nested in props.employee.employees" :key="nested.id" :employee="nested"  />
  </div>
  </div>
</template>

<style scoped>
.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>