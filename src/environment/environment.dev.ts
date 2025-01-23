class Environment {
  public readonly port: number = Number(process.env.PORT);
}

export const environmentDev = new Environment();
