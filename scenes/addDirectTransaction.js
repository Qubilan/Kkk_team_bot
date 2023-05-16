const WizardScene = require("telegraf/scenes/wizard");
const { Country, Service, ProfitRequest } = require("../database");
const locale = require("../locale");
const escapeHTML = require("escape-html");
const chunk = require("chunk");
const { Markup } = require("telegraf");
const log = require("../helpers/log");

const scene = new WizardScene(
  "add_direct_transaction",
  async (ctx) => {
    try {
      const countries = await Country.findAll({
        order: [["id", "asc"]],
        where: {
          status: 1,
        },
      });
      await ctx.reply(`🌍 <b>Выберите страну</b>`, {
        reply_markup: Markup.inlineKeyboard([
          ...chunk(
            countries.map((v) =>
              Markup.callbackButton(v.title, `${v.id}`)
            )
          ),
        ]),
        parse_mode: "HTML",
      });
      ctx.scene.state.data = {};
      return ctx.wizard.next();
    } catch (err) {
      console.log(err);
      ctx.replyOrEdit("❌ Ошибка").catch((err) => err);
      return ctx.scene.leave();
    }
  },
  async (ctx) => {
    try {
      if (!ctx.callbackQuery?.data) return ctx.wizard.prevStep();

      const services = await Service.findAll({
        where: {
          countryCode: ctx.callbackQuery.data,
          status: 1,
        },
        order: [["title", "asc"]],
      });
  
      var buttons = chunk(
        services.map((v) =>
          Markup.callbackButton(v.title, `${v.title}_${v.currencyCode}`)
        )
      );
      if (buttons.length < 1)
        buttons = [[Markup.callbackButton("Страница пуста", "none")]];

      await ctx.reply(`📦 <b>Выберите сервис</b>`, {
        reply_markup: Markup.inlineKeyboard([
          ...buttons,
        ]),
        parse_mode: "HTML",
      });

      // return ctx.wizard.nextStep();
      return ctx.wizard.next();
    } catch (err) {
      ctx.replyOrEdit("❌ Ошибка").catch((err) => err);
      return ctx.scene.leave();
    }
  },
  async (ctx) => {
    try {
      if (!ctx.callbackQuery?.data) return ctx.wizard.prevStep();

      ctx.scene.state.data.serviceTitle = ctx.callbackQuery.data.split("_")[0];
      ctx.scene.state.data.currency = ctx.callbackQuery.data.split("_")[1];

      await ctx.reply(`💸 <b>Введите сумму профита (только число, в ${ctx.scene.state.data.currency})</b>`, {
        parse_mode: "HTML",
        reply_markup: Markup.inlineKeyboard([[Markup.callbackButton("Отменить", "cancel")]]),
      });
      return ctx.wizard.next();
    } catch (err) {
      ctx.replyOrEdit("❌ Ошибка").catch((err) => err);
      return ctx.scene.leave();
    }
  },
  async (ctx) => {
    try {
      if (!ctx.message?.text) return ctx.wizard.prevStep();
      var amount = parseFloat(ctx.message?.text);
      if (isNaN(amount)) return ctx.wizard.prevStep();

      ctx.scene.state.data.amount = amount;

      await ctx.reply(`📝 <b>Введите реквизиты, на которые была совершена оплата</b>`, {
        parse_mode: "HTML",
        reply_markup: Markup.inlineKeyboard([[Markup.callbackButton("Отменить", "cancel")]]),
      });
      return ctx.wizard.next();
    } catch (err) {
      ctx.replyOrEdit("❌ Ошибка").catch((err) => err);
      return ctx.scene.leave();
    }
  },
  async (ctx) => {
    try {
      if (!ctx.message?.text) return ctx.wizard.prevStep();
      ctx.scene.state.data.requisites = ctx.message.text;

      await ctx.reply(`📷 <b>Прикрепите ссылку на скриншот с доказательствами</b>\n\nЭто можно сделать через бота @bb_imgur_bot`, {
        parse_mode: "HTML",
        reply_markup: Markup.inlineKeyboard([[Markup.callbackButton("Отменить", "cancel")]]),
      });
      return ctx.wizard.next();
    } catch (err) {
      ctx.replyOrEdit("❌ Ошибка").catch((err) => err);
      return ctx.scene.leave();
    }
  },
  async (ctx) => {
    try {
      if (!ctx.message?.text) return ctx.wizard.prevStep();
      ctx.scene.state.data.screenshot = ctx.message.text.replace(/\s+/g, " ");

      const profitRequest = await ProfitRequest.create({
        userId: ctx.from.id,
        ...ctx.scene.state.data,
      });
      log(ctx, "отправил заявку на добавление профита");
      ctx.telegram.sendMessage(
        ctx.state.bot.requestsGroupId,
        `💸 Заявка на добавление профита от пользователя <b><a href="tg://user?id=${ctx.from.id}">${ctx.state.user.username}</a></b>

🌍 Сервис: <b>${ctx.scene.state.data.serviceTitle}</b>
💸 Валюта: <b>${ctx.scene.state.data.currency}</b>
💰 Сумма: <b>${ctx.scene.state.data.amount}</b>
📝 Реквизиты: <b>${ctx.scene.state.data.requisites}</b>
📷 Скриншот: <b>${ctx.scene.state.data.screenshot}</b>

🚦 Статус: <b>На рассмотрении ⏳</b>`,
        {
          parse_mode: "HTML",
          reply_markup: Markup.inlineKeyboard([
            [
              Markup.callbackButton("✅ Принять", `admin_profitrequest_${profitRequest.id}_accept`),
              Markup.callbackButton("❌ Отклонить", `admin_profitrequest_${profitRequest.id}_decline`),
            ],
          ]),
        }
      );
      await ctx.reply(`✅ <b>Заявка отправлена на рассмотрение администраторами!</b>`, {
        parse_mode: "HTML",
      });
    } catch (err) {
      console.log(err);
      ctx.replyOrEdit("❌ Ошибка").catch((err) => err);
    }
    return ctx.scene.leave();
  }
);

module.exports = scene;
