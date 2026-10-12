export const profile = {
  name: "Tritam Mohanty",
  username: "tritammohanty",
  email: "tritammohanty1801@gmail.com",
  github: "https://github.com/tritammohanty",
  linkedin: "https://linkedin.com/in/tritammohanty",
  portfolioSource:
    "https://github.com/tritammohanty/tritammohanty.github.io/tree/feat/portfolio-redesign",
  portrait: {
    src: "/tritam.jpg",
    alt: "Tritam's illustrated GitHub profile portrait",
    width: 400,
    height: 400,
    position: "50% 42%",
  },
};

export const biography = {
  role: "AI Engineer & Generalist",
  introduction:
    "I build conversational AI, agents, and automation, connecting models to tools and turning ideas into applications.",
  portraitCaption:
    "4+ years across data, analytics, and customer engagement systems. Bringing that perspective to applied AI.",
  aboutLead: "I like a good 'what if?' and the part where we find out.",
  about: [
    "That curiosity drew me to data science. I wanted a field that would keep changing and give me things to build. It took me from exploring data to machine learning, and now to conversational AI, agents, and automation.",
    "I enjoy getting into the mechanics: how transformers work, how language models can be fine-tuned, and how memory and context shape a response. I like tracing a problem back to its source and understanding how the pieces work together.",
    "I'm a Data Science graduate and batch gold medallist, with an MSc in Machine Learning and Artificial Intelligence.",
  ],
  highlightedSkills: ["Generative AI", "AI Agents", "Machine Learning", "Python", "Data Analysis"],
  capabilities: {
    ai: "Python, PyTorch, TensorFlow, scikit-learn, deep learning, NLP, computer vision, LLM fine-tuning, and model evaluation.",
    systems:
      "n8n, workflow automation, Model Context Protocol (MCP), conversational memory, and tool-connected assistants. Built workflows for executive assistance, customer support triage, and email actions.",
    analytics:
      "Complex SQL, customer analytics, segmentation, Excel, Tableau dashboard planning, Power BI, Salesforce Marketing Cloud, technical documentation, and client presentations.",
  },
};

export type Category = "Applied AI" | "Machine learning" | "Computer vision" | "Other";
export type ProjectNote = {
  title: string;
  category: Category;
  description: string;
  tags: string[];
  detail: string;
};
export const projectNotes: Record<string, ProjectNote> = {
  CompanionAI: {
    title: "CompanionAI",
    category: "Applied AI",
    description:
      "A conversational companion built around context, memory, and emotion-aware responses.",
    tags: ["Mistral-7B", "QLoRA", "Conversational AI"],
    detail:
      "My MSc thesis research prototype, developed through AI-assisted development. Combines Mistral-7B / QLoRA fine-tuning with an adapted Empathetic Dialogues dataset, emotion classification, and semantic, entity, and timeline memory. A memory view shows how remembered context influences a response. Input/output filtering and response constraints address unsafe guidance and emotional dependency. Evaluated through NLP metrics and role-play scenarios for coherence, emotional alignment, diversity, and safety.",
  },
  "neetcode-gpt": {
    title: "GPT, from the building blocks",
    category: "Applied AI",
    description: "Exploring how language models work by implementing the transformer architecture.",
    tags: ["Transformers", "Self-attention", "Python"],
    detail:
      "Assembled a GPT implementation from my NeetCode ML course submissions to understand language models below the API layer. Implemented attention, multi-head attention, transformer blocks, embeddings, positional encoding, and normalization. Worked with tokenization, KV caching, and grouped-query attention, building on backpropagation and MLP foundations.",
  },
  AutomaticTicketClassification: {
    title: "Making sense of customer complaints",
    category: "Machine learning",
    description:
      "An NLP workflow that organizes financial complaints into product and service categories.",
    tags: ["NLP", "Topic modelling", "scikit-learn"],
    detail:
      "Cleaned and explored 78,313 financial customer complaints using lemmatization, part-of-speech tagging, and n-gram analysis. Topic modelling identified five complaint groups for classification. Compared logistic regression, Naive Bayes, decision tree, and random forest models; logistic regression performed best in the project comparison. The work explores how text classification can support routing complaints to the appropriate team.",
  },
  StyleTransferGAN: {
    title: "MRI image translation",
    category: "Computer vision",
    description: "Exploring translation between T1- and T2-weighted MRI images with CycleGAN.",
    tags: ["CycleGAN", "Image translation"],
    detail:
      "A capstone project exploring translation between T1- and T2-weighted MRI images. Prepared MRI data and experimented with a CycleGAN pipeline and modified U-Net generator, comparing generated images with source scans. Built with TensorFlow and image-processing tools. An experimental project, not a clinical tool.",
  },
  GestureRecognition: {
    title: "Understanding gestures in video",
    category: "Computer vision",
    description: "Comparing convolutional and recurrent approaches to recognize five gestures.",
    tags: ["3D CNN", "Video classification"],
    detail:
      "Recognized five gestures mapped to smart-TV commands: volume up/down, skip forward/backward, and pause. Prepared clips as sequences of 30 frames with augmentation and normalization. Compared Conv3D, Conv2D with GRU/LSTM, and MobileNet approaches. Examined overfitting through dropout and architecture changes; transfer learning was strongest in the project experiments.",
  },
  MelanomaDetection: {
    title: "Skin lesion classification",
    category: "Computer vision",
    description: "Eleven CNN configurations, with a focus on regularization and overfitting.",
    tags: ["CNN", "Model comparison"],
    detail:
      "Developed multiclass CNN experiments on skin lesion images. Explored deeper architectures, augmentation, normalization, and regularization while examining overfitting. Educational experimentation, not a diagnostic service.",
  },
};

export const connectedProjects = [
  {
    id: "jerry",
    title: "Jerry",
    subtitle: "Multi-agent executive assistant",
    summary: "Email, calendar, and meeting tasks in one conversation.",
    detail:
      "Built a coordinating agent in n8n that routes requests to specialist agents connected to email, calendar, and meeting tools. It brings email and calendar actions together with retrieval of meeting summaries and action items, exploring how conversational requests can become external actions.",
    tags: ["AI Agents", "n8n", "Workflow Automation"],
  },
  {
    id: "support-triage",
    title: "Customer Support Triage",
    subtitle: "AI agent & web application",
    summary: "From a customer query to urgency assessment and follow-up.",
    detail:
      "Built an n8n agent workflow to read customer queries, assess urgency, and route urgent issues for team attention. Connected email acknowledgements and escalation, with a Lovable interface linked through webhooks to carry a submitted query through to a response.",
    tags: ["AI Agents", "n8n", "Webhooks"],
  },
  {
    id: "email-mcp",
    title: "Email MCP Server",
    subtitle: "Conversational tool integration",
    summary: "Connecting an AI assistant to email actions through MCP.",
    detail:
      "Built a simple Model Context Protocol server in n8n that exposes email capabilities to an AI assistant. Connected conversational requests to external email tools, exploring the interface between an AI model, its tools, and the service carrying out a request.",
    tags: ["MCP", "n8n", "Tool Integration"],
  },
  {
    id: "air-quality",
    title: "Air Quality Monitoring",
    subtitle: "IoT, cloud data & visualization",
    summary: "Sensor readings made useful through live measurements and trends.",
    detail:
      "Developed a low-cost air-quality monitoring system with my project team, motivated by accessible monitoring in Odisha. Collected PM10, PM2.5, carbon monoxide, and ammonia measurements, stored readings in Firebase in real time, and built a Dash application with Plotly charts to show measurements and pollutant trends.",
    tags: ["IoT", "Python", "Dash & Plotly"],
  },
];

export const experience = [
  {
    role: "Data Analyst - Customer & Marketing Analytics",
    company: "Sumeru Inc",
    period: "Dec 2025 - Present",
    description:
      "Own data sourcing and complex SQL for recurring and ad hoc client reporting. Analyse customer journeys and channel performance, lead Tableau dashboard ideation and data-flow planning, and present findings and recommendations to clients.",
  },
  {
    role: "Senior Salesforce Developer",
    company: "Sumeru Inc",
    period: "Dec 2024 - Nov 2025",
    description:
      "Delivered email and SMS campaigns from technical design through launch. Redesigned customer journeys and personalization, analysed engagement, led backend QA and client UAT, and kept technical designs and release documentation aligned.",
  },
  {
    role: "Salesforce Developer",
    company: "Sumeru Inc",
    period: "Dec 2022 - Nov 2024",
    description:
      "Developed Salesforce Marketing Cloud journeys, SQL audience queries, and AMPscript personalization. Automated audience preparation and data exchange, built engagement reports, and resolved campaign logic through QA and deployment checks.",
  },
  {
    role: "Data Analyst Intern",
    company: "Sumeru Inc",
    period: "Jun - Nov 2022",
    description:
      "Prepared and manipulated data for internal analytical case studies, documenting findings and the work behind them for the team to review.",
  },
  {
    role: "Virtual Internship",
    company: "Trainity",
    period: "Jun - Oct 2021",
    description:
      "Completed IMDb, credit analysis, and loan prediction case studies using Excel, SQL, and Python, from data preparation and exploration to written findings.",
  },
];
export const education = [
  {
    school: "Liverpool John Moores University",
    programme: "MSc, Machine Learning and Artificial Intelligence",
    period: "Dec 2023 - Jun 2026",
    recognition: "Completed. CompanionAI MSc thesis, built and evaluated while working full-time.",
  },
  {
    school: "IIIT Bangalore",
    programme: "Executive Post Graduate Programme, Machine Learning and Artificial Intelligence",
    period: "Dec 2023 - Feb 2025",
    recognition: "CGPA 3.74/4.00, Excellent. Statistics, ML, deep learning, NLP, and MLOps.",
  },
  {
    school: "Sri Sri University",
    programme: "BSc, Data Science",
    period: "2019 - 2022",
    recognition: "Batch gold medallist, 90.91%. Student President of the IT Club.",
  },
];
