import AuthForm from "@/components/auth-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
export default function Signup() {
  return (
    <div className="flex h-full w-full items-center justify-center mt-10">
        <Card className="w-full max-w-sm bg-background">
        <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Sign up</CardTitle>
        </CardHeader>
        <AuthForm type="signup" />
      </Card>
    </div>
  );
}