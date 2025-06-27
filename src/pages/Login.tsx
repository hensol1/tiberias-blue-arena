import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Lock } from "lucide-react";
import Header from "@/components/Header";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    setIsLoading(true);

    const success = await login(email, password);
    console.log("Login result:", success);

    if (success) {
      toast({
        title: "התחברות מוצלחת!",
        description: "ברוך שובך למערכת הניהול.",
      });
      navigate("/"); // Redirect to homepage
    } else {
      toast({
        title: "שגיאה בהתחברות",
        description: "האימייל או הסיסמה שהזנת אינם נכונים.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 -mt-20">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">התחברות למערכת הניהול</CardTitle>
            <CardDescription>
              יש להזין אימייל וסיסמה כדי להמשיך
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-right block" htmlFor="email">
                  אימייל
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="הכנס כתובת אימייל"
                    className="text-right pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-right block" htmlFor="password">
                  סיסמה
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="הכנס סיסמה"
                    className="text-right pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-team-primary hover:bg-team-secondary"
                disabled={isLoading}
              >
                {isLoading ? "מתחבר..." : "התחבר"}
              </Button>
            </form>

            <div className="mt-4 p-3 bg-gray-50 rounded-md text-right">
              <p className="text-sm text-gray-600 mb-2">פרטי התחברות לדוגמה:</p>
              <div className="text-xs text-gray-500 space-y-1">
                <p>מנהל: `admin@tiberias.com` / `admin123`</p>
                <p>עורך: `editor@tiberias.com` / `editor123`</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage; 