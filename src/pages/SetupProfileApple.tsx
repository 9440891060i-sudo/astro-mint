import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Camera, ArrowLeft, Check } from "lucide-react";

const SetupProfileApple = () => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [username, setUsername] = useState(localStorage.getItem("signupUsername") || "");
  const [fullName, setFullName] = useState("");
  const [accountType, setAccountType] = useState<"investor" | "startup" | "personal" | null>(null);
  const [email, setEmail] = useState(localStorage.getItem("signupEmail") || "");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [acceptDisclaimer, setAcceptDisclaimer] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmEmail = () => {
    setShowCodeInput(true);
    toast({
      title: "Code Sent",
      description: "Please check your email for the verification code",
    });
  };

  const handleVerifyCode = () => {
    if (!code) {
      toast({
        title: "Missing Code",
        description: "Please enter the verification code",
        variant: "destructive",
      });
      return;
    }
    setEmailVerified(true);
    toast({
      title: "Email Verified",
      description: "Your email has been verified successfully",
    });
  };

  const handleNext = () => {
    if (!fullName) {
      toast({
        title: "Missing Information",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return;
    }

    if (!accountType) {
      toast({
        title: "Select Account Type",
        description: "Please select an account type",
        variant: "destructive",
      });
      return;
    }

    if (!emailVerified) {
      toast({
        title: "Verify Email",
        description: "Please verify your email before continuing",
        variant: "destructive",
      });
      return;
    }

    if (!acceptDisclaimer) {
      toast({
        title: "Accept Disclaimer",
        description: "Please accept the disclaimer to continue",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("setupProfilePhoto", profilePhoto || "");
    localStorage.setItem("setupFullName", fullName);
    localStorage.setItem("setupAccountType", accountType);

    if (accountType === "investor") {
      navigate("/setup-profile-banana");
    } else {
      navigate("/profile");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      <div className="max-w-md mx-auto w-full space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center flex-1">
            <h2 className="text-2xl font-semibold text-foreground">Setup Profile</h2>
            <p className="text-sm text-muted-foreground mt-2">Step 1 of 3</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleNext}>
            Save
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <Label className="text-sm text-muted-foreground mb-3">Profile Photo</Label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="profile-photo"
              />
              <label
                htmlFor="profile-photo"
                className="w-32 h-32 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors overflow-hidden"
              >
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-8 h-8 text-muted-foreground" />
                )}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              type="text"
              value={username}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Account Type</Label>
            {!accountType ? (
              <div className="space-y-2">
                <button
                  onClick={() => setAccountType("investor")}
                  className="w-full p-3 rounded-lg border border-border hover:border-primary/50 transition-all text-sm"
                >
                  <p className="font-medium">Investor</p>
                </button>
                <button
                  onClick={() => setAccountType("startup")}
                  className="w-full p-3 rounded-lg border border-border hover:border-primary/50 transition-all text-sm"
                >
                  <p className="font-medium">Startup</p>
                </button>
                <button
                  onClick={() => setAccountType("personal")}
                  className="w-full p-3 rounded-lg border border-border hover:border-primary/50 transition-all text-sm"
                >
                  <p className="font-medium">Personal Account</p>
                </button>
              </div>
            ) : (
              <div className="p-3 rounded-lg border-2 border-primary bg-primary/10">
                <p className="font-medium text-sm capitalize">{accountType === "personal" ? "Personal Account" : accountType}</p>
              </div>
            )}
          </div>

          {accountType && (
            <div className="space-y-4 animate-in slide-in-from-top">
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    disabled
                    className={emailVerified ? "pr-10 bg-muted" : "bg-muted"}
                  />
                  {emailVerified && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {!emailVerified && !showCodeInput && (
                  <Button
                    onClick={handleConfirmEmail}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    Confirm Email
                  </Button>
                )}
              </div>

              {showCodeInput && !emailVerified && (
                <div className="space-y-2 animate-in slide-in-from-top">
                  <Label>Verification Code</Label>
                  <Input
                    type="text"
                    placeholder="Enter code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                  />
                  <Button
                    onClick={handleVerifyCode}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    Verify Code
                  </Button>
                </div>
              )}
            </div>
          )}

          {accountType && emailVerified && (
            <div className="p-4 bg-muted/50 rounded-lg space-y-3 animate-in slide-in-from-top">
              <p className="text-sm text-muted-foreground">
                <strong>Important:</strong> You won't be able to change your account type after this step.
              </p>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="disclaimer"
                  checked={acceptDisclaimer}
                  onCheckedChange={(checked) => setAcceptDisclaimer(checked as boolean)}
                />
                <label
                  htmlFor="disclaimer"
                  className="text-sm text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have read and accept this disclaimer
                </label>
              </div>
            </div>
          )}
        </div>

        {accountType && emailVerified && acceptDisclaimer && (
          <Button onClick={handleNext} className="w-full h-12">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default SetupProfileApple;
