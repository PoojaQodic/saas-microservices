import * as nodemailer from 'nodemailer';
// import dotenv from 'dotenv'; //TODO - Need to find out the cause why have to declare it in every file because it is not correct way
// dotenv.config();
// // console.log('process.env-----------',process.env);

// Explicitly specifying TransportOptions
const transport = nodemailer.createTransport({ //I am adding this value static because getting error of - Error: Error: self-signed certificate in certificate chain at TLSSocket.onConnectSecure (node:_tls_wrap:1540:34) at TLSSocket.emit (node:events:513:28)
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '39a6b81d168ec1',
    pass: '6ae7bae6730c1e'
  }
} as nodemailer.TransportOptions);

/**
 * This method will send email
 * @param from 
 * @param to 
 * @param subject 
 * @param body 
 * @param html 
 */
const emailSend = (from: string, to: string, subject: string, body: string, html?:string) => {
    transport.sendMail({
        from,
        to,
        subject,
        text: body,
        html:html ?html:''
    }, (error: any, info:any) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

export default emailSend