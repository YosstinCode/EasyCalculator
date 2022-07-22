const $c = (el, cls = null, ...args) => {
  const element = document.createElement(el)
  if (cls) {
    if (args.length) {
      element.classList.add(cls, args)
    } else {
      element.classList.add(cls)
    }
  }
  return element
}

const setAttributes = (el, attrs) => {
  for (const key in attrs) {
    if (key === 'required') {
      el.setAttribute(key, attrs[key])
    } else {
      el.setAttribute(key, attrs[key])
    }
  }
}

export const createCourseNote = () => {
  const $formCourses = document.querySelector('.form__courses')

  const $articleFormCourse = $c('article', 'form__course')
  $articleFormCourse.setAttribute('id', document.querySelectorAll('.form__course').length + 1)
  const $divFormCourseWrapper = $c('div', 'form__course__wrapper')
  const $divFormCourseWrapperFlex = $c('div', 'form__course__wrapper__flex')

  const $inputFormCourseWrapperFlexCourse = $c('input', 'form__course__wrapper__flex__course')
  const inputFormCourseWrapperFlexCourseAttributes = {
    placeholder: 'Materia',
    value: 'Calculo Infinitesimal'
  }
  setAttributes($inputFormCourseWrapperFlexCourse, inputFormCourseWrapperFlexCourseAttributes)

  const $divFormCourseWrapperFlexCredits = $c('div', 'form__course__wrapper__flex__credits')
  const $h5FormCourseWrapperFlexCreditsText = $c('h5', 'form__course__wrapper__flex__credits__text')
  $h5FormCourseWrapperFlexCreditsText.innerText = 'Creditos:'

  const $inputFormCourseWrapperFlexCreditsInput = $c('input', 'form__course__wrapper__flex__credits__input')
  const inputFormCourseWrapperFlexCreditsInputAttributes = {
    type: 'number',
    min: '0',
    required: ''
  }
  setAttributes($inputFormCourseWrapperFlexCreditsInput, inputFormCourseWrapperFlexCreditsInputAttributes)

  const $inputFormCourseWrapperNote = $c('input', 'form__course__wrapper__note')
  const inputFormCourseWrapperNoteAttributes = {
    type: 'number',
    min: '0',
    max: '5.0',
    step: '0.1',
    required: ''
  }
  setAttributes($inputFormCourseWrapperNote, inputFormCourseWrapperNoteAttributes)

  const $divFormCourseButtonWrapper = $c('div', 'form__course__button-wrapper')

  const $buttonFormCourseButtonWrapperButtonAdd = $c('button', 'form__course__button-wrapper__button', 'button--add')
  $buttonFormCourseButtonWrapperButtonAdd.setAttribute('type', 'button')

  const $imgFormCourseButtonWrapperButtonImgAdd = $c('img', 'form__course__button-wrapper__button__img')
  const imgFormCourseButtonWrapperButtonImgAddAttributes = {
    src: '../static/img/icon_add.svg',
    alt: 'add'
  }
  setAttributes($imgFormCourseButtonWrapperButtonImgAdd, imgFormCourseButtonWrapperButtonImgAddAttributes)

  const $buttonFormCourseButtonWrapperButtonDelete = $c('button', 'form__course__button-wrapper__button', 'button--delete')
  $buttonFormCourseButtonWrapperButtonDelete.setAttribute('type', 'button')

  const $imgFormCourseButtonWrapperButtonImgDelete = $c('img', 'form__course__button-wrapper__button__img')
  const imgFormCourseButtonWrapperButtonImgDeleteAttributes = {
    src: '../static/img/icon_delete.svg',
    alt: 'delete'
  }
  setAttributes($imgFormCourseButtonWrapperButtonImgDelete, imgFormCourseButtonWrapperButtonImgDeleteAttributes)

  // add elements

  $articleFormCourse.append($divFormCourseWrapper)
  $articleFormCourse.append($divFormCourseButtonWrapper)

  $divFormCourseWrapper.append($divFormCourseWrapperFlex)
  $divFormCourseWrapper.append($inputFormCourseWrapperNote)

  $divFormCourseWrapperFlex.append($inputFormCourseWrapperFlexCourse)
  $divFormCourseWrapperFlex.append($divFormCourseWrapperFlexCredits)

  $divFormCourseWrapperFlexCredits.append($h5FormCourseWrapperFlexCreditsText)
  $divFormCourseWrapperFlexCredits.append($inputFormCourseWrapperFlexCreditsInput)

  $divFormCourseButtonWrapper.append($buttonFormCourseButtonWrapperButtonAdd)
  $divFormCourseButtonWrapper.append($buttonFormCourseButtonWrapperButtonDelete)

  $buttonFormCourseButtonWrapperButtonAdd.append($imgFormCourseButtonWrapperButtonImgAdd)
  $buttonFormCourseButtonWrapperButtonDelete.append($imgFormCourseButtonWrapperButtonImgDelete)

  $formCourses.append($articleFormCourse)
}

export const deleteCouseNote = (el) => {
  const $formCourses = document.querySelector('.form__courses')

  $formCourses.removeChild(el)
}
