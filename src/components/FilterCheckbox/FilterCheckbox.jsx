import './FilterCheckbox.css'

function FilterCheckbox({ isShort, handleSearch, firstEntrance, }) {
        return (
        <label className={`filter__container-label ${firstEntrance && 'filter__container-label_disabled'}`}>
            <div className='filter__input-container'>
            <input type="checkbox" className='filter__ckeck' onChange={() => handleSearch()} disabled={firstEntrance}/>
            <svg className='filter__check-svg' width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="smalltumb">
                <rect
                    className={`filter__check-svg-rect ${!isShort ? 'filter__check-svg-rect_active' : ''}`}
                    id="tumb__COLOR:tumbler-on" width="36" height="20" rx="10" fill="#2BE080"
                />
                <circle
                    className={`filter__check-svg-circle ${!isShort ? 'filter__check-svg-circle_active' : ''}`}
                    id="tumb__COLOR:tumbler-on-2" cx="26" cy="10" r="8" fill="white"
                />
                </g>
            </svg>
            </div>
            <span className='filter__check-text'>Короткометражки</span>
        </label>
        )
}
export default FilterCheckbox