import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { X } from "lucide-react";

const FOCUS_OPTIONS = ["AI", "SaaS", "Drones", "FinTech", "HealthTech", "EdTech", "E-commerce", "Blockchain", "IoT", "CleanTech"];
const STAGE_OPTIONS = ["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Series D+"];
const GEOGRAPHY_OPTIONS = ["North America", "Europe", "Asia", "South America", "Africa", "Australia", "Worldwide"];

const SetupProfileKiwi = () => {
  const navigate = useNavigate();
  const [aboutMe, setAboutMe] = useState("");
  const [investmentFocus, setInvestmentFocus] = useState<string[]>([]);
  const [stages, setStages] = useState<string[]>([]);
  const [geographies, setGeographies] = useState<string[]>([]);
  const [checkSize, setCheckSize] = useState("");

  const [showFocusOptions, setShowFocusOptions] = useState(false);
  const [showStageOptions, setShowStageOptions] = useState(false);
  const [showGeographyOptions, setShowGeographyOptions] = useState(false);

  const toggleFocus = (focus: string) => {
    setInvestmentFocus(prev =>
      prev.includes(focus) ? prev.filter(f => f !== focus) : [...prev, focus]
    );
  };

  const toggleStage = (stage: string) => {
    setStages(prev =>
      prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage]
    );
  };

  const toggleGeography = (geo: string) => {
    setGeographies(prev =>
      prev.includes(geo) ? prev.filter(g => g !== geo) : [...prev, geo]
    );
  };

  const handleComplete = () => {
    if (!aboutMe || investmentFocus.length === 0 || stages.length === 0 || !checkSize) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("setupAboutMe", aboutMe);
    localStorage.setItem("setupInvestmentFocus", JSON.stringify(investmentFocus));
    localStorage.setItem("setupStages", JSON.stringify(stages));
    localStorage.setItem("setupGeographies", JSON.stringify(geographies));
    localStorage.setItem("setupCheckSize", checkSize);
    localStorage.setItem("profileSetupComplete", "true");

    toast({
      title: "Profile Setup Complete",
      description: "Your profile has been set up successfully!",
    });

    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      <div className="max-w-md mx-auto w-full space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground">Expand Your Profile</h2>
          <p className="text-sm text-muted-foreground mt-2">Step 3 of 3</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>About Myself</Label>
            <Textarea
              placeholder="Tell us more about yourself and your investment philosophy"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Investment Focus</Label>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFocusOptions(!showFocusOptions)}
              className="w-full justify-start"
            >
              Select focus areas
            </Button>
            {showFocusOptions && (
              <div className="grid grid-cols-2 gap-2 p-3 border rounded-lg">
                {FOCUS_OPTIONS.map(focus => (
                  <button
                    key={focus}
                    onClick={() => toggleFocus(focus)}
                    className={`p-2 rounded text-sm ${
                      investmentFocus.includes(focus)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {focus}
                  </button>
                ))}
              </div>
            )}
            {investmentFocus.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {investmentFocus.map(focus => (
                  <Badge key={focus} variant="secondary" className="gap-1">
                    {focus}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => toggleFocus(focus)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Stage</Label>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowStageOptions(!showStageOptions)}
              className="w-full justify-start"
            >
              Select investment stages
            </Button>
            {showStageOptions && (
              <div className="grid grid-cols-2 gap-2 p-3 border rounded-lg">
                {STAGE_OPTIONS.map(stage => (
                  <button
                    key={stage}
                    onClick={() => toggleStage(stage)}
                    className={`p-2 rounded text-sm ${
                      stages.includes(stage)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            )}
            {stages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {stages.map(stage => (
                  <Badge key={stage} variant="secondary" className="gap-1">
                    {stage}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => toggleStage(stage)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Geography</Label>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowGeographyOptions(!showGeographyOptions)}
              className="w-full justify-start"
            >
              Select geographies
            </Button>
            {showGeographyOptions && (
              <div className="grid grid-cols-2 gap-2 p-3 border rounded-lg">
                {GEOGRAPHY_OPTIONS.map(geo => (
                  <button
                    key={geo}
                    onClick={() => toggleGeography(geo)}
                    className={`p-2 rounded text-sm ${
                      geographies.includes(geo)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {geo}
                  </button>
                ))}
              </div>
            )}
            {geographies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {geographies.map(geo => (
                  <Badge key={geo} variant="secondary" className="gap-1">
                    {geo}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => toggleGeography(geo)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            {geographies.length === 0 && (
              <p className="text-xs text-muted-foreground">If nothing selected: Worldwide</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Check Size (USD)</Label>
            <Input
              type="text"
              placeholder="e.g., $50,000 - $500,000"
              value={checkSize}
              onChange={(e) => setCheckSize(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={handleComplete} className="w-full h-12">
          Complete Setup
        </Button>
      </div>
    </div>
  );
};

export default SetupProfileKiwi;
