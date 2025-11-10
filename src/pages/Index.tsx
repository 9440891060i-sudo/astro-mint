import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import StartupPost from "@/components/StartupPost";
import Stories from "@/components/Stories";

const mockStartups = [
  {
    id: "airbound-co",
    name: "Airbound.co",
    tagline: "Revolutionary aerospace delivery platform",
    logo: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=100&h=100&fit=crop",
    revenueGenerating: true,
    fundsRaised: "$2M",
    currentInvestors: ["Y Combinator", "Sequoia", "a16z"],
    lookingToDilute: true,
    dilutionAmount: "15% for $3M",
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508614999368-9260051292e5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "skyt-air",
    name: "Skyt Air",
    tagline: "Next-gen aviation technology solutions",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop",
    revenueGenerating: true,
    fundsRaised: "$4M",
    currentInvestors: ["Techstars", "500 Startups"],
    lookingToDilute: true,
    dilutionAmount: "20% for $5M",
    images: [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "neuralhealth",
    name: "NeuralHealth",
    tagline: "AI-powered healthcare diagnostics",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop",
    revenueGenerating: false,
    fundsRaised: "$8M",
    currentInvestors: ["Founders Fund", "Khosla Ventures"],
    lookingToDilute: true,
    dilutionAmount: "12% for $6M",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "greencharge",
    name: "GreenCharge",
    tagline: "Sustainable EV charging infrastructure",
    logo: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=100&h=100&fit=crop",
    revenueGenerating: true,
    fundsRaised: "$5M",
    currentInvestors: ["Tesla Ventures", "Climate Fund"],
    lookingToDilute: false,
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617704548623-340376564e68?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "foodflow",
    name: "FoodFlow",
    tagline: "Farm-to-table supply chain optimization",
    logo: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop",
    revenueGenerating: true,
    fundsRaised: "$3.5M",
    currentInvestors: ["Greylock Partners", "First Round"],
    lookingToDilute: true,
    dilutionAmount: "18% for $4M",
    images: [
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "codementor-ai",
    name: "CodeMentor AI",
    tagline: "AI-powered coding education platform",
    logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop",
    revenueGenerating: false,
    fundsRaised: "$6M",
    currentInvestors: ["Accel", "Index Ventures"],
    lookingToDilute: true,
    dilutionAmount: "10% for $5M",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "urbanfarm",
    name: "UrbanFarm",
    tagline: "Vertical farming for urban environments",
    logo: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=100&h=100&fit=crop",
    revenueGenerating: true,
    fundsRaised: "$4.5M",
    currentInvestors: ["Y Combinator", "Climate Capital"],
    lookingToDilute: true,
    dilutionAmount: "15% for $4M",
    images: [
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    ]
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background-subtle">
      {/* Top Bar */}
      <TopBar />

      {/* Main Feed Area */}
      <main className="pt-14 pb-16">
        <div className="max-w-2xl mx-auto px-4 py-6 overflow-y-auto space-y-6">
          {/* Stories Section */}
          <Stories />

          {/* Suggested For You Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Suggested for you</h2>
          </div>

          {/* Startup Posts */}
          {mockStartups.map((startup, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <StartupPost company={startup} />
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Index;
