export class SaleTooManyRequestError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "TOO_MANY_REQUESTS";
    this.status = 429;
  }
}
