import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WorkDone<T> {
  @ApiProperty({ description: 'Indicates if the operation was successful' })
  isOk: boolean;

  @ApiPropertyOptional({ description: 'Data returned from the operation' })
  data?: T;

  @ApiPropertyOptional({ description: 'Optional success message' })
  successMessage?: string;

  @ApiPropertyOptional({ description: 'Optional warning message' })
  warningMessage?: string;

  @ApiPropertyOptional({ description: 'Optional error message' })
  errorMessage?: string;

  private constructor(
    isOk: boolean,
    data?: T,
    successMessage?: string,
    warningMessage?: string,
    errorMessage?: string,
  ) {
    this.isOk = isOk;
    this.data = data;
    this.successMessage = successMessage;
    this.warningMessage = warningMessage;
    this.errorMessage = errorMessage;
  }

  public static buildOk<T>(
    data?: T,
    successMessage?: string,
    warningMessage?: string,
  ): WorkDone<T> {
    return new WorkDone<T>(true, data, successMessage, warningMessage);
  }

  public static buildError<T>(errorMessage: string): WorkDone<T> {
    return new WorkDone<T>(
      false,
      undefined,
      undefined,
      undefined,
      errorMessage,
    );
  }
}
