export interface Story {
  id: string;
  title: string;
  category: string;
  readTime: string;
  updateInfo?: string;
  insights: string[];
  mattersToYou: string;
  tags: string[];
  imageUrl: string;
  content?: string;
}

export const MOCK_STORIES: Story[] = [
  {
    id: '1',
    title: "RBI’s move is quietly reshaping small-cap momentum",
    category: "Monetary Policy",
    readTime: "4 MIN READ",
    updateInfo: "Update 2 • Developing Story",
    insights: [
      "Regulatory tightening on unsecured lending is forcing a liquidity pivot toward defensive mid-cap clusters.",
      "Wealth managers are reporting a 14% shift in portfolio allocation from volatile 'micro-thematics' to high-yield credit."
    ],
    mattersToYou: "Based on your interest in \"Emerging Markets\" and \"Fixed Income\", this shift suggests your current small-cap exposure may face a technical correction by Q3.",
    tags: ["MARKETS", "REGULATION", "RBI"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD347lTm1lKdd8VHYGYuZtvTEXRSOHingDfDTxRj3kyG6ybNw1LpOoRl0Yq8SauRbSmA-iACdiX7u1hc5FdlWrnjludo8UNoEz0kakB7beZx-RMbXTm_CzzJIxj879Cj6dk1jcdL5HY6XLgMbUM3dRuakI7ftkyPrWwyzhNEZKPg--zbvFIK-_9vc6q98dlwPnarfC31p9_ZZ8KU9DtgVoyW1x_Fd_JqdPfpNlyJE_W_ZwkIA4dWgy-KZt3rnpXUglj5y3SpZ2wbA",
    content: `The traditional financial rail is a series of handshakes—human, delayed, and expensive. As the global economy pivots toward what many are calling the "Digital Enlightenment," the friction points of 20th-century banking are being cauterized by neural networks specialized in collateral optimization.

Central banks are no longer just monitoring inflation; they are monitoring the *velocity of inference*. When a model can predict a liquidity crunch ten milliseconds before it happens, the nature of a "lender of last resort" fundamentally changes.

We are entering a period of asymmetric information where the scale of your compute is as important as the scale of your balance sheet. The "Digital Curator" isn't just a reader; it is an active participant in the narrative arc of global finance.`
  },
  {
    id: '2',
    title: "Silicon Valley's pivot to hardware is a bet on energy infrastructure",
    category: "Contextual Analysis",
    readTime: "6 MIN READ",
    insights: [
      "Major AI labs are now outbidding states for dedicated nuclear power capacity to fuel future data center clusters.",
      "Venture capital is shifting from 'software-as-a-service' to 'compute-as-a-commodity', targeting the physical layer of the stack.",
      "Supply chain constraints for custom silicon are creating a temporary moat for established players like NVIDIA and AMD."
    ],
    mattersToYou: "You followed \"Nvidia Earnings\" last week. This development indicates that power utility stocks might be the silent winners in your tech-heavy portfolio.",
    tags: ["AI", "ENERGY", "TECH"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt8axmc9Nh-0NVrAEQJHg6OEH9uT_55LEcPeXLthTqJgdsXFS2lFmdTLv-WcFozyusWnVqGZCKQpjhNQotV46VRCFFH6caYrigOYxS6qubMwknHu2GinWfS4JewVHEo9YyFfmEKqnpUgDlfyJULxxtSYBXF4SLiU4rxN3_G6Bllm35CEC7sdNptUhxPf-gUggKZ8x071na8U8zOh4cMrNsYbd4a0EoAisCVBFl_Kk5ORtZAYkF6ndBF3H90mQ15Wc6EOLpgh9ayA"
  }
];

export const INTERESTS = [
  "Macroeconomics", "Venture Capital", "Geopolitics", "Generative AI",
  "Equity Markets", "Sustainable Energy", "Emerging Tech", "Policy",
  "Real Estate", "Central Banking", "Cryptocurrency", "Luxury Markets"
];
