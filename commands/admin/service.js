const escapeHTML = require("escape-html");
const { Markup } = require("telegraf");
const { Service, Ad, ProDomain } = require("../../database");
const locale = require("../../locale");

module.exports = async (ctx, id) => {
  try {
    const service = await Service.findByPk(id, {
      include: [
        {
          association: "country",
          required: true,
        },
      ],
    });
    if (!service)
      return ctx
        .replyOrEdit("❌ Сервис не найден", {
          reply_markup: Markup.inlineKeyboard([[Markup.callbackButton("🔙 Назад", `admin_services_1`)]]),
        })
        .catch((err) => err);

    const serviceAdsCount = await Ad.count({
      where: {
        serviceCode: service.code,
      },
    });
    const domen = await ProDomain.findOne({
      where: {
        serviceCode: service.code,
        status: 1,
      },
    });
    return ctx
      .replyOrEdit(
        `<b>📦 Сервис "${service.title}"</b>

🌎 Страна: <b>${service.country.title}</b>
🎟 Объявлений: <b>${serviceAdsCount}</b>
🔗 Активный домен: <b>${service.domain}</b>
🔗 Pro домен: <b>${domen?.domain || "нету"}</b>`,
        {
          parse_mode: "HTML",
          reply_markup: Markup.inlineKeyboard([
            [
              Markup.callbackButton("📝 Изменить домен", `admin_service_${service.id}_edit_domain`),
              Markup.callbackButton("📝 Изменить Pro домен", `admin_service_${service.id}_edit_domain_pro`),
            ],
            [
              Markup.callbackButton(
                service.status == 1 ? `👁 Скрыть сервис` : `👁 Отображать сервис`,
                `admin_service_${service.id}_${service.status == 1 ? "hide" : "show"}`
              ),
            ],
            [Markup.callbackButton("🔙 Назад", `admin_services_1`)],
          ]),
        }
      )
      .catch((err) => err);
  } catch (err) {
    console.log(err);
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
};
