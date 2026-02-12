export const content = {
  en: {
    nav: {
      home: "Home",
      focus: "Focus Areas",
      projects: "Projects",
      stack: "Tech Stack",
      experience: "Experience"
    },
    hero: {
      title: "Senior Software Engineer",
      subtitle: "Full-stack engineer specializing in Python ecosystem (Django, FastAPI, Litestar), .NET (C#), and cloud architecture. Building clean, scalable solutions following SOLID principles for international clients.",
      cta1: "View Projects",
      cta2: "GitHub Profile"
    },
    focus: {
      title: "Core Focus Areas",
      areas: [
        {
          title: "Full-Stack Development",
          description: "Expertise in Python (Django, FastAPI, Litestar, Flask), .NET (C#, ASP.NET Core, Blazor), and modern frontend technologies for building complete solutions"
        },
        {
          title: "Data Engineering",
          description: "Designing and executing ETL pipelines with Python, PySpark, and AWS Glue for processing large-scale data from heterogeneous sources"
        },
        {
          title: "Cloud Architecture",
          description: "Infrastructure management on AWS (EC2, RDS, Glue) and deployment with Docker, ensuring scalability and reliability"
        }
      ]
    },
    projects: {
      title: "Client Projects",
      items: [
        {
          title: "Advanta Health Platform",
          category: ".NET Development",
          description: "Enterprise healthcare platform with multiple microservices built in C# and ASP.NET. Implemented modern UI with Blazor and managed Windows Server infrastructure with SQL Server databases.",
          metrics: [
            { label: "Microservices", value: "12+" },
            { label: "Tech Stack", value: ".NET/C#" },
            { label: "Infrastructure", value: "Windows Server" }
          ],
          stack: ["C#", "ASP.NET Core", "Blazor", "SQL Server", "Windows Server"]
        },
        {
          title: "Wag Hotels Backend",
          category: "Python Development",
          description: "Scalable backend services for pet hotel management using Django. Managed AWS cloud infrastructure and MySQL databases with Docker for consistent deployment.",
          metrics: [
            { label: "Framework", value: "Django" },
            { label: "Database", value: "MySQL" },
            { label: "Cloud", value: "AWS" }
          ],
          stack: ["Python", "Django", "MySQL", "Docker", "AWS"]
        },
        {
          title: "Mosaic.tech Data Pipeline",
          category: "Data Engineering",
          description: "ETL pipelines on AWS Glue using Python and PySpark to ingest and transform large data volumes from multiple formats (Parquet, CSV) with optimized performance.",
          metrics: [
            { label: "Technology", value: "AWS Glue" },
            { label: "Processing", value: "PySpark" },
            { label: "Data Formats", value: "Parquet/CSV" }
          ],
          stack: ["Python", "PySpark", "AWS Glue", "Parquet", "ETL"]
        }
      ]
    },
    techStack: {
      title: "Technology Stack",
      categories: [
        {
          name: "Languages",
          items: ["Python", "C#", "TypeScript", "JavaScript", "SQL"]
        },
        {
          name: "Frameworks",
          items: ["Django", "FastAPI", "Litestar", "Flask", "ASP.NET Core", "Blazor"]
        },
        {
          name: "Databases",
          items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "PostGIS"]
        },
        {
          name: "Cloud & DevOps",
          items: ["AWS (Glue, EC2, RDS)", "Docker", "Git", "Windows Server"]
        }
      ]
    },
    experience: {
      title: "Professional Experience",
      roles: [
        {
          title: "Senior Software Engineer",
          company: "ArkusNexus",
          period: "March 2023 - Present",
          description: [
            "Developed and maintained microservices for Advanta Health using C# and ASP.NET Core",
            "Built modern UI with Blazor and managed Windows Server infrastructure with SQL Server",
            "Architected backend services for Wag Hotels using Python and Django on AWS",
            "Designed ETL pipelines with Python and PySpark on AWS Glue for Mosaic.tech"
          ]
        },
        {
          title: "Python Developer",
          company: "Adinfi",
          period: "April 2022 - March 2023",
          description: [
            "Developed ADContent system using Django REST Framework",
            "Integrated AWS-hosted databases (MySQL and SQL Server)",
            "Implemented microservices with Flask and dockerized projects",
            "Maintained and enhanced existing features with focus on reliability"
          ]
        },
        {
          title: "Python Engineer (Tech Lead)",
          company: "mediQó",
          period: "December 2021 - May 2023",
          description: [
            "Led development team for healthcare services platform",
            "Built RESTful APIs using Django REST Framework with PostgreSQL and PostGIS",
            "Performed requirements analysis and code profiling to optimize performance",
            "Implemented geolocation features using PostGIS extensions"
          ]
        },
        {
          title: "Python Developer",
          company: "XID - Digital Services",
          period: "June 2021 - December 2021",
          description: [
            "Participated in development of reservation engine for Palace Resorts",
            "Implemented REST services with Flask and SQLAlchemy as ORM",
            "Focused on improving usability and system stability",
            "Collaborated on API design and integration testing"
          ]
        },
        {
          title: "Software Developer",
          company: "Binary Systems",
          period: "August 2020 - July 2021",
          description: [
            "Developed real estate CRM using Django and PostgreSQL",
            "Debugged critical issues and implemented new features",
            "Enhanced system reliability and user experience",
            "Worked with Django ORM for complex database operations"
          ]
        }
      ]
    },
    footer: {
      contact: "Get in Touch",
      email: "zozi.fer96@gmail.com",
      github: "github.com/Zozi96",
      linkedin: "linkedin.com/in/zozi",
      rights: "All rights reserved"
    }
  },
  es: {
    nav: {
      home: "Inicio",
      focus: "Áreas de Enfoque",
      projects: "Proyectos",
      stack: "Stack Tecnológico",
      experience: "Experiencia"
    },
    hero: {
      title: "Ingeniero de Software Senior",
      subtitle: "Ingeniero full-stack especializado en el ecosistema Python (Django, FastAPI, Litestar), .NET (C#) y arquitectura en la nube. Construyendo soluciones limpias y escalables siguiendo principios SOLID para clientes internacionales.",
      cta1: "Ver Proyectos",
      cta2: "Perfil GitHub"
    },
    focus: {
      title: "Áreas de Enfoque Principales",
      areas: [
        {
          title: "Desarrollo Full-Stack",
          description: "Experiencia en Python (Django, FastAPI, Litestar, Flask), .NET (C#, ASP.NET Core, Blazor) y tecnologías frontend modernas para construir soluciones completas"
        },
        {
          title: "Ingeniería de Datos",
          description: "Diseñando y ejecutando pipelines ETL con Python, PySpark y AWS Glue para procesar grandes volúmenes de datos de fuentes heterogéneas"
        },
        {
          title: "Arquitectura en la Nube",
          description: "Gestión de infraestructura en AWS (EC2, RDS, Glue) y despliegue con Docker, garantizando escalabilidad y confiabilidad"
        }
      ]
    },
    projects: {
      title: "Proyectos de Clientes",
      items: [
        {
          title: "Plataforma Advanta Health",
          category: "Desarrollo .NET",
          description: "Plataforma empresarial de salud con múltiples microservicios construidos en C# y ASP.NET. Implementé UI moderna con Blazor y gestioné infraestructura Windows Server con bases de datos SQL Server.",
          metrics: [
            { label: "Microservicios", value: "12+" },
            { label: "Stack Técnico", value: ".NET/C#" },
            { label: "Infraestructura", value: "Windows Server" }
          ],
          stack: ["C#", "ASP.NET Core", "Blazor", "SQL Server", "Windows Server"]
        },
        {
          title: "Backend Wag Hotels",
          category: "Desarrollo Python",
          description: "Servicios backend escalables para gestión de hoteles de mascotas usando Django. Gestioné infraestructura en la nube AWS y bases de datos MySQL con Docker para despliegue consistente.",
          metrics: [
            { label: "Framework", value: "Django" },
            { label: "Base de Datos", value: "MySQL" },
            { label: "Nube", value: "AWS" }
          ],
          stack: ["Python", "Django", "MySQL", "Docker", "AWS"]
        },
        {
          title: "Pipeline de Datos Mosaic.tech",
          category: "Ingeniería de Datos",
          description: "Pipelines ETL en AWS Glue usando Python y PySpark para ingerir y transformar grandes volúmenes de datos de múltiples formatos (Parquet, CSV) con rendimiento optimizado.",
          metrics: [
            { label: "Tecnología", value: "AWS Glue" },
            { label: "Procesamiento", value: "PySpark" },
            { label: "Formatos de Datos", value: "Parquet/CSV" }
          ],
          stack: ["Python", "PySpark", "AWS Glue", "Parquet", "ETL"]
        }
      ]
    },
    techStack: {
      title: "Stack Tecnológico",
      categories: [
        {
          name: "Lenguajes",
          items: ["Python", "C#", "TypeScript", "JavaScript", "SQL"]
        },
        {
          name: "Frameworks",
          items: ["Django", "FastAPI", "Litestar", "Flask", "ASP.NET Core", "Blazor"]
        },
        {
          name: "Bases de Datos",
          items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "PostGIS"]
        },
        {
          name: "Nube y DevOps",
          items: ["AWS (Glue, EC2, RDS)", "Docker", "Git", "Windows Server"]
        }
      ]
    },
    experience: {
      title: "Experiencia Profesional",
      roles: [
        {
          title: "Ingeniero de Software Senior",
          company: "ArkusNexus",
          period: "Marzo 2023 - Presente",
          description: [
            "Desarrollé y mantuve microservicios para Advanta Health usando C# y ASP.NET Core",
            "Construí UI moderna con Blazor y gestioné infraestructura Windows Server con SQL Server",
            "Arquitecté servicios backend para Wag Hotels usando Python y Django en AWS",
            "Diseñé pipelines ETL con Python y PySpark en AWS Glue para Mosaic.tech"
          ]
        },
        {
          title: "Desarrollador Python",
          company: "Adinfi",
          period: "Abril 2022 - Marzo 2023",
          description: [
            "Desarrollé sistema ADContent usando Django REST Framework",
            "Integré bases de datos alojadas en AWS (MySQL y SQL Server)",
            "Implementé microservicios con Flask y dockericé proyectos",
            "Mantuve y mejoré funcionalidades existentes con enfoque en confiabilidad"
          ]
        },
        {
          title: "Ingeniero Python (Líder Técnico)",
          company: "mediQó",
          period: "Diciembre 2021 - Mayo 2023",
          description: [
            "Lideré el equipo de desarrollo para plataforma de servicios de salud",
            "Construí APIs RESTful usando Django REST Framework con PostgreSQL y PostGIS",
            "Realicé análisis de requisitos y perfilado de código para optimizar rendimiento",
            "Implementé funcionalidades de geolocalización usando extensiones PostGIS"
          ]
        },
        {
          title: "Desarrollador Python",
          company: "XID - Digital Services",
          period: "Junio 2021 - Diciembre 2021",
          description: [
            "Participé en desarrollo del motor de reservas para Palace Resorts",
            "Implementé servicios REST con Flask y SQLAlchemy como ORM",
            "Me enfoqué en mejorar la usabilidad y estabilidad del sistema",
            "Colaboré en diseño de API y pruebas de integración"
          ]
        },
        {
          title: "Desarrollador de Software",
          company: "Binary Systems",
          period: "Agosto 2020 - Julio 2021",
          description: [
            "Desarrollé CRM inmobiliario usando Django y PostgreSQL",
            "Depuré problemas críticos e implementé nuevas funcionalidades",
            "Mejoré la confiabilidad del sistema y experiencia de usuario",
            "Trabajé con Django ORM para operaciones complejas de base de datos"
          ]
        }
      ]
    },
    footer: {
      contact: "Contacto",
      email: "zozi.fer96@gmail.com",
      github: "github.com/Zozi96",
      linkedin: "linkedin.com/in/zozi",
      rights: "Todos los derechos reservados"
    }
  }
};
