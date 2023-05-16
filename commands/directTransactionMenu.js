const { Markup } = require("telegraf");
const locale = require("../locale");

module.exports = async (ctx) => {
  return ctx
    .replyOrEdit(locale.directTransaction.menu, {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton(locale.directTransaction.paypal, "direct_transaction_paypal"),
          Markup.callbackButton(locale.directTransaction.iban, "direct_transaction_iban"),
        ],
        [Markup.callbackButton(locale.directTransaction.add, "direct_transaction_add")],
      ]),
      parse_mode: "HTML",
    })
    .catch((err) => ctx.reply("❌ Ошибка"));
};
