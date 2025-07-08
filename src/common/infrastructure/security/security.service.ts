import { HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { SecurityException } from '../../exception';
import {
  DECRYPTION_FAILED,
  ENCRYPTION_FAILED,
  INVALID_ENCRYPTION_KEY,
} from '../../constant';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class SecurityService {
  private readonly key: Buffer;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {
    const secret = this.configService.get<string>('encryptionKey');
    if (!secret || secret.length !== 64) {
      throw new SecurityException(
        INVALID_ENCRYPTION_KEY,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    this.key = Buffer.from(secret, 'hex');
  }

  encryptAes(data: string): string {
    try {
      const iv = crypto.randomBytes(12);
      const cipher = crypto.createCipheriv('aes-256-gcm', this.key, iv);
      const encrypted = Buffer.concat([
        cipher.update(data, 'utf8'),
        cipher.final(),
      ]);
      const authTag = cipher.getAuthTag();

      const result = Buffer.concat([iv, authTag, encrypted]);
      return result.toString('base64');
    } catch (err) {
      this.logger.error(ENCRYPTION_FAILED, err);

      throw new SecurityException(
        ENCRYPTION_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  decryptAes(encryptedData: string): string {
    try {
      const data = Buffer.from(encryptedData, 'base64');
      const iv = data.subarray(0, 12);
      const authTag = data.subarray(12, 28);
      const encrypted = data.subarray(28);

      const decipher = crypto.createDecipheriv('aes-256-gcm', this.key, iv);
      decipher.setAuthTag(authTag);

      return (
        decipher.update(encrypted, undefined, 'utf8') + decipher.final('utf8')
      );
    } catch (err) {
      this.logger.error(DECRYPTION_FAILED, err);

      throw new SecurityException(
        DECRYPTION_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
