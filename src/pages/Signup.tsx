import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Store basic info and navigate to role selection
    localStorage.setItem("signupEmail", email);
    localStorage.setItem("signupName", fullName);
    localStorage.setItem("signupUsername", username);
    navigate("/role-selection");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[350px] space-y-8">
        {/* Logo */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-['Pacifico'] text-foreground">
            Atmosphere
          </h1>
        </div>

        {/* Signup Form */}
        <div className="bg-card border border-border rounded-sm p-10">
          <p className="text-center text-muted-foreground text-base font-semibold mb-6">
            Sign up to see photos and videos from your friends.
          </p>

          <Button
            type="button"
            variant="default"
            className="w-full h-8 text-sm font-semibold mb-4"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
            </svg>
            Log in with Facebook
          </Button>

          <div className="flex items-center gap-4 my-5">
            <Separator className="flex-1" />
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              Or
            </span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleSignup} className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 text-xs bg-background border-border/50"
              required
            />
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-9 text-xs bg-background border-border/50"
              required
            />
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-9 text-xs bg-background border-border/50"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-9 text-xs bg-background border-border/50"
              required
            />

            <p className="text-xs text-center text-muted-foreground pt-2 pb-2">
              People who use our service may have uploaded your contact information to Atmosphere.{" "}
              <button type="button" className="text-foreground font-semibold">
                Learn More
              </button>
            </p>

            <p className="text-xs text-center text-muted-foreground pb-2">
              By signing up, you agree to our{" "}
              <button type="button" className="text-foreground font-semibold">
                Terms
              </button>
              ,{" "}
              <button type="button" className="text-foreground font-semibold">
                Privacy Policy
              </button>{" "}
              and{" "}
              <button type="button" className="text-foreground font-semibold">
                Cookies Policy
              </button>
              .
            </p>

            <Button
              type="submit"
              className="w-full h-8 text-sm font-semibold"
            >
              Sign up
            </Button>
          </form>
        </div>

        {/* Log In */}
        <div className="bg-card border border-border rounded-sm p-6 text-center">
          <p className="text-sm text-foreground">
            Have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary font-semibold"
            >
              Log in
            </button>
          </p>
        </div>

        {/* Get the app */}
        <div className="text-center space-y-4">
          <p className="text-sm text-foreground">Get the app.</p>
          <div className="flex gap-2 justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/320px-Download_on_the_App_Store_Badge.svg.png"
              alt="Download on App Store"
              className="h-10 cursor-pointer"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/320px-Google_Play_Store_badge_EN.svg.png"
              alt="Get it on Google Play"
              className="h-10 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
