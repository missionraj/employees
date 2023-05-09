<script setup lang="ts">
import { computed,ref, watch } from "vue";
import { useEmployeesStore } from "../store"
import { Employee } from "../types/employee";
const employeeStore = useEmployeesStore();
const employee = computed(() => employeeStore.employeeDetail);
const editMode = ref(false);
const form = ref(setFomValue());

const deleteEmployee = () => { 
  const selectedId = employee.value.id;
  const index = employeeStore.employees.findIndex(obj => obj.id === selectedId);
  if (index !== -1) {
    employeeStore.employees.splice(index, 1);
    employeeStore.employeeDetail = {} as Employee
  } 
  
}
const editDetail = () => { 
  editMode.value = true;
}
const submitForm = () => {
      employeeStore.employeeDetail.first_name = form.value.firstname ?? "";
      employeeStore.employeeDetail.last_name = form.value.lastname ?? "";
      employeeStore.employeeDetail.username = form.value.username ?? "";
      employeeStore.employeeDetail.bio = form.value.bio ?? "" ;
      employeeStore.employeeDetail.street_address = form.value.address ?? "";
      const selectedId = employee.value.id;
      const index = employeeStore.employees.findIndex(obj => obj.id === selectedId);
      if (index !== -1) {
        employeeStore.employees[index] = employeeStore.employeeDetail;
      }
      editMode.value = false
}
const cancelUpdate = () => { 
  editMode.value = false
  form.value = setFomValue();
}    

function setFomValue ()  { 
  return {
      firstname: employeeStore.employeeDetail.first_name,
      lastname: employeeStore.employeeDetail.last_name,
      username: employeeStore.employeeDetail.username,
      bio: employeeStore.employeeDetail.bio,
      address:employeeStore.employeeDetail.street_address
  }
}
watch(employee,() => { 
  editMode.value = false;
  form.value = setFomValue();
})
</script>

<template>
  <div class="profile_section p-5 " > 
    <div v-if="Object.keys(employee).length">
      <div v-if="!editMode">

      <div class="flex">
       <img class="h-80 w-80 rounded-xl" :src="employee.profile_pic" />
       <div class="px-5">
        <p> {{ employee.first_name }} {{ employee.last_name }} </p>
        <p> {{ employee.username }}  </p>
        <p class="font-bold"> {{ employee.email }}  </p>
       </div>
      </div>
      <div class="mb-5">
        <p> address: {{ employee.street_address }} </p>
        <p> bio: {{ employee.bio }} </p>
      </div>
      <div class="flex"> 
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="editDetail">
          Edit
        </button>
        <button class="bg-red-500 hover:bg-red-700 ml-5 text-white font-bold py-2 px-4 rounded" @click="deleteEmployee()">
          Delete
        </button> 
      </div>
      </div>
      <div v-if="editMode">
        <form @submit.prevent="submitForm" class="my-form">
          <img class="h-80 w-80 rounded-xl" :src="employee.profile_pic" />
      <div class="form-group">
        <label for="firstname">First Name:</label>
        <input type="text" id="firstname" v-model="form.firstname" class="form-control" />
      </div>
      <div class="form-group">
        <label for="lastname">last Name:</label>
        <input type="text" id="lastname" v-model="form.lastname" class="form-control" />
      </div>
      <div class="form-group">
        <label for="username">User Name:</label>
        <input type="text" id="username" v-model="form.username" class="form-control" />
      </div>
      <div class="form-group">
        <label for="bio">Bio:</label>
        <input type="text" id="bio" v-model="form.bio" class="form-control" />
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <textarea type="text" id="address" v-model="form.address" class="form-control" />
      </div>
      <div >
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
        <button class="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="cancelUpdate">Cancel</button>
      </div>
    </form>
      </div>
    </div> 
  </div>
</template>

<style scoped>
 .profile_section {
    flex: 1;
 }

 .my-form .form-group {
  margin-bottom: 10px;
}

.my-form .form-group label {
  display: block;
  font-weight: bold;
}

.my-form .form-control {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.my-form .form-control:focus {
  border-color: blue;
  box-shadow: 0 0 5px blue;
}
</style>