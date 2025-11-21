export class ApiBase {
  private simulateDelay: number = 300; // milliseconds
  private simulateGetErrors: number = 0; // % error rate
  private simulateCreateErrors: number = 0; // % error rate
  private simulateDeleteErrors: number = 0; // % error rate

  protected constructor() {}

  /**
   * Configure API simulation settings
   */
  configure(options: {
    delay?: number;
    simulateGetErrors?: number;
    simulateCreateErrors?: number;
    simulateDeleteErrors?: number;
  }): void {
    if (options.delay !== undefined) {
      this.simulateDelay = options.delay;
    }
    if (options.simulateGetErrors !== undefined) {
      this.simulateGetErrors = options.simulateGetErrors;
    }
    if (options.simulateCreateErrors !== undefined) {
      this.simulateCreateErrors = options.simulateCreateErrors;
    }
    if (options.simulateDeleteErrors !== undefined) {
      this.simulateDeleteErrors = options.simulateDeleteErrors;
    }
  }

  protected async delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.simulateDelay));
  }

  protected shouldSimulateGetError(): boolean {
    return this.simulateGetErrors > 0 && Math.random() < this.simulateGetErrors;
  }

  protected shouldSimulateCreateError(): boolean {
    return this.simulateCreateErrors > 0 && Math.random() < this.simulateCreateErrors;
  }

  protected shouldSimulateDeleteError(): boolean {
    return this.simulateDeleteErrors > 0 && Math.random() < this.simulateDeleteErrors;
  }
}
