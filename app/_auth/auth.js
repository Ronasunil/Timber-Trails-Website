import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

import defaultImg from "@/public/default.png";
import { auth } from "../api/auth/[...nextauth]/route";

export const getAccessToken = async function (refreshToken) {
  try {
    const res = await axios.post(
      `${process.env.BASE_URL}/api/credentials/refreshToken`,
      {
        refreshToken,
      }
    );

    Cookies.set("accessToken", res.data.accessToken);
    return res.data.accessToken;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const getUser = async function (email) {
  try {
    const res = await axios.get(`http://localhost:3000/api/users/${email}`);
    return res.data.data;
  } catch (err) {}
};

export async function isAuthenticated() {
  //   getting both tokens
  let accessToken = cookies().get("accessToken")?.value || "";
  const refreshToken = cookies().get("refreshToken")?.value || "";

  //   if acess token expired get new access token
  if (!accessToken) accessToken = await getAccessToken(refreshToken);

  //   if refresh token is invalid NOTE:(in this case acesstoken will be null )
  if (!accessToken) return;

  const decoded = jwtDecode(accessToken);

  console.log(decoded, "decoded");

  const currentUser = await getUser(decoded.email);

  return currentUser;
}

export async function currentLoggedinUser() {
  const session = await auth();
  const user = await isAuthenticated();
  let currentUser = session?.user;
  let profileImg = "";
  if (!session) {
    currentUser = user;
    profileImg = defaultImg.src;
  }

  return { currentUser, profileImg };
}
