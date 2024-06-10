import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createGuest } from "@/app/_services/data-service";

const getInsideDOubleQuotes = function (str) {
  const matchedWord = str.match(/"([^"]+)"/)[1];

  if (!matchedWord) return;

  return matchedWord.split("_")[1];
};

export async function POST(req) {
  const { name, email, password } = await req.json();

  try {
    const hashedPassword = await hash(password, 12);

    const res = await createGuest({ name, email, password: hashedPassword });
    console.log(res);
  } catch (err) {
    console.log(err);
    // all error related to signup will be handled here
    const field = getInsideDOubleQuotes(err.message);

    // duplicates emails handled
    if (field)
      return NextResponse.json(
        { status: "failed", message: `${field} already exists` },
        { status: 401 }
      );
  }

  const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "30min",
  });
  const refreshToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return NextResponse.json({ status: "Success", accessToken, refreshToken });
}
