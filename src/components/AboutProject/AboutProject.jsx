import Wrapper from '../Wrapper/Wrapper'
import './AboutProject.css'


function AboutProject() {
    return (
        <section id={"aboutProject"} className="project page__project">
            <Wrapper>
                <h2 className="project__title">О проекте</h2>
                <div className="project__container">
                    <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
                    <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    <p className="project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
                <div className="project__progress">
                    <p className="project__progress-line project__progress-line_type_backend" >1 неделя</p>
                    <p className="project__progress-line">4 недели</p>
                    <span className="project__text">Back-end</span>
                    <span className="project__text">Front-end</span>
                </div>
            </Wrapper>
        </section>
    )
}
export default AboutProject