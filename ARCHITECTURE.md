# 🏗️ Architecture Documentation

## Overview

This project implements an enterprise-level architecture with modern design patterns, dependency injection, and centralized configuration management.

## Architecture Components

### 1. **Centralized Configuration System** 📋

Located in `src/shared/config/`

#### Files:
- **`env.schema.ts`**: Zod schema for environment variable validation
- **`config.ts`**: Singleton AppConfig class for type-safe configuration access
- **`index.ts`**: Public exports

#### Features:
- ✅ Type-safe environment variable access
- ✅ Automatic validation with Zod
- ✅ Organized configuration getters (api, features, environment, analytics, app)
- ✅ Debug mode for troubleshooting
- ✅ Feature flags support

#### Usage:
```typescript
import { appConfig } from '@/shared/config';

// Access API configuration
const apiUrl = appConfig.api.url;
const apiKey = appConfig.api.key;

// Check feature flags
if (appConfig.features.useMockServices) {
  // Use mock services
}

// Debug configuration (only in dev/debug mode)
appConfig.debug();
```

#### Environment Variables:
```env
# API Configuration
VITE_API_URL=http://127.0.0.1:8000
VITE_API_KEY=your_api_key_here
VITE_SEND_EMAIL_PATH=/notifications/send-email

# Feature Flags
VITE_USE_MOCK_SERVICES=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=true

# Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# App Metadata
VITE_APP_VERSION=1.0.0
VITE_APP_NAME=Portfolio
```

### 2. **Service Layer** 🔧

Located in `src/shared/services/`

#### Email Service (`services/email/`)
- **Interface**: `IEmailService` - Contract for email implementations
- **Real Implementation**: `EmailService` - Sends emails via backend API
- **Mock Implementation**: `MockEmailService` - Simulates email sending for development

**Example:**
```typescript
import type { IEmailService } from '@/shared/services/email/email.service.interface';

const emailService: IEmailService = getEmailService();
const result = await emailService.send({
  subject: "Hello",
  previewText: "Preview",
  templateVariables: {
    headline: "Welcome",
    body: "Message body"
  }
});
```

#### Analytics Service (`services/analytics/`)
- **Interface**: `IAnalyticsService` - Contract for analytics implementations
- **Google Analytics Adapter**: `GoogleAnalyticsAdapter` - Integrates with GA4
- **Mock Implementation**: `MockAnalyticsService` - For development/testing

**Example:**
```typescript
import { useAnalyticsService } from '@/shared/context';

const analytics = useAnalyticsService();
analytics.trackEvent('button_click', { button_id: 'cta' });
analytics.trackPageView({ pageTitle: 'Home' });
```

#### Storage Repository (`services/storage/`)
- **Interface**: `IStorageRepository` - Contract for storage implementations
- **LocalStorage Implementation**: `LocalStorageRepository` - Browser localStorage wrapper

**Example:**
```typescript
import { useStorageRepository } from '@/shared/context';

const storage = useStorageRepository();
storage.setItem('theme', 'dark');
const theme = storage.getItem<string>('theme');
```

### 3. **Dependency Injection Container** 💉

Located in `src/shared/di/`

#### Components:
- **`container.ts`**: DIContainer singleton for service lifecycle management
- **`service-factory.ts`**: ServiceFactory for creating service instances based on configuration

#### Features:
- ✅ Singleton pattern for container
- ✅ Automatic service initialization
- ✅ Feature flag-based service resolution
- ✅ Type-safe service retrieval

#### Usage:
```typescript
import { diContainer } from '@/shared/di';

// Get services (after initialization)
const emailService = diContainer.getEmailService();
const analytics = diContainer.getAnalyticsService();
const storage = diContainer.getStorageRepository();
```

### 4. **React Context Integration** ⚛️

Located in `src/shared/context/`

#### Components:
- **`ServiceContext.tsx`**: React Context and Provider component
- **`ServiceHooks.tsx`**: Custom hooks for accessing services
- **`index.ts`**: Public exports

#### Hooks:
- `useServices()` - Access all services
- `useEmailService()` - Access email service only
- `useAnalyticsService()` - Access analytics service only
- `useStorageRepository()` - Access storage repository only

#### Integration:
```typescript
// App.tsx
import { ServiceProvider } from '@/shared/context';

function App() {
  return (
    <ServiceProvider>
      <YourApp />
    </ServiceProvider>
  );
}

// Component usage
import { useEmailService } from '@/shared/context';

function ContactForm() {
  const emailService = useEmailService();
  // Use email service
}
```

### 5. **Design Patterns** 🎨

Located in `src/shared/patterns/`

#### Builder Pattern (`patterns/builder/`)
**EmailBuilder** - Fluent API for constructing email payloads

```typescript
import { EmailBuilder } from '@/shared/patterns/builder';

const email = EmailBuilder.create()
  .subject("Welcome!")
  .preview("Thanks for signing up")
  .headline("Welcome to our platform")
  .body("We're excited to have you...")
  .badge("New User")
  .action("https://app.com/dashboard", "Get Started")
  .footer("Sent from Portfolio")
  .build();
```

#### Command Pattern (`patterns/command/`)
**SendEmailCommand** - Encapsulates email sending as a command

```typescript
import { SendEmailCommand } from '@/shared/patterns/command';

const command = new SendEmailCommand(emailService);
const result = await command.execute({ payload: emailPayload });

if (result.success) {
  console.log(result.data?.message);
} else {
  console.error(result.error);
}
```

## Project Structure

```
src/
├── shared/
│   ├── config/                 # Centralized configuration
│   │   ├── env.schema.ts       # Zod validation schema
│   │   ├── config.ts           # AppConfig singleton
│   │   └── index.ts
│   ├── services/               # Service layer
│   │   ├── email/              # Email service
│   │   │   ├── email.service.interface.ts
│   │   │   ├── email.service.ts
│   │   │   └── email.service.mock.ts
│   │   ├── analytics/          # Analytics service
│   │   │   ├── analytics.service.interface.ts
│   │   │   ├── analytics.service.ts
│   │   │   └── adapters/
│   │   │       └── google-analytics.adapter.ts
│   │   └── storage/            # Storage repository
│   │       ├── storage.repository.interface.ts
│   │       └── local-storage.repository.ts
│   ├── di/                     # Dependency injection
│   │   ├── container.ts        # DI container
│   │   ├── service-factory.ts  # Service factory
│   │   └── index.ts
│   ├── context/                # React context
│   │   ├── ServiceContext.tsx  # Context & Provider
│   │   ├── ServiceHooks.tsx    # Custom hooks
│   │   └── index.ts
│   └── patterns/               # Design patterns
│       ├── builder/
│       │   ├── email-builder.ts
│       │   └── index.ts
│       └── command/
│           ├── command.interface.ts
│           ├── send-email.command.ts
│           └── index.ts
├── components/                 # React components
├── sections/                   # Page sections
└── ...
```

## Development Workflow

### 1. Setup Environment

Create a `.env.development` file:
```env
VITE_API_URL=http://127.0.0.1:8000
VITE_API_KEY=dev_api_key
VITE_USE_MOCK_SERVICES=true
VITE_ENABLE_DEBUG_MODE=true
```

### 2. Start Development Server

```bash
npm run dev
```

The application will:
- Initialize services based on feature flags
- Use mock services if `VITE_USE_MOCK_SERVICES=true`
- Show debug logs if `VITE_ENABLE_DEBUG_MODE=true`

### 3. Using Services in Components

```typescript
import { useEmailService } from '@/shared/context';
import { EmailBuilder } from '@/shared/patterns/builder';
import { SendEmailCommand } from '@/shared/patterns/command';

function MyComponent() {
  const emailService = useEmailService();

  const handleSendEmail = async () => {
    const email = EmailBuilder.create()
      .subject("Test")
      .preview("Test email")
      .headline("Hello")
      .body("Test message")
      .build();

    const command = new SendEmailCommand(emailService);
    const result = await command.execute({ payload: email });

    if (result.success) {
      console.log("Email sent!");
    }
  };

  return <button onClick={handleSendEmail}>Send</button>;
}
```

## Testing

### Mock Services
When `VITE_USE_MOCK_SERVICES=true`, the application uses mock implementations:
- **MockEmailService**: Simulates email sending with delays and 95% success rate
- **MockAnalyticsService**: Logs events to console without sending to GA

### Debugging
Enable debug mode with `VITE_ENABLE_DEBUG_MODE=true` to see:
- Configuration values
- Service initialization logs
- Mock service simulation logs

## Production Deployment

### 1. Configure Production Environment

Create `.env.production`:
```env
VITE_API_URL=https://api.production.com
VITE_API_KEY=production_api_key
VITE_USE_MOCK_SERVICES=false
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=false
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 2. Build

```bash
npm run build
```

### 3. Deploy

Deploy the `dist/` folder to your hosting platform.

## Benefits

### 🎯 Scalability
- Easy to add new services
- Clear separation of concerns
- Modular architecture

### 🔒 Type Safety
- TypeScript interfaces for all services
- Zod validation for configuration
- Compile-time error detection

### 🧪 Testability
- Mock implementations for testing
- Dependency injection for easy mocking
- Clear service contracts

### 🔧 Maintainability
- Centralized configuration
- Design patterns for consistency
- Self-documenting code

### 🚀 Developer Experience
- IntelliSense support
- Feature flags for easy switching
- Debug mode for troubleshooting

## Extending the Architecture

### Adding a New Service

1. **Create service interface** (`src/shared/services/new-service/new-service.interface.ts`):
```typescript
export interface INewService {
  doSomething(): Promise<void>;
}
```

2. **Create implementation** (`src/shared/services/new-service/new-service.ts`):
```typescript
export class NewService implements INewService {
  async doSomething(): Promise<void> {
    // Implementation
  }
}
```

3. **Update ServiceFactory** (`src/shared/di/service-factory.ts`):
```typescript
static createNewService(): INewService {
  return new NewService();
}
```

4. **Update DIContainer** (`src/shared/di/container.ts`):
```typescript
// Add to initialize()
this.register('newService', ServiceFactory.createNewService());

// Add getter
getNewService(): INewService {
  return this.resolve<INewService>('newService');
}
```

5. **Create custom hook** (`src/shared/context/ServiceHooks.tsx`):
```typescript
export function useNewService(): INewService {
  const { newService } = useServices();
  return newService;
}
```

## Best Practices

1. **Always use interfaces** for services
2. **Use the Builder Pattern** for complex object construction
3. **Use the Command Pattern** for operations that can fail
4. **Access services through hooks** in React components
5. **Validate configuration** with Zod schemas
6. **Enable debug mode** during development
7. **Use mock services** for development/testing
8. **Keep services stateless** when possible

## Troubleshooting

### Services not initialized
**Error**: "DIContainer not initialized"
**Solution**: Ensure `ServiceProvider` wraps your app in `App.tsx`

### Configuration validation fails
**Error**: Environment variable validation errors
**Solution**: Check your `.env` file matches the schema in `env.schema.ts`

### Can't access services
**Error**: "useServices must be used within a ServiceProvider"
**Solution**: Ensure component is inside `<ServiceProvider>`

## References

- [Dependency Injection Pattern](https://en.wikipedia.org/wiki/Dependency_injection)
- [Builder Pattern](https://refactoring.guru/design-patterns/builder)
- [Command Pattern](https://refactoring.guru/design-patterns/command)
- [React Context API](https://react.dev/learn/passing-data-deeply-with-context)
