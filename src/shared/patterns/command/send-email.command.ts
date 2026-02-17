import type { ICommand, CommandResult } from './command.interface';
import { Command } from './command.interface';
import type { IEmailService } from '../../services/email/email.service.interface';
import type { EmailPayload } from '../../services/email/email.service.interface';

/**
 * Send Email Command Context
 */
export interface SendEmailCommandContext {
  payload: EmailPayload;
}

/**
 * Send Email Command Result
 */
export interface SendEmailCommandResult {
  message: string;
}

/**
 * Send Email Command
 * Command pattern implementation for sending emails
 */
export class SendEmailCommand
  extends Command<SendEmailCommandResult, SendEmailCommandContext>
  implements ICommand<SendEmailCommandResult, SendEmailCommandContext>
{
  private emailService: IEmailService;

  constructor(emailService: IEmailService) {
    super();
    this.emailService = emailService;
  }

  /**
   * Validate command context
   */
  validate(context?: SendEmailCommandContext): boolean {
    if (!context || !context.payload) {
      return false;
    }

    const { payload } = context;

    // Validate required fields
    if (!payload.subject || !payload.previewText) {
      return false;
    }

    if (!payload.templateVariables || !payload.templateVariables.headline || !payload.templateVariables.body) {
      return false;
    }

    return true;
  }

  /**
   * Execute the send email command
   */
  async execute(context?: SendEmailCommandContext): Promise<CommandResult<SendEmailCommandResult>> {
    if (!this.validate(context)) {
      return this.failure('Invalid email payload');
    }

    // Context is guaranteed to be valid after validation
    const validContext = context as SendEmailCommandContext;

    try {
      const result = await this.emailService.send(validContext.payload);

      if (!result.success) {
        return this.failure(result.error || 'Failed to send email');
      }

      return this.success({
        message: result.message || 'Email sent successfully',
      });
    } catch (error) {
      return this.failure(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
}
