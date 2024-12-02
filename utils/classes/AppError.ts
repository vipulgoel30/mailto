export class AppError extends Error {
  constructor(public readonly statusCode: number, public readonly message: string) {
    super(message);
  }

  static getStatus(statusCode: number): string {
    return statusCode >= 400 && statusCode < 500 ? "fail" : "error";
  }
}

interface CreateErr {
  (statusCode: number): (message: string) => AppError;
}

type CreateErrReturnType = ReturnType<CreateErr>;

const createErr: CreateErr = (statusCode: number) => (message: string) => new AppError(statusCode, message);

export const DEFAULT_ERR_MESSAGE = "Uhh!! Something went wrong.";

export const createBadRequestErr: CreateErrReturnType = createErr(400);
export const createUnauthorizedErr: CreateErrReturnType = createErr(401);
export const createForbiddenErr: CreateErrReturnType = createErr(403);
export const createNotFoundErr: CreateErrReturnType = createErr(404);
export const InternalServerErr: AppError = createErr(500)(DEFAULT_ERR_MESSAGE);
