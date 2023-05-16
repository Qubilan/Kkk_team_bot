const { Markup } = require("telegraf");
const locale = require("../locale");

module.exports = async (ctx, title, requisites) => {
  return ctx
    .replyOrEdit(`📝 <b>Реквизиты для перевода ${title}:</b>\n\n<code>${requisites}</code>`, {
      reply_markup: Markup.inlineKeyboard([[Markup.callbackButton(locale.go_back, "direct_transaction")]]),
      parse_mode: "HTML",
    })
    .catch((err) => ctx.reply("❌ Ошибка"));
};
