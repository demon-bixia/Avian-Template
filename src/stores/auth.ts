import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";
import { USER } from "./fakeData";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  token: string;
  lastSeen: Date;
}

const useAuthStore = defineStore("auth", () => {
  // local storage
  const storage = JSON.parse(localStorage.getItem("auth") || "{}");

  // data refs
  const user: Ref<User | undefined> = ref(USER);

  return {
    user,
  };
});

export default useAuthStore;
