import type { EmailPayload, EmailTemplateVariables } from '../../services/email/email.service.interface';

/**
 * Email Builder
 * Implements Builder Pattern for constructing email payloads
 */
export class EmailBuilder {
  private _subject = '';
  private _previewText = '';
  private _headline = '';
  private _body = '';
  private _badge?: string;
  private _actionUrl?: string;
  private _actionLabel?: string;
  private _footerNote?: string;

  /**
   * Set email subject
   */
  subject(subject: string): this {
    this._subject = subject;
    return this;
  }

  /**
   * Set email preview text
   */
  preview(previewText: string): this {
    this._previewText = previewText;
    return this;
  }

  /**
   * Set email headline
   */
  headline(headline: string): this {
    this._headline = headline;
    return this;
  }

  /**
   * Set email body
   */
  body(body: string): this {
    this._body = body;
    return this;
  }

  /**
   * Set badge text (optional)
   */
  badge(badge: string): this {
    this._badge = badge;
    return this;
  }

  /**
   * Set action button URL and label (optional)
   */
  action(url: string, label: string): this {
    this._actionUrl = url;
    this._actionLabel = label;
    return this;
  }

  /**
   * Set footer note (optional)
   */
  footer(note: string): this {
    this._footerNote = note;
    return this;
  }

  /**
   * Build and validate the email payload
   * @throws Error if required fields are missing
   */
  build(): EmailPayload {
    // Validate required fields
    if (!this._subject) {
      throw new Error('Email subject is required');
    }
    if (!this._previewText) {
      throw new Error('Email preview text is required');
    }
    if (!this._headline) {
      throw new Error('Email headline is required');
    }
    if (!this._body) {
      throw new Error('Email body is required');
    }

    // Build template variables
    const templateVariables: EmailTemplateVariables = {
      headline: this._headline,
      body: this._body,
    };

    // Add optional fields if present
    if (this._badge) {
      templateVariables.badge = this._badge;
    }
    if (this._actionUrl && this._actionLabel) {
      templateVariables.actionUrl = this._actionUrl;
      templateVariables.actionLabel = this._actionLabel;
    }
    if (this._footerNote) {
      templateVariables.footerNote = this._footerNote;
    }

    return {
      subject: this._subject,
      previewText: this._previewText,
      templateVariables,
    };
  }

  /**
   * Reset the builder to reuse it
   */
  reset(): this {
    this._subject = '';
    this._previewText = '';
    this._headline = '';
    this._body = '';
    this._badge = undefined;
    this._actionUrl = undefined;
    this._actionLabel = undefined;
    this._footerNote = undefined;
    return this;
  }

  /**
   * Create a new EmailBuilder instance
   */
  static create(): EmailBuilder {
    return new EmailBuilder();
  }
}
