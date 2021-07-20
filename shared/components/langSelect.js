import React from 'react'
import { Dropdown } from 'react-bootstrap'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import i18nConfig from '../../i18n.json'

const { locales } = i18nConfig

const LangSelect = () => {
    const { t, lang } = useTranslation()

    // const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    //     <a
    //         className="combobox-toggle"
    //         href=""
    //         ref={ref}
    //         onClick={(e) => {
    //             e.preventDefault()
    //             onClick(e)
    //         }}>
    //         {children}
    //     </a>
    // ))

    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-custom-components">
                {t(`common:${lang}`)}{' '}
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" fill="white" fillOpacity="0.01" />
                    <path
                        d="M37 18L25 30L13 18"
                        stroke="#666"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                {/* <img
                    src="/static/images/dropdown-menu.png"
                    alt="toggle-arrow"
                    width="16"
                    style={{ margin: '0 0 0.2rem 0.5rem' }}
                /> */}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {locales.map((lng) => (
                    <Dropdown.Item key={lng} eventKey={lng}>
                        <Link href="/" locale={lng} key={lng}>
                            {t(`common:${lng}`)}
                        </Link>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default LangSelect
