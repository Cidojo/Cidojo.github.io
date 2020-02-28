import './sticky-head';
import initAlignProjects from './align-projects';

const init = () => {
  initAlignProjects();
};

window.addEventListener('DOMContentLoaded', () => {
  init();
});
