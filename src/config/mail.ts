class Configs {
  public host = process.env.MAIL_HOST;
  public port = process.env.MAIL_PORT;
  public user = process.env.MAIL_USER;
  public pass = process.env.MAIL_PASS;
}

export default new Configs;
