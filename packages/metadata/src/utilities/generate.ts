// import { writeFile } from "fs"
// import { DefaultAccount, defaultCompanyAccounts } from "../components/_index.js"


// function iterateAndAdd(parameters: {
//     defaultAccounts: Array<Omit<DefaultAccount, "children">>
//     prefix: string
//     length: number
// }): Array<DefaultAccount> {
//     const filteredDefaultAccounts = parameters.defaultAccounts
//         .filter(account => (
//             account.number.toString().length === parameters.length
//             && account.number.toString().startsWith(parameters.prefix)
//         ))

//     if (filteredDefaultAccounts.length === 0) return []

//     const newAccounts: Array<DefaultAccount> = []
//     for (const account of filteredDefaultAccounts) {
//         newAccounts.push({
//             ...account,
//             children: iterateAndAdd({
//                 defaultAccounts: parameters.defaultAccounts,
//                 prefix: account.number.toString(),
//                 length: parameters.length + 1
//             })
//         })
//     }

//     return newAccounts
// }

// const newAccounts = iterateAndAdd({
//     defaultAccounts: defaultCompanyAccounts,
//     prefix: "",
//     length: 1
// })

// writeFile("newCompanyAccounts.json", JSON.stringify(newAccounts), (err) => {
//     if (err) throw err
//     console.log("The file has been saved!")
// })