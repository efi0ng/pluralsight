let timer = null;

const IS_FLASHING = 'is-flashing';
const FLASH_TIME = 1500;

function remove_flash(el) {
  if (el.classList.contains(IS_FLASHING)) {
    el.classList.remove(IS_FLASHING);
  }
}

function flash(el) {
  clearTimeout(timer);
  remove_flash(el);
  el.classList.add(IS_FLASHING);

  timer = setTimeout(() => remove_flash(el), FLASH_TIME);
}

module.exports = flash;
