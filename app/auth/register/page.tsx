import RegisterForm from "@/app/auth/register/components/form"
export default function register() {
  return (
    <div>
      <div className="auth-form-container">
        <h1 className="auth-form-title">Register/Create Your Account</h1>
        <RegisterForm />
      </div>
    </div>
  )
}