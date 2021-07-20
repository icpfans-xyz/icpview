export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-md-7 col-lg-6">
                        <div className="social_list">
                            <a
                                href="https://twitter.com/icpfansxyz"
                                rel="nofollow"
                                target="blank"
                                className="social_list__item">
                                <i className="icon icon--twitter" />
                            </a>
                            <a
                                href="https://t.me/icpfans"
                                rel="nofollow"
                                target="blank"
                                className="social_list__item">
                                <i className="icon icon--telegram" />
                            </a>
                            <a
                                href="https://github.com/icpfans-xyz"
                                rel="nofollow"
                                target="blank"
                                className="social_list__item">
                                <i className="icon icon--github" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center text-center">
                    <div className="col-md-7 col-lg-6">
                        <div className="language row"></div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
