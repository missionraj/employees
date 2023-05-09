<script setup lang="ts">
import { computed } from "vue";
import { Employee } from "../types/employee";
import DisplayCard from "./DisplayCard.vue";

const props = withDefaults(
    defineProps<{
    employees: Array<Employee>;   
    }>(),
    {
        employees: () => [],
    }
  );


function convertToNestedObjects(employees: Employee[]): Record<string, any> {
  const nestedObjects: Record<string, any> = {};

  // Create a lookup object for quick access to employees by ID
  const employeeLookup: Record<number, Employee> = {};
  employees.forEach((employee) => {
    employeeLookup[employee.id] = employee;
  });

  // Build the nested objects
  employees.forEach((employee) => {
    const { id, manager_id } = employee;
    const manager = employeeLookup[manager_id];

    if (!nestedObjects[id]) {
      nestedObjects[id] = { ...employee, employees: [] };
    } else {
      nestedObjects[id] = { ...nestedObjects[id], ...employee };
    }

    if (manager) {
      if (!nestedObjects[manager_id]) {
        nestedObjects[manager_id] = { ...manager, employees: [nestedObjects[id]] };
      } else {
        nestedObjects[manager_id].employees.push(nestedObjects[id]);
      }
    }
  });

  // Find the top-level objects (employees without a manager)
  const topLevelObjects: any[] = [];
  employees.forEach((employee) => {
    if (!employeeLookup[employee.manager_id]) {
      topLevelObjects.push(nestedObjects[employee.id]);
    }
  });

  return topLevelObjects;
}
// Example usage:
const nestedObjects = computed(() => convertToNestedObjects(props.employees));

</script>

<template>
  <div class="sidebar ">
    <display-card v-for="nested in nestedObjects" :key="nested.id" :employee="nested"  />
  </div>
</template>

<style scoped>
  .sidebar {
    width: 25%;
    max-height: 100vh;
    overflow-y: auto;

  }
</style>