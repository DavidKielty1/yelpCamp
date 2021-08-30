const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6111056d125de3014f207369",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint unde hic cumque? Hic omnis maiores vel commodi quod ipsam id accusantium laudantium molestias quaerat. Distinctio quasi tempora dicta doloremque neque?",
      price: `${price}`,
      geometry: {
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
        type: "Point",
      },
      images: [
        {
          url: "https://res.cloudinary.com/dg0it3ba2/image/upload/v1629896213/YelpCamp/thpyejss0xcit5mlpvkm.jpg",
          filename: "YelpCamp/thpyejss0xcit5mlpvkm",
        },
        {
          url: "https://res.cloudinary.com/dg0it3ba2/image/upload/v1629896214/YelpCamp/w0fiqqbyuakyk1vaily4.jpg",
          filename: "YelpCamp/w0fiqqbyuakyk1vaily4",
        },
        {
          url: "https://res.cloudinary.com/dg0it3ba2/image/upload/v1629896214/YelpCamp/do9fos4duzp8p9fchbmg.jpg",
          filename: "YelpCamp/do9fos4duzp8p9fchbmg",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
