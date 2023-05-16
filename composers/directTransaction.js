const { Composer } = require("telegraf");
const directTransactionMenu = require("../commands/directTransactionMenu");
const directTransactionRequisites = require("../commands/directTransactionRequisites");

const composer = new Composer();

composer.action("direct_transaction", directTransactionMenu);

composer.action("direct_transaction_paypal", async (ctx) => {
  const settings = ctx.state.bot;
  directTransactionRequisites(ctx, "Paypal", settings.paypal);
});
composer.action("direct_transaction_iban", async (ctx) => {
  const settings = ctx.state.bot;
  directTransactionRequisites(ctx, "IBAN", settings.iban);
});

composer.action("direct_transaction_add", (ctx) => ctx.scene.enter("add_direct_transaction"));

module.exports = composer;
