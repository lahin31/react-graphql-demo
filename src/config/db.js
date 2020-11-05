const mongoose = require("mongoose");

exports.makeDb = () => {
  mongoose.set("useCreateIndex", true);
  mongoose.connect(
    `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@ds211648.mlab.com:11648/gql-ninja`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  mongoose.set("useFindAndModify", false);
};