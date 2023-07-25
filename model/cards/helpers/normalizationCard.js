const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (card, userId) => {
  if (!card.image) {
    card.image = {};
  }

  card.image = {
    url:
      card.image.url ||
      card.url ||
      "https://cdn.pixabay.com/photo/2013/03/08/05/28/filmstrip-91434_1280.jpg",
    alt: card.image.alt || card.alt || "my image videos",
  };

  delete card.url;
  delete card.alt;
  return {
    ...card,
    bizNumber: card.bizNumber || (await generateBizNumber()),
    user_id: card.user_id || userId,
  };
};

module.exports = normalizeCard;
