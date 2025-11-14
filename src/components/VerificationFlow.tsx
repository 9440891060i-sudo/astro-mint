import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { CheckCircle2, FileText, Camera, User, Upload, Clock } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface VerificationFlowProps {
  type: "kyc" | "portfolio" | "company";
  onComplete: () => void;
}

export const VerificationFlow = ({ type, onComplete }: VerificationFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const totalSteps = type === "portfolio" ? 1 : 3;

  // Portfolio verification - single step
  if (type === "portfolio") {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setSelectedFiles(Array.from(e.target.files));
      }
    };

    const handleSubmit = () => {
      toast.success("Documents submitted for verification");
      onComplete();
    };

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 space-y-8 bg-card border-border">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-2xl border-2 border-border bg-muted/30 flex items-center justify-center">
              <Upload className="h-16 w-16 text-foreground" strokeWidth={1.5} />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Portfolio Verification</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Upload your investment documents to verify your portfolio
            </p>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-foreground/50 transition-colors cursor-pointer">
              <Input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
                id="portfolio-upload"
              />
              <label htmlFor="portfolio-upload" className="cursor-pointer">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">
                  {selectedFiles.length > 0 
                    ? `${selectedFiles.length} document(s) selected` 
                    : "Choose investment documents"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, JPG, or PNG
                </p>
              </label>
            </div>

            {/* Verification Time Notice */}
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
              <Clock className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">Manual Verification</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Documents will be verified within 6 hours
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            className="w-full h-12 text-base font-medium bg-foreground text-background hover:bg-foreground/90"
          >
            Submit for Verification
          </Button>
        </Card>
      </div>
    );
  }

  // KYC and Company verification - multi-step
  const getStepContent = () => {
    if (type === "kyc") {
      switch (currentStep) {
        case 1:
          return {
            icon: FileText,
            title: "First, let's get to know you",
            description: "Please prepare one of the following documents\nPassport | ID | Resident Card",
            buttonText: "Choose document",
            note: "Most people finish this step under 3 minutes"
          };
        case 2:
          return {
            icon: Camera,
            title: "Upload your ID's back side",
            description: "The card you have sent us has basic, essential information on it's back side.\n\nPlease flip the card and take a photo.",
            buttonText: "Take Photo"
          };
        case 3:
          return {
            icon: User,
            title: "Take a selfie",
            description: "The image should be clear and have your face fully inside the frame.",
            buttonText: "Take a Selfie"
          };
        default:
          return null;
      }
    } else {
      // Company verification
      switch (currentStep) {
        case 1:
          return {
            icon: FileText,
            title: "Company Verification",
            description: "Please prepare your company incorporation documents",
            buttonText: "Choose document",
            note: "This verification helps establish credibility"
          };
        case 2:
          return {
            icon: FileText,
            title: "Additional Documents",
            description: "Upload additional company documents or funding proof",
            buttonText: "Upload Documents"
          };
        case 3:
          return {
            icon: CheckCircle2,
            title: "Review & Submit",
            description: "Please review your information and submit for verification.",
            buttonText: "Submit for Review"
          };
        default:
          return null;
      }
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success("Verification submitted successfully");
      onComplete();
    }
  };

  const stepContent = getStepContent();
  if (!stepContent) return null;

  const Icon = stepContent.icon;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-8 bg-card border-border">
        {/* Progress Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Identity doc</span>
            <span className={currentStep >= 2 ? "text-foreground" : ""}>
              {type === "kyc" ? "ID back" : "Documents"}
            </span>
            <span className={currentStep >= 3 ? "text-foreground" : ""}>
              {type === "kyc" ? "Selfie" : "Submit"}
            </span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>

        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-2xl border-2 border-primary/20 bg-muted/30 flex items-center justify-center">
            <Icon className="h-16 w-16 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">{stepContent.title}</h2>
          <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
            {stepContent.description}
          </p>
          {stepContent.note && (
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <span className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
              </span>
              {stepContent.note}
            </p>
          )}
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleNext}
          className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90"
        >
          {stepContent.buttonText}
        </Button>
      </Card>
    </div>
  );
};
