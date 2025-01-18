import RegisterForm from "@/app/auth/register/components/form"
import Link from "next/link";
export default function register() {
  return (
    <div>
      <div className="auth-form-container">
        <h1 className="auth-form-title">Register/Create Your Account</h1>
        <RegisterForm />
        <div className="mt-4 text-sm">Already have an account? <Link className=" underline" href={"/auth/login"}>Login</Link></div>
      </div>
    </div>
  )
}