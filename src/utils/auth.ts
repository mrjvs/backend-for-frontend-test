import pkg from 'jsonwebtoken';
import { conf } from '../config';
import { StatusError } from './error';

const { sign, verify } = pkg;

const algorithm = 'HS256';

export function createApiKey(id: string): string {
  return sign(
    {
      id,
    },
    conf.crypto.jwtSecret,
    {
      algorithm,
    },
  );
}

export function verifyApiKey(key: string): boolean {
  try {
    verify(key, conf.crypto.jwtSecret, {
      algorithms: [algorithm],
    });
    return true;
  } catch {
    return false;
  }
}

export function assertApiKey(key: string): void {
  if (!verifyApiKey(key)) throw new StatusError('Invalid API key', 401);
}

export function assertAuth(req: { headers: Record<string, any> }): void {
  const authHeader: string | undefined = req.headers.authorization;
  if (!authHeader) throw new StatusError('Missing authorization header', 401);
  const [type, value] = authHeader.split(' ', 2);
  if (type.toLowerCase() !== 'bearer')
    throw new StatusError('Invalid authorization header type', 400);
  assertApiKey(value);
}
