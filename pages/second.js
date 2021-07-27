/*
 * @Author: your name
 * @Date: 2021-07-20 18:35:30
 * @LastEditTime: 2021-07-20 22:57:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/icpview/pages/second.js
 */
import React from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'

export default function Home() {
    const { t, lang } = useTranslation()
    return (
        <>
            <p>{lang} {t('common:block')}</p>
            <Link href="/second" locale="en">
                <a>en</a>
            </Link>

            <Link href="/second" locale="zh">
                <a>zh</a>
            </Link>

            <hr />

            <button onClick={async() => await setLanguage('en')}>EN</button>
            <button onClick={async() => await setLanguage('zh')}>ZH</button>
        </>
    )
}
