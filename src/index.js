import dotenv from 'dotenv'
import { readFile } from './helpers/read-helper.js'
import TelegramBot from 'node-telegram-bot-api'
import { join } from 'path'
import courseHandler from './handlers/course-handler.js'
import keyboardNames from './keyboards/keyboard-names.js'
import keyboards from './keyboards/keyboards.js'
import express from "express"
import { writeFile } from './helpers/write-helper.js'
import cors from "cors"


dotenv.config()

const app = express()
app.use(express.json())

app.use(cors({origin: "*"}))

app.get("/courses", async(req, res) =>{
   let courses = await readFile("itCourses")
   res.status(200).json({
      data: courses
   })
})

app.post("/courses", async(req, res) => {
    const {title, price, url} = req.body
    console.log(req.body);

    let courses = await readFile("itCourses")
    let course = {
        id: courses.at(-1)?.id ? courses.at(-1)?.id + 1 : 1,
        title,
        price,
        image: "frontend.jpg",
        url
    }

    courses.push(course)

    await writeFile("itCourses", courses)

    res.sendStatus(201).json({
        data: courses
    })
})






const bot = new TelegramBot(process.env.API_TOKEN, {
    polling: true
})


bot.onText(/\/start/, message => {
    console.log(message)
    bot.sendMessage(message.chat.id, `Assalomu aleykum ${message.from.first_name}`, {
        reply_markup: {
            keyboard: keyboards.menu,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
})

bot.on('message', (message) => {
    const chatId = message.chat.id

    if (message.text == keyboardNames.mainCoureses) {
        bot.sendMessage(chatId, 'Tanlang ✅', {
            reply_markup: {
                keyboard: keyboards.ItCourses,
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })
    }

})

bot.on('message', (message) => {
    const chatId = message.chat.id

    const course = readFile('itCourses').find(e => e.title === message.text)

    if (course) {
        courseHandler(bot, chatId, course)
    }
    if (message.text == keyboardNames.back) {
        bot.sendMessage(message.chat.id, `Ok 👌🏻`, {
            reply_markup: {
                keyboard: keyboards.menu,
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })
    }
})

bot.on('callback_query', (message) => {
    const chatId = message.message.chat.id

    // console.log(message)
    // const course = readFile('itCourses').find(e => e.callback_data === message.data)

    if (message.data === 'data') {
        bot.sendMessage(chatId, 'Kantaktingizni yuboring', {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: 'kontakt yuborish 📞',
                            request_contact: true
                        }
                    ]
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })
    }
})


app.listen(9000, () =>{
    console.log("9000 da ishladi");
})