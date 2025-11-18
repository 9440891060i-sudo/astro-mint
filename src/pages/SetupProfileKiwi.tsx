import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { X, ArrowLeft, MapPin } from "lucide-react";

const FOCUS_OPTIONS = ["AI", "SaaS", "Drones", "FinTech", "HealthTech", "EdTech", "E-commerce", "Blockchain", "IoT", "CleanTech"];
const STAGE_OPTIONS = ["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Series D+"];
const GEOGRAPHY_OPTIONS = ["North America", "Europe", "Asia", "South America", "Africa", "Australia", "Worldwide"];
const LOCATION_SUGGESTIONS = ["New York, USA", "San Francisco, USA", "London, UK", "Berlin, Germany", "Singapore", "Tokyo, Japan", "Toronto, Canada", "Sydney, Australia"];

const SetupProfileKiwi = () => {
  const navigate = useNavigate();
  const [aboutMe, setAboutMe] = useState("");
  const [location, setLocation] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [investmentFocus, setInvestmentFocus] = useState<string[]>([]);
  const [stages, setStages] = useState<string[]>([]);
  const [geographies, setGeographies] = useState<string[]>([]);
  const [checkSize, setCheckSize] = useState("");

  const [showFocusOptions, setShowFocusOptions] = useState(false);
  const [showStageOptions, setShowStageOptions] = useState(false);
  const [showGeographyOptions, setShowGeographyOptions] = useState(false);

  const filteredLocations = locationSearch
    ? LOCATION_SUGGESTIONS.filter(loc => 
        loc.toLowerCase().includes(locationSearch.toLowerCase())
      )
    : LOCATION_SUGGESTIONS;

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setLocationSearch("");
    setShowLocationSuggestions(false);
  };

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
    localStorage.setItem("setupLocation", location);
    localStorage.setItem("setupInvestmentFocus", JSON.stringify(investmentFocus));
    localStorage.setItem("setupStages", JSON.stringify(stages));
    localStorage.setItem("setupGeographies", JSON.stringify(geographies));
    localStorage.setItem("setupCheckSize", checkSize);

    toast({
      title: "Investment Preferences Saved",
      description: "Proceeding to KYC verification",
    });

    navigate("/kyc-verification");
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
            <h2 className="text-2xl font-semibold text-foreground">Expand Your Profile</h2>
            <p className="text-sm text-muted-foreground mt-2">Step 3 of 3</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleComplete}>
            Save
          </Button>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-sm">About Myself</Label>
            <Textarea
              placeholder="Tell us more about yourself and your investment philosophy"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              className="min-h-[100px] resize-none text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Location</Label>
            <div className="relative">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search location"
                  value={location || locationSearch}
                  onChange={(e) => {
                    setLocationSearch(e.target.value);
                    setShowLocationSuggestions(true);
                  }}
                  onFocus={() => setShowLocationSuggestions(true)}
                  className="pl-10 text-sm"
                />
              </div>
              {showLocationSuggestions && filteredLocations.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {filteredLocations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleLocationSelect(loc)}
                      className="w-full px-3 py-2 text-sm text-left hover:bg-accent transition-colors"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Investment Focus</Label>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFocusOptions(!showFocusOptions)}
              className="w-full justify-start text-sm h-9"
            >
              {investmentFocus.length > 0 ? `${investmentFocus.length} selected` : "Select focus areas"}
            </Button>
            {showFocusOptions && (
              <div className="grid grid-cols-2 gap-1.5 p-2 border rounded-md bg-muted/20">
                {FOCUS_OPTIONS.map(focus => (
                  <button
                    key={focus}
                    onClick={() => toggleFocus(focus)}
                    className={`p-2 rounded-sm text-xs font-medium transition-colors ${
                      investmentFocus.includes(focus)
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-accent"
                    }`}
                  >
                    {focus}
                  </button>
                ))}
              </div>
            )}
            {investmentFocus.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {investmentFocus.map(focus => (
                  <Badge key={focus} variant="secondary" className="gap-1 text-xs h-6 px-2">
                    {focus}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
                      onClick={() => toggleFocus(focus)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Stage</Label>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowStageOptions(!showStageOptions)}
              className="w-full justify-start text-sm h-9"
            >
              {stages.length > 0 ? `${stages.length} selected` : "Select investment stages"}
            </Button>
            {showStageOptions && (
              <div className="grid grid-cols-2 gap-1.5 p-2 border rounded-md bg-muted/20">
                {STAGE_OPTIONS.map(stage => (
                  <button
                    key={stage}
                    onClick={() => toggleStage(stage)}
                    className={`p-2 rounded-sm text-xs font-medium transition-colors ${
                      stages.includes(stage)
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-accent"
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            )}
            {stages.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {stages.map(stage => (
                  <Badge key={stage} variant="secondary" className="gap-1 text-xs h-6 px-2">
                    {stage}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
                      onClick={() => toggleStage(stage)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Geography</Label>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowGeographyOptions(!showGeographyOptions)}
              className="w-full justify-start text-sm h-9"
            >
              {geographies.length > 0 ? `${geographies.length} selected` : "Select geographies"}
            </Button>
            {showGeographyOptions && (
              <div className="grid grid-cols-2 gap-1.5 p-2 border rounded-md bg-muted/20">
                {GEOGRAPHY_OPTIONS.map(geo => (
                  <button
                    key={geo}
                    onClick={() => toggleGeography(geo)}
                    className={`p-2 rounded-sm text-xs font-medium transition-colors ${
                      geographies.includes(geo)
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-accent"
                    }`}
                  >
                    {geo}
                  </button>
                ))}
              </div>
            )}
            {geographies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {geographies.map(geo => (
                  <Badge key={geo} variant="secondary" className="gap-1 text-xs h-6 px-2">
                    {geo}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
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
            <Label className="text-sm">Check Size (USD)</Label>
            <Input
              type="text"
              placeholder="e.g., $50,000 - $500,000"
              value={checkSize}
              onChange={(e) => setCheckSize(e.target.value)}
              className="text-sm"
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
