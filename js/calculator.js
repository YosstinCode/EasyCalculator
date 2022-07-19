const $ = (q) => document.querySelector(q)
const $$ = (q) => document.querySelectorAll(q)

$()
$$()

document.querySelectorAll('.button--add').forEach((buttonAdd) => {
  buttonAdd.addEventListener('click', () => {
    document.querySelector('.form__courses').innerHTML += `
    <article class="form__course">
    <div class="form__course__wrapper">
        <div class="form__course__wrapper__flex">
            <h4 class="form__course__wrapper__flex__course">Teoria de sistemas sociotecnicos</h4>
            <div class="form__course__wrapper__flex__credits">
                <h5 class="form__course__wrapper__flex__credits__text">Creditos:</h5>
                <input class="form__course__wrapper__flex__credits__input" type="number" required>
            </div>
        </div>
        <input class="form__course__wrapper__note" type="number" required>
    </div>
    <div class="form__course__button-wrapper">
        <button type="button" class="form__course__button-wrapper__button button--add"><img class="form__course__button-wrapper__button__img" src="../static/img/icon_add.svg"
                alt="add"></button>
        <button type="button" class="form__course__button-wrapper__button button--delete"><img class="form__course__button-wrapper__button__img" src="../static/img/icon_delete.svg"
                alt="delete"></button>
    </div>
</article>
    `
  })
})
