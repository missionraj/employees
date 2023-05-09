import { defineStore } from "pinia";
import { Employee } from "../types/employee";
export const useEmployeesStore = defineStore("employees", {
  state: () => ({
    employees: [] as Employee[],
    employeeDetail: {} as Employee,
  }),
  actions: {
    setEmployees(list: Employee[]) {
      this.employees = list;
    },
    setEmployeeDetails(id: number) {
      const selectedData = this.employees.filter((el) => el.id === id)[0];
      this.employeeDetail = selectedData;
    },
  },
});
