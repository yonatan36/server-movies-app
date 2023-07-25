const normalizeUser = (userData) => {
  if (!userData.image) {
    userData.image = {};
  }
  if (!userData.name) {
    userData.name = {};
  }
  if (!userData.address) {
    userData.address = {};
  }

  userData.image = {
    url:
      userData.image.url ||
      userData.url ||
      "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png",
    alt: userData.image.alt || userData.alt || "my avatar image",
  };

  delete userData.url;
  delete userData.alt;

  userData.name = {
    firstName: userData.name.firstName || userData.firstName,
    lastName: userData.name.lastName || userData.lastName,
  };

  delete userData.firstName;
  delete userData.lastName;

  userData.address = {
    country: userData.address.country || userData.country,
    city: userData.address.city || userData.city,
    street: userData.address.street || userData.street,
    houseNumber: userData.address.houseNumber || userData.houseNumber,
    zip: userData.address.zip || userData.zip,
    state: userData.address.state || userData.state || "",
  };
  delete userData.country;
  delete userData.city;
  delete userData.street;
  delete userData.houseNumber;
  delete userData.state;
  delete userData.zip;

  return userData;
};

module.exports = normalizeUser;
