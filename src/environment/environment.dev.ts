import * as dotenv from 'dotenv';
dotenv.config();

class Environment {
  public readonly port: number = parseInt(process.env.PORT ?? '');
  public readonly uploadServiceType: string =
    process.env.UPLOAD_SERVICE_TYPE ?? '';
}

export const environmentDev = new Environment();
