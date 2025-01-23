class Environment {
  public readonly port: number = Number(process.env.PORT);
  public readonly mongoUrl: string = process.env.MONGO_URL || '';
}

export const environmentDev = new Environment();
