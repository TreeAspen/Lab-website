/**
 * Centralized project data used by both OurWork listing & ProjectDetail pages.
 */
import {
  avatarIsaiah,
  avatarRuolin,
  avatarShu,
  avatarSteven,
  avatarVincent,
  avatarZhaoxi,
  avatarXueliang,
  avatarSridevi,
  videoStretched,
  videoUrbanAI,
  vrAIStandarize,
  vrResearchDesign,
  vrPlaceSelection,
  vrSegformer,
  vrExperimentWorkflow,
  vrEEGResult,
  vrEDAResult,
  vrSurveyResult,
} from "../assets";

export interface ProjectData {
  id: number;
  slug: string;
  title: string;
  desc: string;
  heroImage: string;
  heroVideo?: string; 
  embedHtml?: string; 
  gallery: string[];
  tags: string[];
  year: string;
  status: string;
  overview: string;
  sections: { heading: string; body: string; image?: string }[];
  team: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  category: "faculty" | "phd" | "master" | "alumni";
  avatar: string;
  bio: string;
  fullBio?: string;
  research: string[];
  email?: string;
  website?: string;
  education?: string[];
  publications?: { title: string; venue: string; year: string; link?: string }[];
  projects?: string[];
}

export interface HighlightData {
  id: string;
  title: string;
  heroImage: string;
  heroVideo?: string; 
  embedHtml?: string; 
  tags: string[];
  overview: string[];
  focusPoints: string[];
  relatedProjects: string[];
  publications: { citation: string; link?: string }[];
  conferences: string[];
  mediaLink?: { label: string; url: string };
}

// ==========================================
// 1. PROJECTS
// ==========================================
export const projects: ProjectData[] = [
  {
    id: 1,
    slug: "cool-project-heat-stress",
    title: "The 'COOL' Project",
    desc: "Integrating Mobile Sensing and Environmental Simulation for Heat Stress Mitigation.",
    heroImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    heroVideo: "/Segmentation.mp4", 
    embedHtml: "/UrbanSensorInteractive.html",
    gallery: [], tags: ["Urban Sensing", "Heat Stress", "Simulation"], year: "2025", status: "ACTIVE",
    overview: "The Climate-Optimized Outdoor Living (COOL) project focuses on understanding and mitigating urban heat stress. By integrating mobile sensing data with advanced environmental simulations, we assess how adaptive urban design can improve thermal comfort in outdoor spaces.",
    sections: [
      { heading: "Methodology", body: "We deploy portable environmental sensors alongside physiological monitors to capture the co-occurrence of heat and human stress in real urban settings. This allows us to move beyond static climate maps and understand heat exposure at the human scale." },
      { heading: "Collaborators", body: "Collaborate with: Dr. Jun Wang (Assistant Professor, Urban and Regional Planning, FAU) and Dr. Yohan Kim (Assistant Professor, School of Architecture, UF)." }
    ],
    team: ["Dr. Zhaoxi Zhang", "Dr. Jun Wang (FAU)", "Dr. Yohan Kim (UF)"],
  },
  {
    id: 2,
    slug: "virtual-therapy-urban-stress",
    title: "Virtual Therapy to Urban Stress",
    desc: "Exploring visual elements in mitigating urban stress via Body Sensing and VR.",
    heroImage: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    heroVideo: videoStretched,
    gallery: [], tags: ["Urban VR", "EEG/EDA", "Biosensing"], year: "2025", status: "ACTIVE",
    overview: "This project integrates the use of virtual reality (VR) scenes with physiological data collected from Emotiv (EEG) and Empatica (EDA) biosensors. We aim to understand individuals’ responses to greenery as a potential therapeutic in relation to urban stress.",
    sections: [
      { heading: "Collaborators", body: "Collaborate with: Dr. Prince Amegbor (NYU), Dr. H. Shellae Versey (Fordham University), Anton Rozhkov (CUSP, NYU Tandon)." },
    ],
    team: ["Dr. Zhaoxi Zhang", "Dr. Prince Amegbor (NYU)", "Dr. H. Shellae Versey (Fordham)", "Anton Rozhkov (NYU)", "Isaiah Garnett", "Ruolin Wu", "Shu (Aspen) Yang"],
  },
  {
    id: 3,
    slug: "CoDesignAI-collaborative-agent",
    title: "CoDesignAI: Urban Design Agent",
    desc: "Collaborative Urban Design Agent for Multi-Users.",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    heroVideo: videoUrbanAI, 
    gallery: [], tags: ["Urban Agent", "HCI", "Co-design"], year: "2025", status: "PROTOTYPE",
    overview: "CityWe is an AI-assisted, location-based visual tool designed to support collaboration among diverse stakeholders during the early stages of urban design. It enables anyone to interact with and modify street environments.",
    sections: [
      { heading: "Platform Features", body: "By translating complex planning jargon into intuitive visual modifications, CityWe makes it easier for the public to communicate ideas, preferences, and design intentions directly with planners and decision-makers." },
    ],
    team: ["Dr. Zhaoxi Zhang", "Ruolin Wu", "Feiyang Ren", "Sridevi Turaga", "Tamir Mendel"],
  },
  {
    id: 4,
    slug: "soundscape-llm-mapping",
    title: "LLM Soundscape Mapping",
    desc: "Detecting and Mapping Soundscapes using Large Language Models.",
    heroImage: "https://images.unsplash.com/photo-1508739773402-3ea1af4c6bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    heroVideo: videoUrbanAI, 
    gallery: [], tags: ["Urban Sensing", "LLM", "Spatial Analysis"], year: "2026", status: "ACTIVE",
    overview: "This project utilizes Large Language Models (LLMs) and spatial analysis to categorize sources and intensities of urban sound, evaluating the noise pollution landscape in New York City.",
    sections: [
      { heading: "Diagnostic Framework", body: "Developing a diagnostic framework for urban soundscape analysis in NYC. By fine-tuning multimodal models and integrating geospatial metadata like land-use types, the work aims to move beyond simple classification to provide context-aware noise source identification." },
      { heading: "Collaborators", body: "Collaborate with: Dr. Prince Amegbor (Assistant Professor of Global and Environmental Health, NYU)." },
    ],
    team: ["Dr. Zhaoxi Zhang", "Dr. Prince Amegbor (NYU)", "Steven Shi", "Vincent (Fanghua) Cao"],
  },
  {
    id: 5,
    slug: "ghana-climate-risk-agent",
    title: "Ghana Climate Risk Agent",
    desc: "AI Agent Empowered with Community Data for Urban Air Pollution.",
    heroImage: "https://images.unsplash.com/photo-1611270418597-a6cbf224e7eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    heroVideo: videoUrbanAI, 
    gallery: [], tags: ["Urban Agent", "Global Health", "Climate"], year: "2025", status: "ACTIVE",
    overview: "An AI agent system designed for urban air pollution and climate risk management in Ghana. The system is empowered by ground-level community data to provide localized, actionable environmental insights.",
    sections: [
      { heading: "Collaborators", body: "Collaborate with: Dr. Reginald Quansah (University of Ghana), Dr. Xiao Huang (Emory University), and Dr. Prince Amegbor (NYU)." },
    ],
    team: ["Dr. Zhaoxi Zhang", "Dr. Reginald Quansah (Ghana)", "Dr. Xiao Huang (Emory)", "Dr. Prince Amegbor (NYU)"],
  },
  {
    id: 6,
    slug: "inclusive-greenspace-vr",
    title: "Inclusive Greenspace Emotion",
    desc: "Sensitivity-Inclusive Approaches to Understand Emotional Responses.",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    heroVideo: videoStretched, 
    gallery: [], tags: ["Urban VR", "Landscape", "Emotion"], year: "2025", status: "ACTIVE",
    overview: "A VR-based study quantifying how specific urban features, such as greenery, contribute to high-quality environments and shape psychological perceptions like safety and preference across diverse populations.",
    sections: [
      { heading: "Collaborators", body: "Collaborate with: Dr. Jiayang Li (Assistant Professor, Landscape Architecture, UF) and Dr. Xiaoya Zhang (Assistant Professor, UF)." },
    ],
    team: ["Dr. Zhaoxi Zhang", "Dr. Jiayang Li (UF)", "Dr. Xiaoya Zhang (UF)"],
  },
];

// ==========================================
// 2. NEWS
// ==========================================
export const newsDetailData = [
  {
    id: 1, title: "Latest Publication: VR Study on Flood Risk Response", date: "2025-01-15", author: "U.TOP Research",
    heroImage: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", tags: ["Publication", "VR", "Disaster Risk"],
    content: ["Our latest research, 'Using virtual reality to study human response to flood risk across controlled experiments', has been officially published in the International Journal of Disaster Risk Reduction (IJDRR, Vol. 132)."]
  },
  {
    id: 2, title: "Tools Release: CoDesignAI Collaborative Platform", date: "2025-11-20", author: "U.TOP Lab",
    heroImage: "https://images.unsplash.com/photo-1585051256362-eb56bf4d5ea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", tags: ["Tools", "AI", "Co-Design"],
    content: [
      "CoDesignAI is a web-based collaborative platform that uses multi-agent AI to support participatory urban design.",
      "The system integrates conversational AI with Google Maps and Street View to help multiple users explore real-world urban contexts, discuss ideas, and generate visual design concepts together. By enabling iterative discussion and AI-assisted visualization, CoDesignAI aims to make early-stage urban design more open, collaborative, and accessible to diverse participants."
    ]
  },
  {
    id: 3,
    title: "Physiological and Psychological Response to Context-Specific Greenery",
    subtitle: "An Immersive Experiment Using Virtual Reality and Multi-Measurement",
    date: "2026-03-17",
    author: "Ruolin Wu, Shu Yang, Isaiah Garnett",
    sponsor: "Prince Michael Amegbor",
    mentors: "Anton Rozhkov, Zhaoxi Zhang, H. Shellae Versey",
    heroImage: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["VR", "EEG/EDA", "Biosensing", "Urban Greenery", "Stress"],
    content: [
      "This study investigates how urban greenery and surrounding spatial context jointly influence stress reduction through VR-based simulation with physiological sensing and psychological scaling.",
      "Using Meta Quest 3 headsets, 25 participants experienced four AI-standardized 360° urban scenes — waterfront, park, residential, and road — while EEG (Emotiv Insight) and EDA (Empatica E4) biosensors captured real-time physiological responses. Results were presented at the 2026 American Association of Geographers Annual Meeting, San Francisco, March 17–21, 2026."
    ],
    sections: [
      {
        heading: "1. Objectives",
        body: "This project investigates how urban greenery and surrounding spatial context jointly influence stress reduction through VR-based simulation with physiological sensing and psychological scaling.\n\n• Examine how physiological responses vary across different urban contexts (park, waterfront, residential, roadway)\n• Identify context-specific conditions under which greenery produces stronger restorative effects\n• Explore relationships between urban visual features and human stress responses to inform evidence-based urban design"
      },
      {
        heading: "2. Background",
        body: "Rapid urbanization is increasing stress and mental health burdens in cities. While prior studies show that greenery can improve thermal comfort and provide psychological restoration, most research focuses solely on the quantity of greenery, or makes sweeping comparisons across urban vs. suburban contexts.\n\nLess is known about how different specific urban contexts shape the stress-reducing effects of greenery."
      },
      {
        heading: "3. Research Design",
        body: "The study follows a full pipeline from literature review through data validation. N = 25 participants were recruited (21 valid datasets retained for EEG and EDA analysis). Physiological sensors — EEG: Emotiv Insight; EDA: Empatica E4. Psychological scales — PANAS-X Manual; Perceived Realism in VR; Perceived Residential Environment Quality Indicator.",
        images: [vrResearchDesign]
      },
      {
        heading: "3.1 Urban Context Selection",
        body: "Four real-world urban settings were selected to represent distinct restorative potentials: parks as green spaces, waterfronts as blue-green spaces, residential areas as everyday greenery, and roads as higher-stress urban settings. 360° videos were captured on-site for each context.",
        images: [vrPlaceSelection]
      },
      {
        heading: "3.2 Greenery Standardization",
        body: "Initial GVI calculations showed unequal greenery levels across the four urban contexts. Using SegFormer-b2 with ADE20K scene parsing and Google Veo 2.0 AI video generation, GVI was unified to 24–34% across all scenes. This isolates the effect of urban context from the effect of raw greenery quantity, allowing a controlled comparison.",
        images: [vrAIStandarize, vrSegformer]
      },
      {
        heading: "3.3 Experiment Workflow",
        body: "Pre-Stimulation: participants filled a before-exposure survey, wore EEG, VR headset, and EDA sensors, then recorded a resting baseline. Stimulation: participants watched each of the 4 urban VR video clips in a randomized order. After each clip they rested and completed a short VR Video Clip survey. A final post-survey was collected after all four exposures.",
        images: [vrExperimentWorkflow]
      },
      {
        heading: "4.1 EEG Results",
        body: "Frontal Alpha Asymmetry (FAA): RM-ANOVA F(3, 57) = 3.35, p = 0.0255* (uncorr.), partial η²p = 0.090. Park and Waterfront tended toward more positive valence-related responses than Road and Residential settings.\n\nArousal (Beta/Alpha Ratio): RM-ANOVA F(3, 57) = 1.94, p = 0.1543 ns, partial η²p = 0.057. Stress scores (Emotiv PM.Stress) were lowest for Waterfront, while raw Beta/Alpha power was highest for Waterfront and Park, suggesting more favorable EEG responses in greener urban contexts.",
        images: [vrEEGResult]
      },
      {
        heading: "4.2 EDA Results",
        body: "Tonic SCL RM-ANOVA: F(3, 57) = 0.68, p = .567, η²p = .034 (n = 20).\nPhasic SCR RM-ANOVA: F(3, 57) = 1.87, p = .177, η²p = .026 (n = 20).\n\nNeither phasic nor tonic EDA measures differed significantly across the four urban contexts (all p > 0.05), with consistently small effect sizes. At the current sample size (n=20), sympathetic arousal — both event-driven (SCR) and sustained (SCL) — was not reliably differentiated by urban scene type.",
        images: [vrEDAResult]
      },
      {
        heading: "4.3 Survey Results",
        body: "Emotional responses differed significantly by context (HighPositive & CalmPositive, p < 0.05), with park and waterfront scenes rated more positively and road scenes less favorably.\n\nFor perceived AI modification: overall paired test Cochran's Q = 1.20, p = 0.753, n = 23. Participants generally could not reliably detect AI-generated greenery changes across scenes (p > 0.05), confirming the ecological validity of the GVI standardization approach.",
        images: [vrSurveyResult]
      },
      {
        heading: "4.4 Conclusion",
        body: "EEG and survey results suggest that urban contexts shape restorative responses, with park and waterfront environments showing the strongest potential to promote positive emotions and psychological recovery. Greenery benefits are not uniform — they depend on the surrounding urban setting."
      },
      {
        heading: "5. Discussion & Future Directions",
        body: "Limitations:\n• Modest sample size may limit statistical power.\n• Sample was mainly students and young adults.\n• VR scenes may not fully capture the complexity of real-world urban environments.\n• EDA signals may be influenced by slower response dynamics and baseline variability across individuals.\n\nFuture Steps:\n• Recruit a larger and more diverse sample.\n• Include more urban contexts and longer exposure durations.\n• Add BVP, HRV, and eye-tracking metrics.\n• Use computer vision to analyze visual attention patterns."
      }
    ]
  },
];

// ==========================================
// 3. HIGHLIGHTS
// ==========================================
export const highlightDetailData: HighlightData[] = [
  {
    id: "urban",
    title: "Urban Sensing",
    heroImage: "https://images.unsplash.com/photo-1758792621133-fc505136d03a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    heroVideo: "/Segmentation.mp4", 
    embedHtml: "/UrbanSensorInteractive.html", 
    tags: ["Wearables", "Biosensors", "Micro-scale"],
    overview: [
      "Urban Sensing uses wearable and portable sensors to understand how people experience the city at the micro scale—streets, parks, plazas, and everyday routes. Our goal is to measure what happens in real places, linking environmental conditions (e.g., noise, heat, air quality, and light) with human stress signals captured by biosensors (e.g., heart rate patterns, skin conductance, and skin temperature). By grounding sensing in everyday mobility and public space use, we move beyond citywide averages and bring urban health evidence to the level where design and planning decisions happen.",
      "Urban Sensing is how we “listen” to the city in everyday life. We measure minute by minute, place by place, to understand where stress builds up, what environmental stressors are happening at the same time, and which urban features support recovery and well-being."
    ],
    focusPoints: [
      "Co-occurrence of environmental stressors: measuring how noise, heat, air pollution, and other exposures overlap in real urban settings.",
      "Health effects of urban features: linking street and public-space design elements (e.g., greenery, shade, traffic conditions, spatial form) to stress and comfort outcomes.",
      "AI for sensing data: using machine learning to clean, align, and interpret multi-sensor streams, and to help generalize local findings to wider city contexts."
    ],
    relatedProjects: ["cool-project-heat-stress", "soundscape-llm-mapping"],
    publications: [
      { citation: "Zhang, Z.*, Mˇechurov., K., Resch, B., Amegbor, P., and Sabel, C. E. (2023). Assessing the association between overcrowding and human physiological stress response in different urban contexts: a case study in Salzburg, Austria. International Journal of Health Geographics, 22(1), 15.", link: "https://doi.org/10.1186/s12942-023-00334-7" },
      { citation: "Zhang, Z.*, Amegbor, P. M., Sigsgaard, T., and Sabel, C. E. (2022). Assessing the association between urban features and human physiological stress response using wearable sensors in different urban contexts. Health and Place, 78, 102924.", link: "https://doi.org/10.1016/j.healthplace.2022.102924" },
      { citation: "Zhang, Z.*, Amegbor, P. M., and Sabel, C. E. (2022). The feasibility of integrating wearable cameras and health trackers for measuring personal exposure to urban features: a pilot study in Roskilde, Denmark. International Journal of E-Planning Research (IJEPR), 11(1), 1-21.", link: "http://doi.org/10.4018/IJEPR.313181" },
      { citation: "Zhang, Z., Long, Y., Chen, L., and Chen, C. (2021). Assessing personal exposure to urban greenery using wearable cameras and machine learning. Cities, 109.", link: "https://doi.org/10.1016/j.cities.2020.103006" },
      { citation: "Zhang, Z.*, Amegbor, P. M., and Sabel, C. E. (2021). Assessing the Current Integration of Multiple Personalised Wearable Sensors for Environment and Health Monitoring. Sensors (Basel), 21(22).", link: "https://doi.org/10.3390/s21227693" }
    ],
    conferences: [
      "Shi, Steven (Student), Zhang, Z.*, and Amegbor, P. (2026, April). Categorizing Sources and Intensities of Sound and Evaluating Noise in New York City Using Large Language Model. International Conference on Urban Affairs (ICUA), Chicago, IL.",
      "Yang. X. (Student), Zhang.X., Rozhkov, A., Zhang, Z., Amegbor, P. M., \"Sensor-Based Micro-Level Observations on Stress Spatial Distribution: A Case Study of Accra\". The 2025 American Association of Geographers Annual Meeting. Detroit, Michigan USA, March 24–26, 2025.",
      "Zhang. X. (Student), Yang.X., Rozhkov, A., Amegbor, P. M., Zhang, Z., \"Sensor-based Observation of Urban Stress in New York City\". The 2025 American Association of Geographers Annual Meeting. Detroit, Michigan USA, March 24–26, 2025."
    ]
  },
  {
    id: "vr",
    title: "Urban VR",
    heroImage: "https://images.unsplash.com/photo-1708924401329-bb17acf6c16b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    heroVideo: videoStretched, 
    tags: ["Immersive", "EEG/EDA", "Digital Twins"],
    overview: [
      "Urban VR uses immersive technologies, 3D modelling and digitalization to improve our understanding of how people experience, evaluate and respond to urban spaces. Our aim is to study human–environment interaction in systematically designed and controlled virtual settings, enabling us to test how specific urban features influence human responses, behavioral patterns, and decision-making processes. By integrating VR with wearable devices such as EEG headsets, EDA watches, and eye tracking technology, we can capture cognitive, emotional, and attentional responses in real time as participants interact with simulated urban environments. This enables us to translate urban environments into interactive digital worlds and provide experimental evidence in spaces where design and planning issues can be examined more directly.",
      "Urban VR enables us to 'test' the city through immersive digital environments. By using VR alongside 3D modelling technologies, we can create realistic yet controllable urban scenarios. This enables us to isolate design variables, simulate environmental conditions and observe how people perceive and act in different settings. This helps us to understand not only which environments people prefer, but also how they behave within them and how they respond to environmental cues. It also helps us to understand how design influences choice and experience."
    ],
    focusPoints: [
      "Controlled VR-based experiments: quantifying how urban features (e.g. greenery) contribute to high-quality environments and shape psychological perceptions, such as safety and preference.",
      "Human behavior and decision-making in virtual environments: reveal the behavioral mechanisms in everyday experience in cities through using immersive digital environments."
    ],
    relatedProjects: ["virtual-therapy-urban-stress", "inclusive-greenspace-vr"],
    publications: [
      { citation: "Zhang, Z. *, Li, Q., Sun, Q., and Ceferino, L. (2025). Using virtual reality to study human response to flood risk across controlled experiments. International Journal of Disaster Risk Reduction, 105956.", link: "https://doi.org/10.1016/j.ijdrr.2025.105956" }
    ],
    conferences: [
      "Wu, R. (Student), Yang, S. (Student), Garnett, I. (Student), Versey, H.S. (Student), Rozhkov A., Amegbor, P. M. and Zhang, Z.* (PI), Physiological and Psychological Response to Context-specific Greenery: An Immersive Experiment Using Virtual Reality and Multimodal Measurement. The 2026 American Association of Geographers Annual Meeting. San Francisco, USA, March 17-21, 2026."
    ]
  },
  {
    id: "agent",
    title: "Urban Agent",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    heroVideo: videoUrbanAI, 
    tags: ["AI Chatbot", "Co-Design", "Participatory"],
    overview: [
      "Urban Agent uses AI, city science, and interactive digital systems to understand and support how people participate in shaping urban change. Our goal is to empower communities and other urban stakeholders by creating responsive tools that connect scientific evidence, expert knowledge, and lived experience. By making urban information more accessible, interactive, and actionable, we support more inclusive, collaborative, and evidence-informed urban design.",
      "Urban Agent is how we make city science more responsive to people. We develop novel methodologies, conversational agents, generative and collaborative design tools that help communities, planners, designers, and decision-makers communicate across different forms of knowledge and expertise. In this way, we aim to make co-design more practical and scalable—supporting collective knowledge production, strengthening stakeholder dialogue, and bringing community narratives into planning and design processes."
    ],
    focusPoints: [
      "AI for participatory planning and design: using AI agents and interactive systems to support communication, engagement, and co-design among communities, planners, designers, and other stakeholders.",
      "AI for collaborative design: building tools that help people visualize ideas, generate design options, solve conflicts and contribute local knowledge and narratives to the shaping of neighborhoods, public spaces, and urban futures."
    ],
    relatedProjects: ["CoDesignAI-collaborative-agent", "ghana-climate-risk-agent"],
    publications: [
      { citation: "Zhang, Z., Wu, R., Ren, F., Turaga, S., & Mendel, T. (2025). CoDesignAI: An AI-Enabled Multi-Agent, Multi-User System for Collaborative Urban Design at the Conceptual Stage. arXiv. cs.HC", link: "" },
      { citation: "Li, J., Zhang, Z., Mendel, T., & Yabe, T. (2026). Exploring sidewalk sheds in New York City through chatbot surveys and human computer interaction (arXiv:2601.23095). arXiv.", link: "https://doi.org/10.48550/arXiv.2601.23095" },
      { citation: "Zhang, Zhaoxi and Mendel, Tamir and Yin, Wen and Raipat, Vaidehi and Yabe, Takahiro, Human-Chatbot Conversations About Urban Park Experiences: A Case Study from Washington Square Park in New York City.", link: "http://dx.doi.org/10.2139/ssrn.5378600" }
    ],
    conferences: [
      "Zhang, Z.*, Wu, R., Ren, F. and Mendel.T., A Multi-User and Multi-Agent Approach to Community Engagement. The 2026 American Association of Geographers Annual Meeting. San Francisco, USA, March 17-21, 2026.",
      "Turaga,S. (Student), Zhang, Z.*, Mendel.T., and Yabe.T. (2026, April). ConResSim: An Interactive Tool for Conflict Detection and Analysis in Community Engagement [Conference abstract]. International Conference on Urban Affairs (ICUA), Chicago, IL.",
      "Zhang, Z.*, Mendel, T.+, Raipat V. (2025) and Yabe, T., Smart Conversations in the City: AI Chatbots for Urban Management—A Case Study in NYC. The 2026 ACSP Annual Conference. Pittsburgh, PA, USA, October 8-10, 2026."
    ]
  },
];

// ==========================================
// 4. TEAM
// ==========================================
export const teamMembers: TeamMember[] = [
  {
    id: "zhaoxi-zhang",
    name: "Dr. Zhaoxi Zhang",
    role: "Lab Director",
    title: "Assistant Professor, University of Florida", 
    category: "faculty",
    avatar: avatarZhaoxi, 
    bio: "Dr. Zhang's research focuses on the intersection of the built environment, human health and technology, developing new tools for participatory design and planning.",
    fullBio: "Zhaoxi Zhang is an Assistant Professor in the Department of Urban and Regional Planning at the University of Florida’s College of Design, Construction and Planning. Her research focuses on the intersection of the built environment, human health and technology. This involves leveraging interdisciplinary knowledge and cutting-edge tools to build capacity for socio-technical transitions and dynamics. Her current research focuses on ‘human-computer-environment’ interaction in participatory design and planning. She works on developing new tools and methods to measure human-level evidence, gather public opinion, and study human decision-making processes for health-priority urban design and a smart future.",
    research: ["Urban Sensing", "VR/AR", "Physiological Computing", "Urban Agent"],
    email: "z.zhang@ufl.edu",
    website: "https://zhaoxizhang.com",
    publications: [
      { title: "CoDesignAI: An AI-Enabled Multi-Agent, Multi-User System for Collaborative Urban Design at the Conceptual Stage", venue: "arXiv", year: "2025" },
      { title: "Exploring sidewalk sheds in New York City through chatbot surveys and human computer interaction", venue: "arXiv", year: "2026" },
      { title: "A Multi-User and Multi-Agent Approach to Community Engagement", venue: "AAG Annual Meeting", year: "2026" },
      { title: "ConResSim: An Interactive Tool for Conflict Detection and Analysis in Community Engagement", venue: "ICUA", year: "2026" },
      { title: "Smart Conversations in the City: AI Chatbots for Urban Management—A Case Study in NYC", venue: "ACSP Annual Conference", year: "2026" },
      { title: "Human-Chatbot Conversations About Urban Park Experiences: A Case Study from Washington Square Park in NYC", venue: "SSRN", year: "2025" },
      { title: "Using virtual reality to study human response to flood risk across controlled experiments", venue: "International Journal of Disaster Risk Reduction", year: "2025" },
      { title: "Assessing the association between urban features and human physiological stress response using wearable sensors", venue: "Health and Place", year: "2022" }
    ],
    projects: ["cool-project-heat-stress", "virtual-therapy-urban-stress", "CoDesignAI-collaborative-agent", "ghana-climate-risk-agent"]
  },
  {
    id: "xueliang-yang",
    name: "Xueliang Yang",
    role: "PhD Student",
    title: "Urban Data Scientist & Environmental Epidemiologist",
    category: "phd",
    avatar: avatarXueliang,
    bio: "Xueliang bridges quantitative analytics, environmental health, and health geography to identify how urban exposures impact population health disparities.",
    fullBio: "Xueliang Yang is an Urban Data Scientist and Environmental Epidemiologist currently pursuing his PhD in Social and Behavioral Sciences at New York University School of Global Public Health. With a unique interdisciplinary background spanning Mathematics with Finance (BSc) and Applied Urban Science and Informatics (MS), Xueliang bridges the gap between quantitative analytics, environmental health and health geography research.\n\nHis research investigates the dynamic interplay between the built environment, social structures, and human behavior. While his early work focused on urban stress, his current scholarship has expanded to examine broader environmental and social determinants of health. By integrating sensor technologies, geospatial data, and advanced computational methods, Xueliang seeks to identify how urban exposures impact population health disparities.\n\nAspiring to be a Data-Driven Health Geographer, Xueliang is dedicated to generating robust scientific evidence that advances our understanding of environmental justice and healthy urban systems.",
    research: ["Urban Data Science", "Environmental Epidemiology", "Health Geography", "Environmental Justice"],
    projects: [] 
  },
  {
    id: "isaiah-garnett", 
    name: "Isaiah Garnett", 
    role: "Graduate Researcher", 
    title: "M.S. Student in Urban Data Science",
    category: "master", 
    avatar: avatarIsaiah, 
    bio: "Isaiah's research sits at the intersection of urban environments and human physiology. As part of the biosensing project, he works on processing and analyzing EDA and BVP signals to examine how people respond to different urban settings in immersive VR environments.", 
    fullBio: "Isaiah's research sits at the intersection of urban environments and human physiology. As part of the biosensing project, he works on processing and analyzing EDA and BVP signals to examine how people respond to different urban settings in immersive VR environments. His broader interests include urban data science, mobility analytics, and applying machine learning to real-world city challenges.",
    research: ["Urban Informatics", "Biosensing", "Data Science"], 
    projects: ["virtual-therapy-urban-stress"]
  },
  {
    id: "ruolin-wu", 
    name: "Ruolin Wu", 
    role: "Graduate Researcher", 
    title: "Researcher Assistant", 
    category: "master", 
    avatar: avatarRuolin,
    bio: "Ruolin studies how people perceive and respond to urban change under uncertainty, using immersive, biosensing, and AI-based systems to support more informed and participatory decision-making.", 
    fullBio: "Ruolin's research lies at the intersection of Digital Civics, Human–Computer–Environment Interaction, and urban simulation. Her work examines how individuals and communities interpret and respond to complex urban transformations under conditions of uneven or uncertain information. She develops interactive and data-driven systems—including immersive virtual environments, biosensing approaches (e.g., EEG and EDA), and AI-mediated interfaces—to investigate how urban environments shape perception, cognition, and stress responses. Through this, her research aims to make civic and physiological data more interpretable and to support more informed and participatory urban decision-making.",
    website: "https://rolwu.me",
    research: ["Data Analytics", "Community Engagement", "VR"],
    publications: [
      { title: "CoDesignAI: An AI-Enabled Multi-Agent, Multi-User System for Collaborative Urban Design at the Conceptual Stage", venue: "arXiv", year: "2025" },
      { title: "A Multi-User and Multi-Agent Approach to Community Engagement", venue: "AAG Annual Meeting", year: "2026" }
    ], 
    projects: ["virtual-therapy-urban-stress", "CoDesignAI-collaborative-agent"]
  },
  {
    id: "shu-aspen-yang", 
    name: "Shu (Aspen) Yang", 
    role: "Graduate Researcher", 
    title: "Research Assistant", 
    category: "master", 
    avatar: avatarShu,
    bio: "Aspen bridges rigorous data science, machine learning, and spatial analytics. Her work focuses on time series forecasting, automated urban auditing via computer vision, and using causal inference to decode complex human-environment interactions.", 
    fullBio: "Shu (Aspen) Yang is an Urban Data Scientist and Machine Learning Engineer currently pursuing her M.S. at New York University’s Center for Urban Science and Progress (CUSP). With a unique interdisciplinary background spanning Graphic Design and advanced spatial analytics, Aspen excels at translating high-dimensional, multi-source data into impactful, evidence-based narratives.\n\nHer research sits at the intersection of deep learning, spatial modeling, and statistical imputation. Recent milestones include a Spotlight Presentation at NeurIPS 2025 for pioneering work in multivariate time series forecasting (the AMRC framework), and architecting automated urban audit systems using state-of-the-art vision-language models (YOLOv8, SegFormer, VLMs). From harmonizing 50 years of longitudinal spatial databases to designing robust causal inference frameworks (PSM, A/B Testing) for product strategy, Aspen is dedicated to building scalable AI pipelines that drive actionable and equitable urban insights.",
    website: "https://treeaspen.github.io/Portfolio/",
    research: ["Machine Learning", "Time Series", "Spatial Data Science", "Computer Vision"], 
    publications: [
      { title: "Abstain Mask Retain Core: Time Series Prediction by Adaptive Masking Loss", venue: "NeurIPS 2025", year: "2025", link: "https://arxiv.org/abs/2510.19980" }
    ],
    projects: ["virtual-therapy-urban-stress"]
  },
  {
    id: "sridevi-turaga",
    name: "Sridevi Turaga",
    role: "Graduate Researcher",
    title: "M.S. in Applied Urban Science & Informatics",
    category: "master",
    avatar: avatarSridevi,
    bio: "Develops AI systems focused on multi-agent architectures, multimodal data pipelines, and retrieval-augmented reasoning.",
    fullBio: "Develops AI systems focused on multi-agent architectures, multimodal data pipelines, and retrieval-augmented reasoning. Her work explores multi-agent systems using Microsoft AutoGen to simulate and evaluate conflict resolution dynamics. The research integrates adaptive mediator interventions and human-in-the-loop assessment to robustly analyze negotiation efficacy across qualitative metrics.",
    research: ["LLMs", "Multi-Agent Systems", "Agentic AI", "Human-AI Collaboration (HITL)"],
    publications: [
      { title: "CoDesignAI: An AI-Enabled Multi-Agent, Multi-User System for Collaborative Urban Design at the Conceptual Stage", venue: "arXiv", year: "2025" },
      { title: "Multi-Agent Large Language Models for Conflict Detection and Resolution in Group Dialogues", venue: "ICUA", year: "2026" }
    ],
    projects: ["CoDesignAI-collaborative-agent"]
  },
  {
    id: "steven-shi", 
    name: "Steven Shi",
    role: "Graduate Researcher",
    title: "Project Member",
    category: "master",
    avatar: avatarSteven, 
    bio: "Steven explores the potential of using LLMs to classify urban sound environments and support research on noise exposure and its implications for health.",
    fullBio: "The project Steven is currently working on is 'Detecting and Mapping of Soundscape using Large Language Model in New York City'. Urban noise is a common environmental exposure in cities and has been associated with various physical and mental health outcomes. As urban populations grow, understanding how people are exposed to different sources of noise in everyday environments has become increasingly important for environmental public health research. Traditional methods of assessing noise exposure often rely on sound meters or location-based estimates, which can be time-consuming and may not fully capture the complexity of real-world sound environments. Recent advances in generative artificial intelligence, particularly Large Language Models (LLMs), offer new possibilities for analyzing audio data and classifying noise sources more efficiently. This study explores the potential of using LLMs to classify urban sound environments and support research on noise exposure and its implications for health and well-being.",
    research: ["LLM", "Urban Sensing", "Soundscape"],
    projects: ["soundscape-llm-mapping"]
  },
  {
    id: "vincent-cao", 
    name: "Vincent (Fanghua) Cao",
    role: "Graduate Researcher",
    title: "ECE Master’s Student",
    category: "master", 
    avatar: avatarVincent, 
    bio: "Vincent holds a technical background in V2X systems and LLM Fine-Tuning.",
    fullBio: "Vincent (Fanghua) Cao is an ECE Master’s student at the University of Florida, advised by Dr. Zhaoxi Zhang. He holds a technical background in V2X (Vehicle-to-Everything) systems and hardware integration, with extensive experience in the Supervised Fine-Tuning (SFT) and comprehensive evaluation of Large Language Models (LLMs). His research interests focus on using multimodal AI to analyze and diagnose complex urban environments.",
    research: ["LLM Fine-Tuning", "V2X Systems", "Multimodal AI"],
    projects: ["soundscape-llm-mapping"]
  }
];