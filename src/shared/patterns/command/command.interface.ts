/**
 * Command Result Interface
 */
export interface CommandResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Command Interface
 * Base interface for all command implementations
 */
export interface ICommand<TResult = unknown, TContext = unknown> {
  /**
   * Execute the command
   * @param context - Optional context data for command execution
   */
  execute(context?: TContext): Promise<CommandResult<TResult>>;

  /**
   * Optional: Undo the command (if applicable)
   */
  undo?(): Promise<void>;

  /**
   * Optional: Validate command before execution
   */
  validate?(context?: TContext): boolean;
}

/**
 * Abstract Command Base Class
 * Provides common functionality for commands
 */
export abstract class Command<TResult = unknown, TContext = unknown> implements ICommand<TResult, TContext> {
  /**
   * Execute the command
   */
  abstract execute(context?: TContext): Promise<CommandResult<TResult>>;

  /**
   * Validate command (default implementation)
   */
  validate(_context?: TContext): boolean {
    return true;
  }

  /**
   * Create a successful result
   */
  protected success(data?: TResult): CommandResult<TResult> {
    return {
      success: true,
      data,
    };
  }

  /**
   * Create a failure result
   */
  protected failure(error: string): CommandResult<TResult> {
    return {
      success: false,
      error,
    };
  }
}
