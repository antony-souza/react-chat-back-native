class Environment {
  public readonly port: number = Number(process.env.PORT);
  public readonly uploadServiceType: string =
    process.env.UPLOAD_SERVICE_TYPE ?? '';
}

export const environmentDev = new Environment();
