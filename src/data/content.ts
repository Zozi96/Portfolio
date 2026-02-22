interface ProjectMetric {
  label: string;
  value: string;
  live?: "pypi_version" | "github_stars";
}

interface ProjectItem {
  title: string;
  category: string;
  description: string;
  metrics: ProjectMetric[];
  stack: string[];
  liveStats?: {
    pypi?: string;
    github?: string;
  };
}

interface FocusArea {
  title: string;
  description: string;
}

interface ExperienceRole {
  title: string;
  company: string;
  period: string;
  description: string[];
}

interface TechStackCategory {
  name: string;
  items: string[];
}

interface Content {
  [key: string]: unknown;
  seo: {
    title: string;
    description: string;
    keywords: string;
    author: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    home: string;
    focus: string;
    projects: string;
    personal: string;
    stack: string;
    experience: string;
    contact: string;
  };
  hero: {
    badge: string;
    name: string;
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
    cta3: string;
  };
  focus: {
    title: string;
    areas: FocusArea[];
  };
  projects: {
    title: string;
    items: ProjectItem[];
  };
  personalProjects: {
    title: string;
    items: ProjectItem[];
  };
  techStack: {
    title: string;
    categories: TechStackCategory[];
  };
  experience: {
    title: string;
    roles: ExperienceRole[];
  };
  contact: {
    title: string;
    nameLabel: string;
    emailLabel: string;
    typeLabel: string;
    subjectLabel: string;
    messageLabel: string;
    sendButton: string;
    sending: string;
    success: string;
    error: string;
    types: {
      project: string;
      job: string;
      consultancy: string;
      other: string;
    };
  };
  footer: {
    contact: string;
    email: string;
    github: string;
    linkedin: string;
    rights: string;
  };
}

interface LocalizedContent {
  en: Content;
  es: Content;
}

export const content: LocalizedContent = {
  en: {
    seo: {
      title: "Zozimo Fernández | Senior Software Engineer",
      description:
        "Senior Software Engineer specializing in distributed systems, Python (Django, FastAPI, Litestar), .NET (C#), and cloud architecture. Building clean, scalable solutions for international clients.",
      keywords:
        "Software Engineer, Full-Stack Developer, Python, Django, FastAPI, .NET, C#, AWS, Cloud Architecture, React, TypeScript",
      author: "Zozimo Fernández",
      ogTitle: "Zozimo Fernández - Senior Software Engineer Portfolio",
      ogDescription:
        "Experienced Software Engineer specializing in distributed systems, the Python ecosystem, and .NET development. Expert in building scalable cloud solutions.",
    },
    nav: {
      home: "Home",
      focus: "Focus Areas",
      projects: "Projects",
      personal: "Personal",
      stack: "Tech Stack",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      badge: "Open to interesting proposals",
      name: "Zozimo Fernández",
      title: "Senior Software Engineer",
      subtitle:
        "Senior Software Engineer specializing in distributed systems, Python ecosystem (Django, FastAPI, Litestar), .NET (C#), and cloud architecture. Building clean, scalable solutions following SOLID principles for international clients.",
      cta1: "View Projects",
      cta2: "GitHub Profile",
      cta3: "Download CV",
    },
    focus: {
      title: "Core Focus Areas",
      areas: [
        {
          title: "Distributed Systems & Architecture",
          description:
            "Expertise in designing scalable architectures using Python (Django, FastAPI, Litestar), .NET (C#, ASP.NET Core), and modern technologies for robust enterprise solutions.",
        },
        {
          title: "Data Engineering",
          description:
            "Designing and executing ETL pipelines with Python, PySpark, and AWS Glue for processing large-scale data from heterogeneous sources",
        },
        {
          title: "Cloud Architecture",
          description:
            "Infrastructure management on AWS (EC2, RDS, Glue) and deployment with Docker, ensuring scalability and reliability",
        },
      ],
    },
    projects: {
      title: "Client Projects",
      items: [
        {
          title: "Advanta Health Platform",
          category: ".NET Development",
          description:
            "Enterprise healthcare platform with multiple microservices built in C# and ASP.NET. Implemented modern UI with Blazor and managed Windows Server infrastructure with SQL Server databases.",
          metrics: [
            { label: "Microservices", value: "12+" },
            { label: "Tech Stack", value: ".NET/C#" },
            { label: "Infrastructure", value: "Windows Server" },
          ],
          stack: [
            "C#",
            "ASP.NET Core",
            "Blazor",
            "SQL Server",
            "Windows Server",
          ],
        },
        {
          title: "Wag Hotels Backend",
          category: "Python Development",
          description:
            "Scalable backend services for pet hotel management using Django. Managed AWS cloud infrastructure and MySQL databases with Docker for consistent deployment.",
          metrics: [
            { label: "Framework", value: "Django" },
            { label: "Database", value: "MySQL" },
            { label: "Cloud", value: "AWS" },
          ],
          stack: ["Python", "Django", "MySQL", "Docker", "AWS"],
        },
        {
          title: "Bob Finance Data Pipeline",
          category: "Data Engineering",
          description:
            "ETL pipelines on AWS Glue using Python and PySpark to ingest and transform large data volumes from multiple formats (Parquet, CSV) with optimized performance.",
          metrics: [
            { label: "Technology", value: "AWS Glue" },
            { label: "Processing", value: "PySpark" },
            { label: "Data Formats", value: "Parquet/CSV" },
          ],
          stack: ["Python", "PySpark", "AWS Glue", "Parquet", "ETL"],
        },
      ],
    },
    personalProjects: {
      title: "Personal Projects",
      items: [
        {
          title: "hash-forge",
          category: "Open Source Library",
          description:
            "Lightweight Python library for hashing and verifying data using 10+ secure algorithms (bcrypt, Argon2, PBKDF2, Blake2/3, Scrypt and more). Features async/await support, builder pattern, batch processing, and configuration management.",
          metrics: [
            { label: "Algorithms", value: "10+" },
            { label: "Version", value: "—", live: "pypi_version" as const },
            { label: "Stars", value: "—", live: "github_stars" as const },
          ],
          stack: ["Python", "asyncio", "bcrypt", "Argon2", "PBKDF2"],
          liveStats: { pypi: "hash-forge", github: "Zozi96/hash-forge" },
        },
      ],
    },
    techStack: {
      title: "Technology Stack",
      categories: [
        {
          name: "Languages",
          items: ["Python", "C#", "TypeScript", "JavaScript", "SQL"],
        },
        {
          name: "Frameworks",
          items: [
            "Django",
            "FastAPI",
            "Litestar",
            "Flask",
            "ASP.NET Core",
            "Blazor",
          ],
        },
        {
          name: "Databases",
          items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "PostGIS"],
        },
        {
          name: "Cloud & DevOps",
          items: ["AWS (Glue, EC2, RDS)", "Docker", "Git", "Windows Server"],
        },
      ],
    },
    experience: {
      title: "Professional Experience",
      roles: [
        {
          title: "Senior Software Engineer",
          company: "ArkusNexus",
          period: "March 2023 - Present",
          description: [
            "Lead the architectural design and development of distributed microservices for Advanta Health, ensuring high availability and fault tolerance using .NET Core.",
            "Spearheaded the modernization of the Wag Hotels (mywag) legacy platform by migrating the infrastructure to a Kubernetes-based cloud architecture, significantly improving system stability.",
            "Optimized core backend performance by refactoring complex database queries, drastically reducing execution times and improving overall application speed.",
            "Architected and implemented massive data ingestion pipelines for the Bob Finance project using AWS Glue and PySpark, efficiently processing large-scale datasets from Amazon Redshift and Google BigQuery.",
          ],
        },
        {
          title: "Python Developer",
          company: "Adinfi",
          period: "April 2022 - March 2023",
          description: [
            "Engineered the core backend for ADContent, a digital asset management system, utilizing Django REST Framework for robust API delivery.",
            "Designed an isolated, high-performance database architecture specifically for a new invoice processing portal, decoupling it from the main application to ensure scalability.",
            "Improved overall system performance and response times by implementing advanced indexing strategies and comprehensive query tuning across high-traffic MySQL and SQL Server clusters.",
            "Spearheaded the containerization initiative using Docker, standardizing development environments and streamlining CI/CD pipelines.",
          ],
        },
        {
          title: "Python Engineer (Tech Lead)",
          company: "mediQó",
          period: "December 2021 - May 2023",
          description: [
            "Directed the technical strategy and development lifecycle for a HealthTech platform, leading a team of developers to deliver critical features.",
            "Implemented complex geospatial algorithms using PostGIS to optimize provider matching and location-based services.",
            "Conducted rigorous code reviews and performance profiling to eliminate bottlenecks and ensure code quality standards.",
            "Architected scalable RESTful APIs that supported rapid user growth and third-party integrations.",
          ],
        },
        {
          title: "Python Developer",
          company: "XID - Digital Services",
          period: "June 2021 - December 2021",
          description: [
            "Contributed to the core booking engine for Palace Resorts, implementing high-availability REST services with Flask.",
            "Refactored legacy codebases to improve maintainability and performance, reducing technical debt significantly.",
            "Collaborated with cross-functional teams to design and integrate complex API endpoints for the reservation system.",
            "Enhanced system stability through rigorous integration testing and error handling improvements.",
          ],
        },
        {
          title: "Software Developer",
          company: "Binary Systems",
          period: "August 2020 - July 2021",
          description: [
            "Developed a custom CRM solution tailored for real estate operations using Django and PostgreSQL, automating key business processes.",
            "Resolved critical production issues and implemented feature enhancements to improve user workflow and data accuracy.",
            "Optimized ORM queries to handle complex data relationships efficiently, improving application response times.",
            "Delivered robust software solutions by strictly adhering to agile methodologies and iterative development cycles.",
          ],
        },
      ],
    },
    contact: {
      title: "Contact Me",
      nameLabel: "Full Name",
      emailLabel: "Corporate/Personal Email",
      typeLabel: "Inquiry Type",
      subjectLabel: "Subject",
      messageLabel: "Message",
      sendButton: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Error sending message. Please try again.",
      types: {
        project: "Project Proposal (Freelance)",
        job: "Job Opportunity (Full-time)",
        consultancy: "Consultancy",
        other: "Other",
      },
    },
    footer: {
      contact: "Get in Touch",
      email: "zozi.fer96@gmail.com",
      github: "github.com/Zozi96",
      linkedin: "linkedin.com/in/zozi",
      rights: "All rights reserved",
    },
  },
  es: {
    seo: {
      title: "Zozimo Fernández | Ingeniero de Software Senior",
      description:
        "Ingeniero de Software Senior especializado en sistemas distribuidos, Python (Django, FastAPI, Litestar), .NET (C#) y arquitectura en la nube. Construyendo soluciones limpias y escalables para clientes internacionales.",
      keywords:
        "Ingeniero de Software, Desarrollador Full-Stack, Python, Django, FastAPI, .NET, C#, AWS, Arquitectura en la Nube, React, TypeScript",
      author: "Zozimo Fernández",
      ogTitle: "Zozimo Fernández - Portfolio Ingeniero de Software Senior",
      ogDescription:
        "Ingeniero de Software experimentado especializado en sistemas distribuidos, el ecosistema Python y desarrollo .NET. Experto en construcción de soluciones escalables en la nube.",
    },
    nav: {
      home: "Inicio",
      focus: "Áreas de Enfoque",
      projects: "Proyectos",
      personal: "Personal",
      stack: "Stack Tecnológico",
      experience: "Experiencia",
      contact: "Contacto",
    },
    hero: {
      badge: "Abierto a escuchar propuestas interesantes",
      name: "Zozimo Fernández",
      title: "Ingeniero de Software Senior",
      subtitle:
        "Ingeniero de Software Senior especializado en sistemas distribuidos, el ecosistema Python (Django, FastAPI, Litestar), .NET (C#) y arquitectura en la nube. Construyendo soluciones limpias y escalables siguiendo principios SOLID para clientes internacionales.",
      cta1: "Ver Proyectos",
      cta2: "Perfil GitHub",
      cta3: "Descargar CV",
    },
    focus: {
      title: "Áreas de Enfoque Principales",
      areas: [
        {
          title: "Sistemas Distribuidos y Arquitectura",
          description:
            "Experiencia en el diseño de arquitecturas escalables usando Python (Django, FastAPI, Litestar), .NET (C#, ASP.NET Core) y tecnologías modernas para soluciones empresariales robustas.",
        },
        {
          title: "Ingeniería de Datos",
          description:
            "Diseñando y ejecutando pipelines ETL con Python, PySpark y AWS Glue para procesar grandes volúmenes de datos de fuentes heterogéneas",
        },
        {
          title: "Arquitectura en la Nube",
          description:
            "Gestión de infraestructura en AWS (EC2, RDS, Glue) y despliegue con Docker, garantizando escalabilidad y confiabilidad",
        },
      ],
    },
    projects: {
      title: "Proyectos de Clientes",
      items: [
        {
          title: "Plataforma Advanta Health",
          category: "Desarrollo .NET",
          description:
            "Plataforma empresarial de salud con múltiples microservicios construidos en C# y ASP.NET. Implementé UI moderna con Blazor y gestioné infraestructura Windows Server con bases de datos SQL Server.",
          metrics: [
            { label: "Microservicios", value: "12+" },
            { label: "Stack Técnico", value: ".NET/C#" },
            { label: "Infraestructura", value: "Windows Server" },
          ],
          stack: [
            "C#",
            "ASP.NET Core",
            "Blazor",
            "SQL Server",
            "Windows Server",
          ],
        },
        {
          title: "Backend Wag Hotels",
          category: "Desarrollo Python",
          description:
            "Servicios backend escalables para gestión de hoteles de mascotas usando Django. Gestioné infraestructura en la nube AWS y bases de datos MySQL con Docker para despliegue consistente.",
          metrics: [
            { label: "Framework", value: "Django" },
            { label: "Base de Datos", value: "MySQL" },
            { label: "Nube", value: "AWS" },
          ],
          stack: ["Python", "Django", "MySQL", "Docker", "AWS"],
        },
        {
          title: "Pipeline de Datos Bob Finance",
          category: "Ingeniería de Datos",
          description:
            "Pipelines ETL en AWS Glue usando Python y PySpark para ingerir y transformar grandes volúmenes de datos de múltiples formatos (Parquet, CSV) con rendimiento optimizado.",
          metrics: [
            { label: "Tecnología", value: "AWS Glue" },
            { label: "Procesamiento", value: "PySpark" },
            { label: "Formatos de Datos", value: "Parquet/CSV" },
          ],
          stack: ["Python", "PySpark", "AWS Glue", "Parquet", "ETL"],
        },
      ],
    },
    personalProjects: {
      title: "Proyectos Personales",
      items: [
        {
          title: "hash-forge",
          category: "Librería Open Source",
          description:
            "Librería Python ligera para hashing y verificación de datos con más de 10 algoritmos seguros (bcrypt, Argon2, PBKDF2, Blake2/3, Scrypt y más). Incluye soporte async/await, patrón builder, operaciones en lote y gestión de configuración.",
          metrics: [
            { label: "Algoritmos", value: "10+" },
            { label: "Versión", value: "—", live: "pypi_version" as const },
            { label: "Estrellas", value: "—", live: "github_stars" as const },
          ],
          stack: ["Python", "asyncio", "bcrypt", "Argon2", "PBKDF2"],
          liveStats: { pypi: "hash-forge", github: "Zozi96/hash-forge" },
        },
      ],
    },
    techStack: {
      title: "Stack Tecnológico",
      categories: [
        {
          name: "Lenguajes",
          items: ["Python", "C#", "TypeScript", "JavaScript", "SQL"],
        },
        {
          name: "Frameworks",
          items: [
            "Django",
            "FastAPI",
            "Litestar",
            "Flask",
            "ASP.NET Core",
            "Blazor",
          ],
        },
        {
          name: "Bases de Datos",
          items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "PostGIS"],
        },
        {
          name: "Nube y DevOps",
          items: ["AWS (Glue, EC2, RDS)", "Docker", "Git", "Windows Server"],
        },
      ],
    },
    experience: {
      title: "Experiencia Profesional",
      roles: [
        {
          title: "Ingeniero de Software Senior",
          company: "ArkusNexus",
          period: "Marzo 2023 - Presente",
          description: [
            "Lidero el diseño arquitectónico y desarrollo de microservicios distribuidos para Advanta Health, asegurando alta disponibilidad utilizando .NET Core.",
            "Dirigí la modernización de la plataforma legacy de Wag Hotels (mywag) migrando la infraestructura a una arquitectura cloud basada en Kubernetes, mejorando significativamente la estabilidad del sistema.",
            "Optimicé el rendimiento crítico del backend mediante la refactorización de consultas complejas de base de datos, reduciendo drásticamente los tiempos de ejecución y la velocidad general de la aplicación.",
            "Arquitecté e implementé pipelines de ingesta masiva de datos para el proyecto Bob Finance usando AWS Glue y PySpark, procesando eficientemente datasets a gran escala desde Amazon Redshift y Google BigQuery.",
          ],
        },
        {
          title: "Desarrollador Python",
          company: "Adinfi",
          period: "Abril 2022 - Marzo 2023",
          description: [
            "Ingenié el backend principal para ADContent, un sistema de gestión de activos digitales, utilizando Django REST Framework para APIs robustas.",
            "Diseñé una arquitectura de base de datos aislada y de alto rendimiento específicamente para un nuevo portal de procesamiento de facturas, desacoplándola de la aplicación principal para garantizar su escalabilidad.",
            "Mejoré el rendimiento general del sistema y los tiempos de respuesta implementando estrategias avanzadas de indexación y optimización exhaustiva de consultas en clústeres de alto tráfico.",
            "Encabecé la iniciativa de contenerización usando Docker, estandarizando entornos de desarrollo y agilizando pipelines de CI/CD.",
          ],
        },
        {
          title: "Ingeniero Python (Líder Técnico)",
          company: "mediQó",
          period: "Diciembre 2021 - Mayo 2023",
          description: [
            "Dirigí la estrategia técnica y el ciclo de vida de desarrollo para una plataforma HealthTech, liderando al equipo para entregar funcionalidades críticas.",
            "Implementé algoritmos geoespaciales complejos usando PostGIS para optimizar la asignación de proveedores y servicios basados en ubicación.",
            "Realicé revisiones de código rigurosas y perfilado de rendimiento para eliminar cuellos de botella y asegurar estándares de calidad.",
            "Arquitecté APIs RESTful escalables que soportaron un rápido crecimiento de usuarios e integraciones con terceros.",
          ],
        },
        {
          title: "Desarrollador Python",
          company: "XID - Digital Services",
          period: "Junio 2021 - Diciembre 2021",
          description: [
            "Contribuí al motor de reservas central para Palace Resorts, implementando servicios REST de alta disponibilidad con Flask.",
            "Refactoricé bases de código heredadas para mejorar la mantenibilidad y el rendimiento, reduciendo significativamente la deuda técnica.",
            "Colaboré con equipos multifuncionales para diseñar e integrar endpoints de API complejos para el sistema de reservaciones.",
            "Aumenté la estabilidad del sistema mediante pruebas de integración rigurosas y mejoras en el manejo de errores.",
          ],
        },
        {
          title: "Desarrollador de Software",
          company: "Binary Systems",
          period: "Agosto 2020 - Julio 2021",
          description: [
            "Desarrollé una solución CRM personalizada para operaciones inmobiliarias usando Django y PostgreSQL, automatizando procesos clave de negocio.",
            "Resolví incidencias críticas en producción e implementé mejoras funcionales para optimizar el flujo de trabajo de los usuarios.",
            "Optimicé consultas ORM para manejar relaciones de datos complejas de manera eficiente, mejorando los tiempos de respuesta.",
            "Entregué soluciones de software robustas adhiriéndome estrictamente a metodologías ágiles y ciclos de desarrollo iterativos.",
          ],
        },
      ],
    },
    contact: {
      title: "Contáctame",
      nameLabel: "Nombre Completo",
      emailLabel: "Email Corporativo/Personal",
      typeLabel: "Tipo de Consulta",
      subjectLabel: "Asunto",
      messageLabel: "Mensaje",
      sendButton: "Enviar Mensaje",
      sending: "Enviando...",
      success: "¡Mensaje enviado con éxito!",
      error: "Error al enviar el mensaje. Inténtalo de nuevo.",
      types: {
        project: "Propuesta de Proyecto (Freelance)",
        job: "Oportunidad Laboral (Full-time)",
        consultancy: "Consultoría",
        other: "Otro",
      },
    },
    footer: {
      contact: "Contacto",
      email: "zozi.fer96@gmail.com",
      github: "github.com/Zozi96",
      linkedin: "linkedin.com/in/zozi",
      rights: "Todos los derechos reservados",
    },
  },
};

