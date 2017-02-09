var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();


app.use(express.static(path.resolve(__dirname, "www")));
app.set('port', process.env.PORT || 3000);

app.get('/web-view', function (req, res, next) {
  console.log('web-view route hit');
  res.sendFile(path.join(__dirname, 'www/web-view.html'));
  // res.send('Hello World!')
});

app.listen(app.get('port'), function() {
 console.log("listening to Port", app.get("port"));
});