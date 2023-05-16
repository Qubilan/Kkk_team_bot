const Stage = require("telegraf/stage");

const changeUSDTWallet = require("./scenes/changeUSDTWallet");
const complaint = require("./scenes/complaint");
const whatsappLink = require("./scenes/whatsappLink");
const createMentorAnket = require("./scenes/createMentorAnket");
const changeMentor = require("./scenes/changeMentor");
const removeMentorStudent = require("./scenes/removeMentorStudent");

const adminSendMail = require("./scenes/admin/sendMail");
const adminEditValue = require("./scenes/admin/editValue");
const adminEditUserPercent = require("./scenes/admin/editUserPercent");
const adminAddProfit = require("./scenes/admin/addProfit");
const adminAddWriter = require("./scenes/admin/addWriter");
const adminAddBin = require("./scenes/admin/addBin");
const adminServiceEditDomain = require("./scenes/admin/serviceEditDomain");
const adminAnswerComplaint = require("./scenes/admin/answerComplaint");
const adminEditProDomain = require("./scenes/admin/serviceEditDomainPro");

const editPrice = require("./scenes/ads/editPrice");
const sendRequest = require("./scenes/sendRequest");
const sendSms = require("./scenes/sendSms");
const sendEmail = require("./scenes/sendEmail");

const supportSendMessage = require("./scenes/supportSendMessage");

const ebayDe = require("./scenes/createLink/ebayDe");

const wallapopEs = require("./scenes/createLink/wallapopEs");

const leboncoinFr = require("./scenes/createLink/leboncoinFr");

const dhl = require("./scenes/createLink/dhl");
const vinted = require("./scenes/createLink/vinted");

const addsupptemp = require("./scenes/createSuppTemp");
const create_supp_anket = require("./scenes/createSupReq");

const addDirectTransaction = require("./scenes/addDirectTransaction");

const stage = new Stage([
  changeUSDTWallet,
  complaint,
  whatsappLink,
  createMentorAnket,
  changeMentor,
  removeMentorStudent,
  create_supp_anket,

  sendRequest,
  sendSms,
  sendEmail,
  editPrice,
  supportSendMessage,

  vinted,

  wallapopEs,

  leboncoinFr,

  dhl,
  ebayDe,

  adminSendMail,
  adminEditValue,
  adminEditUserPercent,
  adminAddProfit,
  adminAddWriter,
  adminAddBin,
  adminServiceEditDomain,
  adminAnswerComplaint,
  adminEditProDomain,

  addsupptemp,

  addDirectTransaction,
]);

stage.action("cancel", async (ctx) => {
  await ctx.replyOrEdit("♻️ <b>Отменено!</b>", { parse_mode: "HTML" });
  await ctx.scene.leave();
});

module.exports = stage;
