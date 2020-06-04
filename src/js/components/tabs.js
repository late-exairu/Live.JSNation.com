const tabLink = $('.js-tab-link');
const tabClose = $('.js-tab-close');

const initiateTemplate = (el) => {
  const templateEl = el.querySelector('template');

  if (templateEl) {
    const templateContent = templateEl.content.cloneNode(true);
    el.appendChild(templateContent);
  }
};

tabLink.on('click', function(e) {
  if ($(this).hasClass('is-active')) {
    return;
  } else {
    const tabIndex = $(this).data('tab');
    const parent = $(this).parents('.js-tabs-container');
    parent.find('.js-tab-link').removeClass('is-active');
    parent.find('.js-tab-link').removeClass('is-scroll');
    parent.find('.js-tab').removeClass('is-active');
    $(this).addClass('is-active');
    if ($(window).width() < 768) {
      $(this).addClass('is-scroll');
      setTimeout(() => {
        $(this).removeClass('is-scroll');
      }, 2000);
    }
    const jsTabContainer = parent.find(`.js-tab[data-tab="${tabIndex}"]`);
    jsTabContainer.addClass('is-active');

    initiateTemplate(jsTabContainer.get(0));
  }
});

// initiate first active tab
initiateTemplate(document.querySelector('.js-tab.is-active'));

tabClose.on('click', function() {
  const parent = $(this).parents('.js-tabs-container');
  parent.find('.js-tab-link').removeClass('is-active');
  parent.find('.js-tab').removeClass('is-active');
});
