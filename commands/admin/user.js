const { Op } = require("sequelize");
const { Markup } = require("telegraf");
const { User, Profit, Ad, Mentor } = require("../../database");
const locale = require("../../locale");

module.exports = async (ctx, id) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            id,
          },
          {
            username: id,
          },
        ],
      },
      include: [
        {
          association: "request",
        },
      ],
    });

    if (!user)
      return ctx
        .replyOrEdit("❌ Пользователь не найден", {
          reply_markup: Markup.inlineKeyboard([
            [Markup.callbackButton(locale.go_back, "admin")],
          ]),
        })
        .catch((err) => err);

    const stats = {
      profits: await Profit.count({
        where: {
          userId: user.id,
        },
      }),
      profits_sum: parseFloat(
        await Profit.sum("convertedAmount", {
          where: {
            userId: user.id,
          },
        })
      ).toFixed(2),
      ads: await Ad.count({
        where: {
          userId: user.id,
        },
      }),
    };

    const userProfitsSum =
        (parseFloat(
          await Profit.sum("convertedAmount", {
            where: {
              userId: user.id,
              status: 0,
            },
          })
        ) /
          100) *
        ctx.state.bot.payoutPercent,
      userPercentProfitsSum =
        (parseFloat(
          await Profit.sum("convertedAmount", {
            where: {
              status: 0,
              ...(user.percentType == 2
                ? {
                    writerId: user.id,
                  }
                : {}),
            },
          })
        ) /
          100) *
        (user.percent || 0);

    const totalSum = (userProfitsSum + userPercentProfitsSum).toFixed(2);

    const request_btn = user.request
      ? [
          [
            Markup.callbackButton(
              "📰 Перейти к заявке",
              `admin_user_${user.id}_request_${user.request.id}`
            ),
          ],
        ]
      : [];
      
    if (user.myMentor) {
      const mentor = await User.findByPk(user.myMentor);
      var userMentor = `@${mentor.username} (${mentor.id})`;
    } else {
      var userMentor = "Нет";
    }

    const mentorAnket = await Mentor.findOne({
      where: {
        userId: user.id,
      },
    });

    return ctx
      .replyOrEdit(
        `👤 Пользователь <b><a href="tg://user?id=${user.id}">${
          user.username
        }</a></b>
${user.banned ? "<i><b>🚫 Этот пользователь заблокирован</b></i>\n" : ""}
🆔 ID: <code>${user.id}</code>
💰 Профитов: <b>${stats.profits}</b>
💸 Сумма профитов: <b>${isNaN(stats.profits_sum) ? 0 : stats.profits_sum} RUB</b>
💎 USDT: <b>${user.USDTWallet ? user.USDTWallet : "Не установлен"}</b>
📦 Объявлений: <b>${stats.ads}</b>
👀 Никнейм: <b>${user.hideNick ? "скрыт" : "не скрыт"}</b>
👨‍🎓 Наставник: <b>${userMentor}</b>
🚦 Статус: <b>${
          user.status == 1
            ? locale.roles.admin
            : user.status == 2
            ? locale.roles.writer
            : user.status == 3
            ? locale.roles.pro
            : locale.roles.worker
        }</b>
💵 Админский процент: <b>${
          user.percent
            ? `${user.percent}% ${
                user.percentType == 1
                  ? "со всех залетов"
                  : user.percentType == 2
                  ? "со вбитых логов"
                  : ""
              }`
            : `не установлен`
        }</b>
📰 Заявка: <b>${
          user.request
            ? `
— ID: ${user.request.id}
— Статус: ${
                user.request.status == 0
                  ? "⏳ На рассмотрении"
                  : user.request.status == 1
                  ? "✅ Принята"
                  : "❌ Отклонена"
              }`
            : "нету"
        }</b>

<b>💰 Невыплаченный процент:
— Со своих залетов: ${isNaN(userProfitsSum.toFixed(2)) ? 0 : userProfitsSum.toFixed(2)} RUB
— С админского процента: ${isNaN(userPercentProfitsSum.toFixed(2)) ? 0 : userPercentProfitsSum.toFixed(2)} RUB
— Итого: ${isNaN(totalSum) ? 0 : totalSum} RUB</b>
`,
        {
          parse_mode: "HTML",
          reply_markup: Markup.inlineKeyboard([
            [
              Markup.callbackButton(
                "💰 Профиты",
                `admin_user_${user.id}_profits_1`
              ),
            ],
            [
              Markup.callbackButton(
                "📦 Объявления",
                `admin_user_${user.id}_ads_1`
              ),
            ],
            [
              Markup.callbackButton(
                user.banned ? "✅ Разблокировать" : "🚫 Заблокировать",
                `admin_user_${user.id}_${user.banned ? "un" : ""}ban`
              ),
            ],
            [
              ...(mentorAnket ? 
                [
                  Markup.callbackButton(
                    "📚 Просмотреть/удалить анкету наставника",
                    `admin_mentor_anket_${mentorAnket.id}`
                  ),
                ]
              : []),
            ],
            [
              Markup.callbackButton(
                "🚦 Изменить статус",
                `admin_user_${user.id}_edit_status`
              ),
            ],
            [
              Markup.callbackButton(
                "💵 Изменить админский процент",
                `admin_user_${user.id}_select_percent_type`
              ),
            ],
            ...request_btn,
            [Markup.callbackButton(locale.go_back, "admin_users_1")],
          ]),
        }
      )
      .catch((err) => err);
  } catch (err) {
    console.log(err)
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
};
