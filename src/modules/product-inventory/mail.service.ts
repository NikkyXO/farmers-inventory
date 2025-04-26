import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor(
    private readonly mailService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(data: any) {
    const { to, message, subject} = data
    await this.mailService.sendMail({
        from: 'John Hopkins <john@noreply.com>',
        to: to,
        subject: subject,
        text: message
    })
  }
}
