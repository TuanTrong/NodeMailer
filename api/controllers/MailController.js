/**
 * Created by TuanNT22 on 18-06-2015.
 */

module.exports = {
  sendMail: function (req, res) {
    var nodemailer = require('nodemailer');
    var hbs = require('nodemailer-express-handlebars');
    //email template setting
    var options = {
      viewEngine: {
        extname: '.hbs',
        layoutsDir: 'views/email/template',
        defaultLayout: 'template',
        partialsDir: 'views/email/template/partials/'
      },
      viewPath: 'views/email/',
      extName: '.hbs'
    };
    var generator = require('xoauth2').createXOAuth2Generator({
      user: 'mrbotno@gmail.com',
      clientId: '109620886904-3i95hnuu084hoc937tnoikl818kd445k.apps.googleusercontent.com',
      clientSecret: 'AG-gp2VZ2Ajgqtx8e3ulUxEA',
      refreshToken: '1/J5mTd_LcpTl01RDN4LNn2TG1H5nchj8iCJK5s8iiVyc'
    });
    var mailer = nodemailer.createTransport(({
      service: 'gmail',
      auth: {
        xoauth2: generator
      }
    }));
    mailer.use('compile', hbs(options));
    console.log('SMTP Configured');
    // Message object
    var mail = {
      // sender info
      from: 'MrTuan <mrbotno@gmail.com>',
      // Comma separated list of recipients
      to: '"MsHa" <mrbotno@gmail.com>',
      // Subject of the message
      subject: 'Active Japanese Learning Online Tool Account ✔',
      // setting template for email
      template: 'new',
      //variable pass to template
      context: {
        username: 'Tuan Trong',
        activelink: 'http://localhost:1337'
      }
    };
    console.log('Sending Mail');
    mailer.sendMail(mail, function (error) {
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
