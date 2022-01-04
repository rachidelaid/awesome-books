const timeParagraph = new Date();

document.querySelector('.date').textContent = timeParagraph;
const links = document.querySelectorAll('.links a');
links.forEach((link) => {
  link.addEventListener('click', () => {
    if (link.classList.contains('active')) return;

    links.forEach((anchor) => anchor.classList.remove('active'));

    link.classList.add('active');

    document.querySelector('.flex').classList.remove('flex');

    document.querySelector(`.${link.id}`).classList.add('flex');
  });
});
