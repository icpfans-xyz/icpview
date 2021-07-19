/*
 * @Author: your name
 * @Date: 2021-07-01 11:42:41
 * @LastEditTime: 2021-07-19 17:37:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/idena-explorer/next.config.js
 */
const withSass = require('@zeit/next-sass')
const withFonts = require('nextjs-fonts')
const { i18n } = require('./next-i18next.config')
module.exports = {
    i18n,
    // eslint: {
    //     // Warning: Dangerously allow production builds to successfully complete even if
    //     // your project has ESLint errors.
    //     ignoreDuringBuilds: true,
    // },
    withSass: withSass(withFonts())
}
