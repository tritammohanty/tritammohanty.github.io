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
      "A conversational AI prototype for students and children, built through AI-assisted development. Combines a Mistral-7B / QLoRA pipeline with emotion-aware prompting, conversational memory, response filtering, and a chat interface. The repository includes preprocessing, training, evaluation, and ablation workflows.",
  },
  "neetcode-gpt": {
    title: "GPT, from the building blocks",
    category: "Applied AI",
    description: "Exploring how language models work by implementing the transformer architecture.",
    tags: ["Transformers", "Self-attention", "Python"],
    detail:
      "Implemented self-attention, multi-head attention, embeddings, positional encoding, and normalization. Assembled the GPT implementation from individual ML course submissions, with supporting tokenization and neural network foundations.",
  },
  AutomaticTicketClassification: {
    title: "Making sense of customer complaints",
    category: "Machine learning",
    description:
      "An NLP workflow that organizes financial complaints into product and service categories.",
    tags: ["NLP", "Topic modelling", "scikit-learn"],
    detail:
      "Combined text preprocessing and topic modelling with comparisons of logistic regression, Naive Bayes, decision tree, and random forest classifiers.",
  },
  StyleTransferGAN: {
    title: "MRI image translation",
    category: "Computer vision",
    description: "Exploring translation between T1- and T2-weighted MRI images with CycleGAN.",
    tags: ["CycleGAN", "Image translation"],
    detail:
      "A generative image translation project exploring conversion between T1- and T2-weighted MRI images. Includes image preprocessing, model experimentation, and generated-image comparison. An experimental project, not a clinical tool.",
  },
  GestureRecognition: {
    title: "Understanding gestures in video",
    category: "Computer vision",
    description: "Comparing convolutional and recurrent approaches to recognize five gestures.",
    tags: ["3D CNN", "Video classification"],
    detail:
      "Experimented with 3D convolutional, convolutional-recurrent, and transfer-learning approaches. Compared preprocessing, augmentation, dropout, and normalization choices.",
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

export const experience = [
  {
    role: "Marketing Data Analyst",
    company: "Sumeru Inc",
    period: "Jun 2026 - Present",
    description:
      "Turning customer journeys and engagement data into clearer business decisions. Complex SQL, program reporting, and analytics planning for a Tableau customer dashboard.",
  },
  {
    role: "Senior Salesforce Developer",
    company: "Sumeru Inc",
    period: "Jun 2025 - May 2026",
    description:
      "Built on a foundation of enterprise customer systems, technical design, and automated engagement journeys.",
  },
  {
    role: "Salesforce Developer",
    company: "Sumeru Inc",
    period: "Jan 2023 - May 2025",
    description:
      "Worked across journey development, SQL, personalization, data validation, and deployment checks.",
  },
  {
    role: "Junior Analyst",
    company: "Sumeru Inc",
    period: "Jun - Dec 2022",
    description:
      "Started in analytics, developing the data and systems foundation that continues to shape my AI work.",
  },
];
export const education = [
  {
    school: "Liverpool John Moores University",
    programme: "MSc, Machine Learning and Artificial Intelligence",
  },
  {
    school: "IIIT Bangalore",
    programme: "Executive Post Graduate Programme, Machine Learning and Artificial Intelligence",
  },
  { school: "Sri Sri University", programme: "BSc, Data Science" },
];
