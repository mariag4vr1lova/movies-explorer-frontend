import './Header.css'
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"



function Header({ name, loggedIn }) {
    const { pathname } = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    
    function handelClick() {
        if (isOpen) {
        setIsOpen(false)
        } else {
        setIsOpen(true)
        }
    }

    function clickLink() {
        setIsOpen(false)
    }

    useEffect(() => {
        function closeRovnoResize() {
            if (document.documentElement.clientWidth > '767') {
            setIsOpen(false)
            window.removeEventListener('resize', closeRovnoResize)
        }
    }
        if (isOpen) {
        window.addEventListener('resize', closeRovnoResize)
        return () => window.removeEventListener('resize', closeRovnoResize)
        }
    }, [isOpen])

    return (
    <header className={`header page__header ${name !== 'home' ? 'page__header_type_page' : ''}`}>
        <div>
            <Link to={'/'} className="header__link-home"></Link>
        </div>
        {name === 'home' && !loggedIn ?
        <nav>
            <ul className='header__links-container'>
                <li>
                    <Link to={'/signup'} className="header__signup">Регистрация</Link>
                </li>
                <li>
                    <Link to={'/signin'} className="header__signin">Войти</Link>
                </li>
            </ul>
        </nav>
        :
        <>
        <nav className={`header__nav ${isOpen ? 'header__nav_open' : ''}`}>
            <ul className='header__links-container header__links-container_type_page'>
                <li className='header__link-container'>
                    <Link
                    to={'/'}
                    className={`header__link ${pathname === '/' ? 'header__link_active' : ''}`}
                    onClick={clickLink}>Главная</Link>
                </li>
                <li className='header__link-container'>
                    <Link
                    to={'/movies'}
                    className={`header__link ${pathname === '/movies' ? 'header__link_active' : ''}`}
                    onClick={clickLink}>Фильмы</Link>
                </li>
                <li className='header__link-container'>
                    <Link
                    to={'/saved-movies'}
                    className={`header__link ${pathname === '/saved-movies' ? 'header__link_active' : ''}`}
                    onClick={clickLink}>Сохранённые фильмы</Link>
                </li>
                <li className='header__link-container'>
                    <Link
                    to={'/profile'}
                    className={`header__link header__link_type_account ${pathname === '/profile' ? 'header__link_active' : ''}`}
                    onClick={clickLink}>Аккаунт 
                    <div className='header__account-icon'></div>
                    </Link>
                </li>
            </ul>
            <button type='button' className='header__close-icon' onClick={handelClick}></button>
        </nav>
        <button type='button' className='header__rovno' onClick={handelClick}></button>
        </>
        }
    </header>
    )
}
export default Header