/*
 * @Author: your name
 * @Date: 2021-07-18 18:59:52
 * @LastEditTime: 2021-07-19 23:39:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/icpview/next-i18next.config.js
 */
module.exports = {
    i18n: {
        locales: [
            'en',
            'zh'
        ],
        defaultLocale: 'zh',
        backend: {
            loadPath: 'locales/{{lng}}/{{ns}}'
        },
        debug: true,
        ns: ['common'],
        serializeConfig: false
    }
    // react: {
    //     useSuspense: false,
    //     wait: true
    // }
}
