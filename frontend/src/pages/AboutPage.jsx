import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Users,
  Trophy,
  Target,
  Lightbulb,
  ChevronRight,
  Heart,
} from "lucide-react";
import UserCard from "@/components/UserCard";

// Motion components
const fadeIn = (delay) => {
  return {
    opacity: 0,
    transition: { duration: 0.5, delay },
    animate: { opacity: 1 },
  };
};

const slideIn = (delay, direction = "right") => {
  const x = direction === "right" ? 50 : -50;
  return {
    initial: { opacity: 0, x },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay },
  };
};

const scaleIn = (delay) => {
  return {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, delay },
  };
};

// Component for section headers with animation
const SectionHeader = ({ title, subtitle }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`text-center mb-12 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
        {title}
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
};

// Team member data
const teamMembers = [
  {
    name: "Mridupawan Bordoloi",
    role: "Full Stack Developer (Specialized In MERN , Python and Cyber Security)",
    bio: "My name is mridupawan bordoloi . I am 4th semester student of MCA at Assam downtown University. I have strong interest in Full Stack Development and have knowlendge about HTML , CSS , JavaScript , React JS , Astro JS , Node Js, Express JS , MongoDB , MySQL , Python etc",
    image: "/api/placeholder/300/300",
  },
  {
    name: "Rahul Chandra Das",
    role: "HTML, CSS Developer",
    bio: "My name is mridupawan bordoloi . I am 4th semester student of MCA at Assam downtown University. I have strong interest in Full Stack Development and have knowlendge about HTML , CSS , JavaScript , React JS , Astro JS , Node Js, Express JS , MongoDB , MySQL , Python etc",
    image: "/api/placeholder/300/300",
  },
];

// Company values
const values = [
  {
    title: "Innovation",
    description:
      "We push boundaries and challenge the status quo to create meaningful solutions.",
    icon: <Lightbulb className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, from product quality to customer service.",
    icon: <Trophy className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Integrity",
    description:
      "We operate with transparency and honesty in all our interactions.",
    icon: <Heart className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Collaboration",
    description:
      "We believe the best solutions come from diverse teams working together.",
    icon: <Users className="h-8 w-8 text-blue-500" />,
  },
];

// Timeline data
const timeline = [
  {
    year: "2015",
    event: "Company founded with a vision to revolutionize the industry",
  },
  { year: "2017", event: "Launched our first product to critical acclaim" },
  { year: "2019", event: "Expanded operations to international markets" },
  { year: "2021", event: "Secured major funding to accelerate growth" },
  {
    year: "2023",
    event: "Reached milestone of serving over 1 million customers",
  },
  { year: "2024", event: "Opened new headquarters and research facility" },
];

// Main component
export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("mission");
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setAnimateItems(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-green-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-90"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
          <div
            className={`transition-all duration-1000 delay-300 transform ${
              animateItems
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              About Our Platform
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mb-8">
              We're on a mission to give the lost item to the Owner of the
              product.
            </p>
            <Button className="bg-white text-blue-700 hover:bg-gray-100">
              Learn More <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 max-w-6xl mx-auto px-4">
        <SectionHeader
          title="Our Mission & Vision"
          subtitle="Discover what drives us forward and shapes our company culture"
        />

        <Tabs
          defaultValue="mission"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-4xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="mission">Mission</TabsTrigger>
            <TabsTrigger value="vision">Vision</TabsTrigger>
            <TabsTrigger value="story">Our Story</TabsTrigger>
          </TabsList>

          <TabsContent
            value="mission"
            className={`transition-all duration-500 ${
              activeTab === "mission" ? "opacity-100" : "opacity-0"
            }`}
          >
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>
                  What we strive to accomplish every day
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our mission is to reunite lost items with their rightful
                  owners through a reliable, secure, and user-friendly platform.
                  We aim to simplify the process of reporting, searching, and
                  claiming lost belongings—making it easier for individuals and
                  institutions to recover what's important to them.
                </p>
                <p>
                  By leveraging modern technology and intuitive design, we
                  provide an efficient system that fosters trust, reduces loss,
                  and supports a more connected community.
                </p>
                <div className="flex items-center mt-6 p-4 bg-blue-50 rounded-lg">
                  <Target className="h-12 w-12 mr-4 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-lg">Our core purpose</h4>
                    <p className="text-gray-600">
                      To make powerful platform accessible and beneficial to
                      everyone.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value="vision"
            className={`transition-all duration-500 ${
              activeTab === "vision" ? "opacity-100" : "opacity-0"
            }`}
          >
            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
                <CardDescription>
                  Where we're headed in the future
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We envision a world where lost items are never truly gone—just
                  waiting to be found through the power of technology and
                  community.
                </p>
                <p>
                  Our vision is to lead the transformation in how people report,
                  find, and return lost belongings, creating a connected
                  ecosystem where trust, responsibility, and support thrive.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value="story"
            className={`transition-all duration-500 ${
              activeTab === "story" ? "opacity-100" : "opacity-0"
            }`}
          >
            <Card>
              <CardHeader>
                <CardTitle>Our Story</CardTitle>
                <CardDescription>
                  The journey that brought us here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our Lost and Found system was created by a team of students in
                  2025 who recognized the everyday challenges faced by
                  individuals trying to recover their lost items, especially in
                  busy environments like University Campus.
                </p>
                <p>
                  What began as a simple idea in a college project has grown
                  into a reliable platform used by communities and institutions
                  to report, search, and return lost belongings. From day one,
                  we've stayed committed to our core values of trust,
                  innovation, and user-centric design.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 max-w-6xl mx-auto px-4">
        <SectionHeader
          title="Our Team Member's"
          subtitle="Meet the people driving our mission forward"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((user, index) => (
            <UserCard info={{ user, index }} />
          ))}
        </div>
      </section>
    </div>
  );
}
