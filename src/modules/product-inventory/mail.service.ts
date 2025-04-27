/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface EmailParams {
  to: string;
  subject: string;
  message: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor(
    private readonly mailService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(data: EmailParams) {
    const { to, message, subject } = data;
    try {
      // Send the email
      await this.mailService.sendMail({
        from: 'John Hopkins <john@noreply.com>',
        to: to,
        subject: subject,
        text: message,
      });
      this.logger.log(`Succesfully sent message to ${to} `);
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`);
      return {
        success: false,
        message: `Failed to send email: ${error.message}`,
        error,
      };
    }
  }
}
