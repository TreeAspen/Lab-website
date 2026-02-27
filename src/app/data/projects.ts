/**
 * Centralized project data used by both OurWork listing & ProjectDetail pages.
 */
export interface ProjectData {
  id: number;
  slug: string;
  title: string;
  desc: string;
  heroImage: string;
  gallery: string[];
  tags: string[];
  year: string;
  status: string;
  overview: string;
  sections: { heading: string; body: string; image?: string }[];
  team: string[];
}

export const projects: ProjectData[] = [
  {
    id: 1,
    slug: "neural-feedback-loop",
    title: "Neural Feedback Loop",
    desc: "Using AI to optimize urban grid layouts.",
    heroImage:
      "https://images.unsplash.com/photo-1562544887-593f89e2d21b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwZGF0YSUyMHZpc3VhbGl6YXRpb24lMjBkYXJrfGVufDF8fHx8MTc3MjEzNzU0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [],
    tags: ["AI", "Neural Networks", "Urban Grid"],
    year: "2025",
    status: "ACTIVE",
    overview:
      "This project explores how neural feedback mechanisms can be leveraged to dynamically optimize urban grid infrastructure. By feeding real-time sensor data into deep learning models, we create adaptive systems that respond to changing urban conditions.",
    sections: [
      {
        heading: "Methodology",
        body: "We deploy a distributed sensor network across key urban nodes, collecting data on traffic flow, energy consumption, and pedestrian density. This data is processed through our custom transformer architecture that identifies optimization patterns invisible to traditional analysis.",
      },
      {
        heading: "Key Findings",
        body: "Our neural feedback system achieved a 34% improvement in grid efficiency during peak hours. The adaptive routing algorithm reduced average commute times by 12 minutes in the test district, while simultaneously lowering energy consumption by 18%.",
      },
      {
        heading: "Future Directions",
        body: "We are expanding the sensor network to cover three additional urban districts. The next phase integrates predictive weather modeling to pre-optimize grid configurations before demand spikes occur.",
      },
    ],
    team: ["Dr. Zhang Wei", "Sarah Chen", "Marcus Liu"],
  },
  {
    id: 2,
    slug: "urban-grid-optimization",
    title: "Urban Grid Optimization",
    desc: "Analyzing traffic flow patterns in real-time.",
    heroImage:
      "https://images.unsplash.com/photo-1513013389593-d6aef47d5b5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGNpdHklMjBhZXJpYWwlMjBuaWdodCUyMGdyaWR8ZW58MXx8fHwxNzcyMTM3NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [],
    tags: ["Traffic Analysis", "Real-time", "Optimization"],
    year: "2024",
    status: "COMPLETED",
    overview:
      "A comprehensive study of urban traffic flow using computer vision and edge computing. Our system processes thousands of video feeds in real-time to build a living map of city movement patterns.",
    sections: [
      {
        heading: "System Architecture",
        body: "The platform uses a mesh of edge computing nodes positioned at major intersections. Each node runs lightweight YOLO-based detection models, pushing aggregated flow vectors to our central analysis cluster every 500ms.",
      },
      {
        heading: "Results",
        body: "We mapped over 2.4 million unique vehicle trajectories across a 6-month period. The resulting flow models revealed 47 previously unknown bottleneck patterns that were subsequently resolved through signal timing adjustments.",
      },
      {
        heading: "Impact",
        body: "Traffic congestion in the pilot area decreased by 23%. Emergency vehicle response times improved by an average of 4.2 minutes. The system is now being considered for city-wide deployment.",
      },
    ],
    team: ["Prof. Li Ming", "Alex Rivera", "Yuki Tanaka"],
  },
  {
    id: 3,
    slug: "smart-city-interfaces",
    title: "Smart City Interfaces",
    desc: "HCI principles applied to public infrastructure.",
    heroImage:
      "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZGFzaGJvYXJkJTIwaW50ZXJmYWNlJTIwaG9sb2dyYW18ZW58MXx8fHwxNzcyMTM3NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [],
    tags: ["HCI", "Public Design", "Interaction"],
    year: "2025",
    status: "ACTIVE",
    overview:
      "Redesigning how citizens interact with smart city infrastructure through human-centered design principles. We create intuitive interfaces that bridge the gap between complex urban systems and everyday users.",
    sections: [
      {
        heading: "Design Philosophy",
        body: "Our approach centers on 'invisible computing' — technology that serves without demanding attention. We conducted 200+ user interviews to understand how people naturally navigate urban environments and designed interfaces that align with those mental models.",
      },
      {
        heading: "Prototypes",
        body: "We developed three prototype systems: an ambient light-based wayfinding system, a gesture-controlled public information kiosk, and a haptic feedback crosswalk for visually impaired pedestrians.",
      },
      {
        heading: "User Testing",
        body: "Initial user testing showed 89% task completion rates across all demographics, including elderly users and children. The haptic crosswalk system received particular praise from accessibility advocates.",
      },
    ],
    team: ["Dr. Kim Soo-Jin", "Emma Watson", "Raj Patel"],
  },
  {
    id: 4,
    slug: "data-visualization",
    title: "Data Visualization",
    desc: "Visualizing complex datasets for city planning.",
    heroImage:
      "https://images.unsplash.com/photo-1623292854034-b3c1ab8233be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwc2VydmVyJTIwcm9vbSUyMG5lb258ZW58MXx8fHwxNzcyMTM3NTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [],
    tags: ["Data Viz", "3D Mapping", "Planning"],
    year: "2025",
    status: "IN PROGRESS",
    overview:
      "Creating immersive 3D data visualization tools that transform raw urban datasets into actionable insights for city planners and policymakers.",
    sections: [
      {
        heading: "Technology Stack",
        body: "We built a WebGL-based rendering engine capable of displaying millions of data points in real-time. The system supports temporal scrubbing, allowing planners to visualize how urban patterns evolve over hours, days, and seasons.",
      },
      {
        heading: "Case Study: District 7",
        body: "Applied our visualization tools to District 7's redevelopment plan. The 3D heatmaps revealed that the proposed park location would serve 40% fewer residents than an alternative site just 200 meters north.",
      },
      {
        heading: "Open Source",
        body: "We are releasing the core rendering engine as open-source software. The goal is to democratize urban data visualization so that communities worldwide can participate in planning decisions.",
      },
    ],
    team: ["Dr. Wang Fei", "Jordan Blake", "Nina Kowalski"],
  },
  {
    id: 5,
    slug: "sustainable-energy",
    title: "Sustainable Energy",
    desc: "Optimizing energy consumption in smart buildings.",
    heroImage:
      "https://images.unsplash.com/photo-1763114613273-ec505136d03a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwc3VzdGFpbmFibGUlMjBlbmVyZ3klMjByb29mdG9wfGVufDF8fHx8MTc3MjEzNzU0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [],
    tags: ["Energy", "Sustainability", "IoT"],
    year: "2024",
    status: "COMPLETED",
    overview:
      "Developing intelligent building management systems that minimize energy waste through predictive modeling and IoT sensor networks.",
    sections: [
      {
        heading: "Sensor Network",
        body: "Each building in our pilot program was equipped with 50-80 IoT sensors monitoring temperature, humidity, light levels, occupancy, and air quality. The mesh network operates on ultra-low-power protocols with 99.7% uptime.",
      },
      {
        heading: "AI-Driven Optimization",
        body: "Our reinforcement learning model controls HVAC systems, lighting, and window shading in real-time. It learned building-specific patterns within two weeks, achieving energy savings of 27% compared to traditional scheduled systems.",
      },
      {
        heading: "Scalability",
        body: "The system has been successfully deployed in 12 buildings across 3 cities. We are now partnering with commercial real estate firms to scale to 200+ buildings by end of 2026.",
      },
    ],
    team: ["Prof. Chen Hao", "Lisa Park", "Ahmed Hassan"],
  },
  {
    id: 6,
    slug: "community-engagement",
    title: "Community Engagement",
    desc: "Tools for citizen participation in urban design.",
    heroImage:
      "https://images.unsplash.com/photo-1726831662513-48fb5f72c6f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB3b3Jrc2hvcCUyMGRpZ2l0YWwlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc3MjEzNzU0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [],
    tags: ["Community", "Participatory Design", "Digital Tools"],
    year: "2025",
    status: "ACTIVE",
    overview:
      "Building digital platforms that empower citizens to actively participate in urban planning and community design processes.",
    sections: [
      {
        heading: "Platform Design",
        body: "Our platform combines social networking features with spatial planning tools. Residents can annotate maps, propose changes, vote on designs, and track the implementation of community-approved projects.",
      },
      {
        heading: "Engagement Metrics",
        body: "In the first six months, the platform attracted 15,000 active users who submitted over 3,400 proposals. The most popular feature was the AR preview tool that lets users visualize proposed changes in their actual neighborhood.",
      },
      {
        heading: "Policy Integration",
        body: "Three local governments have formally integrated our platform into their planning approval processes. Community proposals that receive sufficient support now automatically enter the official review pipeline.",
      },
    ],
    team: ["Dr. Maria Santos", "David Kim", "Sophie Turner"],
  },
];

export const newsDetailData = [
  {
    id: 1,
    title: "New Paper on Urban Exposure & Health Published",
    date: "2026-02-20",
    author: "U.TOP Research",
    heroImage:
      "https://images.unsplash.com/photo-1574519618668-c34001efde43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc3MTc5NTY4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Publication", "Health", "Urban Exposure"],
    content: [
      "Our latest research published in Environment & Planning B explores the relationship between urban spatial exposure and mental health outcomes using wearable sensors and mobile data from 2,400 participants.",
      "We quantified daily exposure to green space, noise, and air quality across three neighborhoods. The findings reveal significant correlations between spatial design and self-reported wellbeing, offering new evidence for health-centered urban planning.",
      "This work advances the U.TOP Lab mission of evidence-based urban design by providing quantitative tools for measuring how spatial environments affect human health at population scale.",
    ],
  },
  {
    id: 2,
    title: "AI for Citizen Science Toolkit — Demo Released",
    date: "2026-02-15",
    author: "U.TOP Lab",
    heroImage:
      "https://images.unsplash.com/photo-1585051256362-eb56bf4d5ea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neSUyMGNpcmN1aXQlMjBib2FyZHxlbnwxfHx8fDE3NzE3OTU2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Tools", "AI", "Citizen Science"],
    content: [
      "We've released a public demo of our AI-powered citizen science toolkit, designed to enable communities to actively participate in urban environmental monitoring without requiring technical expertise.",
      "The platform uses conversational AI to guide non-expert users through data collection tasks including air quality sampling, noise level mapping, and pedestrian flow observation. Early testing with community groups in Gainesville showed 89% task completion rates.",
      "This tool represents our commitment to democratizing urban intelligence and turning complex sensing technology into accessible public resources.",
    ],
  },
  {
    id: 3,
    title: "Urban VR Planning User Study — Recruiting Now",
    date: "2026-02-10",
    author: "U.TOP HCI Team",
    heroImage:
      "https://images.unsplash.com/photo-1759078634211-cbe4201f26fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZXhwbyUyMGZ1dHVyaXN0aWMlMjBldmVudHxlbnwxfHx8fDE3NzE3OTU2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["User Study", "VR", "Recruiting"],
    content: [
      "We are currently recruiting participants for our immersive VR urban planning user study. Participants will experience proposed neighborhood changes in virtual reality and provide feedback through our interactive evaluation system.",
      "The study is open to all residents aged 18+ and sessions last approximately 45 minutes at our lab in Gainesville. Participants receive a $25 gift card as compensation.",
      "This research is part of our Pillar 2 work on Urban HCI & Immersive Systems, exploring how VR can make urban planning more participatory and human-centered.",
    ],
  },
];

export const highlightDetailData = [
  {
    id: "urban",
    title: "Urban Sensing",
    heroImage:
      "https://images.unsplash.com/photo-1758792621133-fc505136d03a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHNlbnNpbmclMjBJb1QlMjBzdHJlZXRsaWdodCUyMHNlbnNvcnxlbnwxfHx8fDE3NzIxMzc1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["IoT", "Sensors", "Data Collection"],
    overview:
      "Our Urban Sensing research focuses on deploying intelligent sensor networks throughout city environments to capture real-time data on air quality, noise levels, pedestrian flow, and infrastructure health.",
    sections: [
      {
        heading: "Research Focus",
        body: "We develop low-power, high-accuracy sensor modules that can be embedded into existing urban infrastructure — street lamps, benches, bus stops — without requiring new construction. Each sensor node communicates via mesh networking protocols.",
      },
      {
        heading: "Current Projects",
        body: "Our flagship deployment covers a 12-block area with 340 sensor nodes. The network generates over 2TB of environmental data monthly, feeding into our predictive models for urban planning.",
      },
    ],
  },
  {
    id: "vr",
    title: "Virtual Reality",
    heroImage:
      "https://images.unsplash.com/photo-1708924401329-bb17acf6c16b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGhlYWRzZXQlMjBjeWJlcnB1bmt8ZW58MXx8fHwxNzcyMTM3NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["VR", "Immersive", "Simulation"],
    overview:
      "Our Virtual Reality division creates immersive urban simulation environments that allow planners, architects, and citizens to experience proposed changes before they are built.",
    sections: [
      {
        heading: "Technology",
        body: "We use photogrammetry and LiDAR scanning to create centimeter-accurate digital twins of urban environments. These are rendered in real-time using our custom VR engine optimized for architectural visualization.",
      },
      {
        heading: "Applications",
        body: "VR simulations have been used in 8 municipal planning reviews, allowing council members to 'walk through' proposed developments. Public VR stations have been installed in 3 community centers for citizen feedback sessions.",
      },
    ],
  },
  {
    id: "hci",
    title: "Human-Computer Interaction",
    heroImage:
      "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZGFzaGJvYXJkJTIwaW50ZXJmYWNlJTIwaG9sb2dyYW18ZW58MXx8fHwxNzcyMTM3NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["HCI", "UX Research", "Accessibility"],
    overview:
      "Our HCI research investigates how people interact with urban technology systems and develops design frameworks that ensure these systems are intuitive, accessible, and equitable.",
    sections: [
      {
        heading: "Research Areas",
        body: "We study gesture-based interaction for public displays, voice interfaces for urban navigation, and haptic feedback systems for accessibility. Our lab has published 12 papers on inclusive urban interface design.",
      },
      {
        heading: "Design Guidelines",
        body: "We've developed the 'Urban Interface Design Framework' (UIDF), a set of 40+ guidelines for creating public-facing technology that works for all demographics, abilities, and contexts.",
      },
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    heroImage:
      "https://images.unsplash.com/photo-1562544887-593f89e2d21b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwZGF0YSUyMHZpc3VhbGl6YXRpb24lMjBkYXJrfGVufDF8fHx8MTc3MjEzNzU0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Machine Learning", "Deep Learning", "Prediction"],
    overview:
      "Our AI research applies cutting-edge machine learning techniques to urban challenges — from predicting infrastructure failures to optimizing resource allocation across city systems.",
    sections: [
      {
        heading: "Core Models",
        body: "We maintain a suite of pre-trained models for urban analysis: traffic prediction (98.2% accuracy), air quality forecasting (96.1%), and infrastructure degradation detection (94.7%). All models are updated monthly with fresh data.",
      },
      {
        heading: "Ethics & Governance",
        body: "Every AI system we develop undergoes rigorous bias testing and fairness auditing. We publish transparency reports for all deployed models and maintain an independent ethics review board.",
      },
    ],
  },
];