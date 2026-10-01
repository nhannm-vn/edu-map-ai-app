export const GRID_BARS: string[][] = [
  ["#E2E8F0", "#93C5FD", "#4F46E5", "#93C5FD"],
  ["#93C5FD", "#E2E8F0", "#93C5FD", "#4F46E5"],
  ["#BFDBFE", "#93C5FD", "#E2E8F0", "#93C5FD"],
  ["#4F46E5", "#4F46E5", "#BFDBFE", "#E2E8F0"],
  ["#93C5FD", "#93C5FD", "#BFDBFE", "#93C5FD"],
  ["#E2E8F0", "#E2E8F0", "#4F46E5", "#BFDBFE"],
  ["#93C5FD", "#93C5FD", "#93C5FD", "#4F46E5"],
  ["#BFDBFE", "#BFDBFE", "#E2E8F0", "#93C5FD"],
  ["#4F46E5", "#4F46E5", "#BFDBFE", "#E2E8F0"],
  ["#93C5FD", "#93C5FD", "#BFDBFE", "#93C5FD"],
  ["#E2E8F0", "#E2E8F0", "#4F46E5", "#BFDBFE"],
  ["#BFDBFE", "#BFDBFE", "#93C5FD", "#93C5FD"],
  ["#BFDBFE", "#93C5FD", "#E2E8F0", "#4F46E5"],
  ["#4F46E5", "#93C5FD", "#93C5FD", "#93C5FD"],
];

export const TESTIMONIALS = [
  {
    id: "1",
    quote:
      '"EduMap AI turned my chaotic learning into a clear weekly plan. Landed my Stripe internship in 4 months."',
    name: "Sarah Kim",
    role: "CS @ Stanford",
    initials: "SK",
    bgColor: "#E0F2FE",
    textColor: "#0284C7",
  },
  {
    id: "2",
    quote:
      '"The skill tree visualization is genius. I finally saw the gaps holding me back from FAANG offers."',
    name: "David Chen",
    role: "SE Intern @ Google",
    initials: "DC",
    bgColor: "#FEF08A",
    textColor: "#CA8A04",
  },
  {
    id: "3",
    quote:
      '"The AI mentor reads my GitHub and tells me exactly what to build next. It\'s like a senior engineer in my pocket."',
    name: "Priya Patel",
    role: "ML @ CMU",
    initials: "PP",
    bgColor: "#FCE7F3",
    textColor: "#DB2777",
  },
];

export const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    subtitle: "Get started for free",
    price: "$0",
    billingPeriod: "/month",
    buttonText: "Start free",
    variant: "outline" as const,
    features: [
      "Skill tree (basic)",
      "5 AI chats/day",
      "Public courses",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro Student",
    subtitle: "Most popular",
    price: "$2",
    billingPeriod: "/month",
    buttonText: "Go Pro",
    variant: "solid" as const,
    badge: "Most popular",
    features: [
      "Unlimited AI mentor",
      "Full skill tree",
      "Job matching",
      "Resume review",
      "Priority support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "Best value · billed annually",
    price: "$20",
    originalPrice: "$24",
    billingPeriod: "/year",
    buttonText: "Get Premium",
    variant: "outline" as const,
    discountBadge: "Save $4 · 17% OFF",
    features: [
      "Everything in Pro Student",
      "Priority AI Analysis — faster processing & higher priority",
    ],
  },
];
