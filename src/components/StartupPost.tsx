import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Crown, MessageCircle, Bookmark, Share2, ShieldCheck } from "lucide-react";

interface StartupPostProps {
  company: {
    id: string;
    name: string;
    tagline: string;
    brief: string;
    logo: string;
    revenueGenerating: boolean;
    fundsRaised: string;
    currentInvestors: string[];
    lookingToDilute: boolean;
    dilutionAmount?: string;
    images: string[];
  };
}

const StartupPost = ({ company }: StartupPostProps) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [crowned, setCrowned] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(349);
  const [crowns, setCrowns] = useState(19);
  const [comments] = useState(32);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleCrown = () => {
    setCrowned(!crowned);
    setCrowns(crowned ? crowns - 1 : crowns + 1);
  };

  return (
    <Card className="overflow-hidden border-0 bg-background shadow-none">
      {/* Header - Clickable */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-card-hover transition-colors"
        onClick={() => navigate(`/company/${company.id}`, { state: { from: '/' } })}
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 border-2 border-border">
            <AvatarImage src={company.logo} alt={company.name} />
            <AvatarFallback className="bg-muted text-foreground">{company.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-base">{company.name}</h3>
              <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{company.tagline}</p>
          </div>
        </div>
      </div>

      {/* Image Carousel with Rounded Edges */}
      <div className="px-3 pb-3">
        <div className="relative bg-muted rounded-xl overflow-hidden">
          <img
            src={company.images[currentImageIndex]}
            alt={`${company.name} ${currentImageIndex + 1}`}
            className="w-full aspect-[4/3] object-cover"
          />
          
          {/* Image Indicators */}
          {company.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {company.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-5">
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 hover:bg-transparent group flex items-center gap-1.5"
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
          >
            <Heart
              className={`h-6 w-6 transition-all ${
                liked ? "fill-accent text-accent" : "text-foreground group-hover:text-accent"
              }`}
            />
            <span className="text-sm font-medium">{likes}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 hover:bg-transparent group flex items-center gap-1.5"
            onClick={(e) => {
              e.stopPropagation();
              handleCrown();
            }}
          >
            <Crown
              className={`h-6 w-6 transition-all ${
                crowned ? "fill-primary text-primary" : "text-foreground group-hover:text-primary"
              }`}
            />
            <span className="text-sm font-medium">{crowns}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 hover:bg-transparent group flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle className="h-6 w-6 text-foreground group-hover:text-accent transition-colors" />
            <span className="text-sm font-medium">{comments}</span>
          </Button>

          <div className="flex-1" />

          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 hover:bg-transparent group"
            onClick={(e) => {
              e.stopPropagation();
              setSaved(!saved);
            }}
          >
            <Bookmark
              className={`h-6 w-6 transition-all ${
                saved ? "fill-foreground" : "text-foreground group-hover:fill-muted-foreground"
              }`}
            />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 hover:bg-transparent group"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="h-6 w-6 text-foreground group-hover:text-accent transition-colors" />
          </Button>
        </div>
      </div>

      {/* What's [Company Name] Section */}
      <div className="px-4 pb-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1.5">
          WHAT'S {company.name.toUpperCase()}
        </h4>
        <p className="text-sm text-foreground/90 leading-relaxed line-clamp-2">
          {company.brief}
        </p>
      </div>

      {/* Traction Section */}
      <div className="px-4 pb-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1.5">TRACTION</h4>
        <p className="text-sm text-foreground/90">
          Mvp functional, EOI signed, 1200+ test flights
        </p>
      </div>

      {/* Three Info Boxes */}
      <div className="px-4 pb-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="px-3 py-2 rounded-lg border border-border bg-card text-center">
            <p className="text-xs font-medium text-foreground">
              {company.revenueGenerating ? 'REVENUE' : 'PRE REVENUE'}
            </p>
          </div>
          <div className="px-3 py-2 rounded-lg border border-border bg-card text-center">
            <p className="text-xs font-medium text-foreground">Age : 1yr</p>
          </div>
          <div className="px-3 py-2 rounded-lg border border-border bg-card text-center">
            <p className="text-xs font-medium text-foreground">Funding Rounds : 2</p>
          </div>
        </div>
      </div>

      {/* Funds Raised and Current Investors */}
      <div className="px-4 pb-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-muted-foreground">Funds raised</span>
            <p className="font-bold text-base mt-0.5">{company.fundsRaised}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Current investors</span>
            <p className="text-sm mt-0.5 text-foreground/90">{company.currentInvestors.join(", ")}</p>
          </div>
        </div>
      </div>

      {/* Current Round - Only show if raising */}
      {company.lookingToDilute && company.dilutionAmount && (
        <div className="px-4 pb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xs text-muted-foreground">Current round :</span>
            <span className="text-sm font-semibold text-foreground">Series A</span>
          </div>
          <div className="relative">
            <div className="h-8 rounded-full bg-card border border-border overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-muted to-muted-foreground/20 transition-all"
                style={{ width: '15%' }}
              />
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">180,000$ Filled.</span>
              <span className="text-sm font-bold text-foreground">{company.dilutionAmount}</span>
            </div>
          </div>
        </div>
      )}

      {/* Not Raising - Simple text */}
      {!company.lookingToDilute && (
        <div className="px-4 pb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-muted-foreground">Current round :</span>
            <span className="text-sm font-medium text-foreground">Not raising</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default StartupPost;
