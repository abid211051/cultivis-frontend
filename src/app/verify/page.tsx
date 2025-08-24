import { m_p_d } from "@/src/lib/globalVariabale";
import { emailVerification } from "../api/auth/userAuth";

export default async function VerifyEmailPage(props: {
  searchParams?: Promise<{
    token?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const token = searchParams?.token;
  if (!token) {
    return <div>No token in url! Please try again from your email</div>;
  }
  const res = await emailVerification(token);
  if (res?.error) {
    return <div className={`${m_p_d}`}>{res?.error}</div>;
  }
  return <div className={`${m_p_d}`}>{res?.data}</div>;
}
