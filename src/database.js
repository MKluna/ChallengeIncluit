const mongoose = require('mongoose');
const uri = `mongodb+srv://root:root@cluster0.hwlfzgb.mongodb.net/basto?retryWrites=true&w=majority`
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('database connect')
).catch(e => console.log(e))

module.exports = mongoose;