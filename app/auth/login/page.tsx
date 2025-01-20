import LoginForm from "@/app/auth/login/components/form"
import Link from "next/link";
export default function login() {
  return (
    <div>
      <div className="auth-form-container">
        <h1 className="auth-form-title">Login to your account</h1>
        <LoginForm></LoginForm>
        <div className="mt-4 text-sm">Does not have an account? <Link className=" underline" href={"/auth/register"}>Register</Link></div>
      </div>
    </div>
  )
}