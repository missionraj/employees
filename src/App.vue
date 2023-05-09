<script setup lang="ts">
import ProfileSection from './components/ProfileSection.vue';
import SideBar from './components/SideBar.vue';
import employees from './assets/employees.json';
import { useEmployeesStore } from "./store"
const employeeStore = useEmployeesStore();
employeeStore.employees = employees
</script>

<template>
  <div class="container">
    <SideBar :employees="employeeStore.employees" />
    <ProfileSection />
  </div>
</template>

<style scoped>
 
 .container {
   display: flex;
   height: 100vh;
 }
</style>
