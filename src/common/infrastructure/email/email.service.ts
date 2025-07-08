import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'src/common/infrastructure';

@Injectable()
export class EmailService implements OnModuleInit, OnModuleDestroy {
  private readonly transporter: nodemailer.Transporter;
  private readonly from: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('nodeMailer.smtp.host'),
      port: this.configService.get<number>('nodeMailer.smtp.port'),
      secure: this.configService.get<boolean>('nodeMailer.smtp.secure'),
      auth: {
        user: this.configService.get<string>('nodeMailer.smtp.user'),
        pass: this.configService.get<string>('nodeMailer.smtp.pass'),
      },
      // Optimized configuration for Gmail
      // pool: true, // Uses a connection pool
      // maxConnections: 5, // Maximum 5 simultaneous connections
      // maxMessages: 100, // Maximum 100 messages per connection
      // rateDelta: 1000, // 1 second between emails
      // rateLimit: 5, // Maximum 5 emails per second
      // Optimized configuration for SendGrid (Paid Plan)
      pool: true, // Uses a connection pool
      maxConnections: 10, // Maximum 10 simultaneous connections
      maxMessages: 1000, // Maximum 1000 messages per connection
      rateDelta: 100, // 100ms between emails
      rateLimit: 10, // Maximum 10 emails per second
    });
    this.from = configService.get<string>('nodeMailer.from')!;
  }

  async onModuleInit() {
    try {
      await this.transporter.verify();
      this.logger.log('SMTP connection established successfully');
    } catch (error) {
      this.logger.error('Failed to establish SMTP connection:', error);
    }
  }

  async onModuleDestroy() {
    if (this.transporter) {
      this.transporter.close();
      this.logger.log('📧 SMTP connection closed');
    }
  }

  async sendEmail(
    to: string,
    subject: string,
    htmlContent: string,
  ): Promise<boolean> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.from,
      to,
      subject,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);

      return true;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to send email: ${error.message}`,
          error.stack,
        );
      }

      return false;
    }
  }
}
