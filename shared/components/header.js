import Head from 'next/head'

export default function Header() {
    return (
        <Head>
            <title>ICPView</title>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="chrome=1" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"
            />
            <meta name="description" content="ICPView Dfinity Explorer" />
        </Head>
    )
}
