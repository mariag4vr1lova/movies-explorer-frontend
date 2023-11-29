import './Footer.css';

function Footer() {
    return (
    <footer className="footer page__footer">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__container">
            <p className="footer__subtitle">© 2023</p>
            <nav className="footer__links">
            <a href="https://practicum.yandex.ru/" rel="noopener noreferrer" target='_blank' className="footer__link">Яндекс.Практикум</a>
            <a href="https://github.com/" rel="noopener noreferrer" target='_blank' className="footer__link">Github</a>
        </nav>
        </div>
        
    </footer>
    )
}
export default Footer