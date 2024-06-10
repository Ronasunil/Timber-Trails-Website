import axios from "axios";
import Cookies from "js-cookie";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const login = async function (email, password) {
  try {
    const response = await axios.post("/api/credentials/login", {
      email,
      password,
    });
  } catch (err) {
    console.log(err);
  }
};

export async function logout() {
  await axios.get("/api/credentials/logout");
}
