import { readFile } from "../helpers/read-helper.js"
import keyboardNames from "./keyboard-names.js"

const ITcourses = readFile('itCourses')

const result = []

for (let i = 0; i < ITcourses.length; i += 2) {
    const courselist = []

    if (ITcourses[i]) {
        courselist.push(
            {
                text: ITcourses[i]?.title
            }, 
            {
                text: ITcourses[i+1]?.title
            }
        )
    }

    result.push(courselist.filter(e => e.text))
}

result.push([ {
    text: keyboardNames.back
} ])

console.log(result)

export default {
    menu: [
        [ 
            {
                text: keyboardNames.mainCoureses
            }, 
            {
                text: keyboardNames.languageCourses
            }
        ]
    ],
    ItCourses: result
}