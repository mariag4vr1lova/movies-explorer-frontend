import { Link } from "react-router-dom"
import './AboutMe.css'
import Wrapper from "../Wrapper/Wrapper"
import photo from '../../images/IMG.png'

function AboutMe() {
    return (
        <section className="about-me page__about-me">
            <Wrapper>
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__information">
                    <h3 className="about-me__name">Мария</h3>
                    <p className="about-me__subtitle">Банковский работник, 23 года</p>
                    <p className="about-me__info">Я родилась и живу в Москве,
                    закончила факультет экономики РЭУ им. Г.В.Плеханова. У меня есть маленький сын.
                    Я люблю танцевать, а ещё увлекаюсь сноубордингом.
                    Недавно начала кодить. С 2018 года работаю в Сбербанке России.</p>
                    <Link to={'https://github.com/mariag4vr1lova'} target='_blank' className="about-me__link">Github</Link>
                </div>
                <img src={photo} alt="#" className="about-me__image" />
            </div>
            </Wrapper>
        </section>
    )
}
export default AboutMe