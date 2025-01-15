import { useState, useEffect } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MinimalHeader } from "@/components/MinimalHeader";
import type { AuthError } from "@supabase/supabase-js";

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const userType = searchParams.get("type") || "customer";
  const mode = searchParams.get("mode") || "sign-in";

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        const { data: { user } } = await supabase.auth.getUser();
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user?.id)
          .single();

        if (profile?.user_type === 'restaurant_owner') {
          navigate("/dashboard/restaurant");
        } else {
          navigate("/dashboard/customer");
        }
      }
      if (event === "SIGNED_OUT") {
        setErrorMessage("");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const getErrorMessage = (error: AuthError) => {
    switch (error.message) {
      case "Invalid login credentials":
        return "Invalid email or password. Please check your credentials and try again.";
      case "Email not confirmed":
        return "Please verify your email address before signing in.";
      case "User not found":
        return "No user found with these credentials.";
      case "User already registered":
        return "This email is already registered. Please sign in instead.";
      default:
        return error.message;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MinimalHeader />
      <div className="pt-24 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {mode === "sign-in" ? "Welcome Back" : "Create Account"}
              <span className="block text-sm font-normal text-muted-foreground mt-1">
                {userType === "restaurant_owner" ? "Restaurant Owner" : "Customer"}
              </span>
            </h2>
            
            <SupabaseAuth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#ff3131',
                      brandAccent: '#ff3131',
                    },
                  },
                },
                className: {
                  button: 'bg-primary hover:bg-primary/90',
                },
              }}
              providers={[]}
              redirectTo={window.location.origin}
              view={mode === "sign-in" ? "sign_in" : "sign_up"}
              additionalData={{
                user_type: userType,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;