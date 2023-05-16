const escapeHTML = require("escape-html");
const { Markup } = require("telegraf");
const { ProfitRequest } = require("../../database");
const locale = require("../../locale");

module.exports = async (ctx, id) => {
  try {
    const profitRequest = await ProfitRequest.findOne({
      where: {
        id,
      },
      include: [
        {
          association: "user",
          required: true,
        },
      ],
    });

    return ctx.replyOrEdit(
        `💸 Заявка на добавление профита от пользователя  <b><a href="tg://user?id=${profitRequest.user.id}">${
    profitRequest.user.username
        }</a></b>

🌍 Сервис: <b>${profitRequest.serviceTitle}</b>
💸 Валюта: <b>${profitRequest.currency}</b>
💰 Сумма: <b>${profitRequest.amount}</b>
📝 Реквизиты: <b>${profitRequest.requisites}</b>
📷 Скриншот: <b>${profitRequest.screenshot}</b>

🚦 Статус: <b>${
    profitRequest.status == 0
            ? "⏳ На рассмотрении"
            : profitRequest.status == 1
            ? "✅ Принято"
            : "❌ Отклонено"
        }</b>`,
        {
          parse_mode: "HTML",
        //   reply_markup: Markup.inlineKeyboard([
        //     [
        //       Markup.callbackButton(
        //         `✅ Принято`,
        //         `admin_profitrequest_${
        //             profitRequest.id
        //         }_accept`
        //       ),
        //       Markup.callbackButton(
        //         `❌ Отклонено`,
        //         `admin_profitrequest_${
        //             profitRequest.id
        //         }_decline`
        //       ),
        //     ],
        //   ]),
        }
      )
      .catch((err) => err);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
};
