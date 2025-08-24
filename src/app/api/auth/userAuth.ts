"use server";

export async function userRegistration(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/register`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw Error(data?.error, { cause: "custom" });
    }
    return { data: data?.message };
  } catch (error: any) {
    if (error.cause === "custom") {
      return { error: error.message };
    }

    return { error: "Something went wrong" };
  }
}

export async function emailVerification(token: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/verify?token=${token}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw Error(data?.error, { cause: "custom" });
    }
    return { data: data?.message };
  } catch (error: any) {
    if (error.cause === "custom") {
      return { error: error.message };
    }

    return { error: "Something went wrong" };
  }
}
