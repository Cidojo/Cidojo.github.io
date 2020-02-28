export default () => {
  const titles = document.querySelectorAll('.project__title');

  if (!titles.length) {
    return;
  }

  const getMaxHeight = (elements) => {
    elements.forEach((el) => el.style.height = 'auto');

    return elements.reduce((height, next) => next.offsetHeight > height ? next.offsetHeight : height, 0)
  };

  const alignElements = (elements) => {
    const maxHeight = getMaxHeight(elements);

    elements.forEach((el) => el.style.height = maxHeight + 'px');
  };

  alignElements([...titles]);

  window.addEventListener('resize', () => {
    alignElements([...titles]);
  });
};
