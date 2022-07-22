import { createCourseNote, deleteCouseNote } from './create_article.js'

document.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('button--add') ||
    e.target.src?.includes('add')
  ) {
    console.log('click add working')
    createCourseNote()
  } else if (e.target.closest('article').id !== '1') {
    if (
      e.target.classList.contains('button--delete') ||
      e.target.src.includes('delete')
    ) {
      console.log('click delete working')
      deleteCouseNote(e.target.closest('article'))
    }
  }
})
