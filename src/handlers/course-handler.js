import { join } from 'path'
// import keyboardNames from '../keyboards/keyboard-names'
import keyboards from '../keyboards/keyboards.js'

export default (bot, chatId, course) => {
    bot.sendPhoto(chatId, join(process.cwd(), 'src', 'imgs', course.image), {
        caption: `
            <i>${course.title}</i>\n
            <span class="tg-spoiler">Narxi:${course.price}</span>
            `,
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: course.title,
                        callback_data: 'data'                  },
                    {
                        text: 'url',
                        callback_data: 'url',
                        url: course.url
                    }
                ]
            ]
        }
    })
}