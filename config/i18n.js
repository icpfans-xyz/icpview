/*
 * @Author: your name
 * @Date: 2021-07-17 17:08:38
 * @LastEditTime: 2021-07-17 17:10:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/icpview/config/i18n.js
 */
import LanguageDetector from 'i18next-browser-languagedetector'
import i18n from 'i18next'
import enUsTrans from '../public/locales/en-us.json'
import zhCnTrans from '../public/locales/zh-cn.json'
import { initReactI18next } from 'react-i18next'

i18n.use(LanguageDetector) // 嗅探当前浏览器语言
    .use(initReactI18next) // init i18next
    .init({
        // 引入资源文件
        resources: {
            en: {
                translation: enUsTrans
            },
            zh: {
                translation: zhCnTrans
            }
        },
        // 选择默认语言，选择内容为上述配置中的key，即en/zh
        fallbackLng: 'zh',
        debug: false,
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    })

export default i18n