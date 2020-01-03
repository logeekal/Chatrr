export const constants = {
  APP_GLOBALS: {
    name: "Chatrrr"
  },
  CAPTCHA: {
    version: "v2",
    siteKey: "6Lf3HL4UAAAAAL_kZ2hid6fPEIPj993Mm7WEIjg-",
    secret: "6Lf3HL4UAAAAACBKcgtQZQNyJ-tKGuKjo_Bso7nb",
    url: "http://127.0.0.1/"
  },
  SERVER: {
    host: "localhost", //'192.168.1.7',
    port: "3001",
    get http() {
      return `http://${this.host}:${this.port}/gql`;
    },
    get ws() {
      return `ws://${this.host}:${this.port}/graphql`;
    }
  }
};
