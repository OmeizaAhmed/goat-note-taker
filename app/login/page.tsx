import AuthForm from "@/components/auth-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
export default function Login() {
  return (
    <div className="flex h-full w-full items-center justify-center mt-5 md:10">
        <Card className="w-full max-w-sm bg-background">
        <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <AuthForm type="login" />
      </Card>
    </div>
  );
}