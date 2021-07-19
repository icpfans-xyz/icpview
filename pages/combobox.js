/*
 * @Author: your name
 * @Date: 2021-07-19 03:37:46
 * @LastEditTime: 2021-07-19 21:54:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/icpview/pages/combobox.js
 */
/* eslint-disable react/prop-types */
import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
const Combobox = ({ title = '', itemsList = [], onItemClick }, itemsTitle = '') => {
    const { t } = useTranslation('common')
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            className="combobox-toggle"
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault()
                onClick(e)
            }}>
            {children}
        </a>
    ))

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                {title}
                <img
                    src="/static/images/dropdown-menu.png"
                    alt="toggle-arrow"
                    width="16"
                    style={{ margin: '0 0 0.2rem 0.5rem' }}
                />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Header>{t('selectLng')}</Dropdown.Header>
                {itemsList.map((lang) => (
                    <Dropdown.Item key={lang.key} onSelect={() => onItemClick(lang.key)} eventKey={lang.key}>
                        {lang.title}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}
export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common'])
    }
})

export default Combobox
