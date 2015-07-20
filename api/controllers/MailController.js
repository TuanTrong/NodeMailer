/**
 * Created by TuanNT22 on 18-06-2015.
 */
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
module.exports = {
  sendMail: function (req, res) {
    //email template setting
    var options = {
      viewEngine: {
        extname: '.hbs',
        layoutsDir: 'views/email/template',
        defaultLayout: 'template',
        partialsDir: 'views/template/partials/'
      },
      viewPath: 'views/email/',
      extName: '.hbs'
    };
    // Create a SMTP transport object
    var mailer = nodemailer.createTransport("SMTP", {
      service: 'Gmail',
      auth: {
        user: "mrbotno@gmail.com",
        pass: "botngot91"
      }
    });
    mailer.use('compile', hbs(options));
    console.log('SMTP Configured');
    // Message object
    var message = {
      // sender info
      from: 'MrTuan <mrbotno@gmail.com>',
      // Comma separated list of recipients
      to: '"MsHa" <mrbotno@gmail.com>',
      // Subject of the message
      subject: 'Nodemailer is unicode friendly ✔',
      // setting template for email
      template: 'new',
      //variable pass to template
      context: {
        username: '',
        activelink: ''
      }
    };
    console.log('Sending Mail');
    mailer.sendMail(message, function (error) {
      if (error) {
        console.log('Error occured');
        console.log(error);
        return;
      }
      console.log('Message sent successfully!');
      // if you don't want to use this transport object anymore, uncomment following line
      mailer.close(); // close the connection pool
    });
  }
}
