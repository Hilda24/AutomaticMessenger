
//const qrcode = require('qrcode-terminal');

var XLSX = require('xlsx')
var workbook = XLSX.readFile('Birthday.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
const date = require('date-and-time');
const now = new Date();
const express = require('express')
const app = express()
const port = 5000
var month= date.format(now, 'MM');
var day = date.format(now, 'DD');

var birthdays = xlData.filter((row) =>{return row.Date == day && row.Month == month}).map((row) => row.Names)
console.log(birthdays)


var messageTemplate = "Happy Birthday " + birthdays.join(" & ")+ ". May God Bless you"



const {Client, LocalAuth} = require("whatsapp-web.js");
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {headless : true},
}
);

client.on("qr", (qr) => {
    qrcode.generate(qr,{small : true});

});

client.on('ready',async () => {
    
    console.log('client is ready!');
    const numbers = "120363199162853350@g.us";
    client.sendMessage(numbers, messageTemplate);
});

client.on('message', message => {

    console.log(message.body)
    if (message.body == "ping"){
        message.reply("pong")
    }
    // message.reply("helooo")
})

client.initialize();
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`))

