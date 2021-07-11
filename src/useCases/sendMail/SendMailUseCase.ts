import nodemailer, { Transporter } from "nodemailer"
import config from '../../config/mail'
import SMTPTransport from "nodemailer/lib/smtp-transport"
import handlebars from "handlebars"
import fs from "fs"

class SendMailUseCase {
  private client: Transporter
  constructor() {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.pass
      },
      tls: { rejectUnauthorized: false }
    } as unknown as SMTPTransport.Options)

    this.client = transporter;
  }

  async execute(
    to: string,
    emailPath: string,
    variables: object
  ) {
    const templateFileContent = fs.readFileSync(emailPath).toString("utf-8");

    const mailTemplateParse = handlebars.compile(templateFileContent)

    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      from: "ChatCom <noreply@example.com>",
      to,
      subject: "Recuperar Senha ✔",
      html
    })

    console.log("Message sent: %s", message.messageId)
  }
}

export { SendMailUseCase }
