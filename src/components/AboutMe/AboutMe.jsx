import { Link } from "react-router-dom"
import './AboutMe.css'
import Wrapper from "../Wrapper/Wrapper"
import photo from '../../images/IMG.png'

function AboutMe() {
    return (
        <section className="aboutme page__aboutme">
            <Wrapper>
            <h2 className="aboutme__title">Студент</h2>
            <div className="aboutme__container">
                <div className="aboutme__text">
                    <h3 className="aboutme__name">Мария</h3>
                    <p className="aboutme__subtitle">Банковский работник, 23 года</p>
                    <p className="aboutme__description">Я родилась и живу в Москве,
                    закончила факультет экономики РЭУ им. Г.В.Плеханова. У меня есть маленький сын.
                    Я люблю танцевать, а ещё увлекаюсь сноубордингом.
                    Недавно начала кодить. С 2018 года работаю в Сбербанке России.</p>
                    <Link to={'https://github.com/mariag4vr1lova'} target='_blank' className="aboutme__link">Github</Link>
                </div>
                <img src={photo} alt="#" className="aboutme__image" />
            </div>
            </Wrapper>
        </section>
    )
}
export default AboutMe