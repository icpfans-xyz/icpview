/*
 * @Author: your name
 * @Date: 2021-07-18 18:59:40
 * @LastEditTime: 2021-07-19 04:18:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/icpview/i18next-scanner.config.js
 */
const AVAILABLE_LANGS = [
    'en',
    'zh'
]

module.exports = {
    input: [
        'pages/*.{js,jsx}',
        'shared/components/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/dist/**'
    ],
    output: './',
    options: {
        debug: true,
        // trans: false,
        func: {
            list: ['t'],
            extensions: ['.js', '.jsx']
        },
        lngs: AVAILABLE_LANGS,
        defaultNs: 'index',
        defaultValue (_lng, _ns, key, options) {
            return options.defaultValue || key
        },
        ns: [
            'index'
            // 'contribute',
            // 'donate',
            // 'download',
            // 'faq',
            // 'flip-challenge',
            // 'guide',
            // 'gitcoin',
            // 'join-idena'
        ],
        resource: {
            loadPath: 'locales/{{lng}}/{{ns}}.json',
            savePath: 'locales/{{lng}}/{{ns}}.json',
            jsonIndent: 2,
            lineEnding: '\n'
        },
        keySeparator: false
    }
}
