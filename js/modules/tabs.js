function tabs(params) {
  let tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");
  //назначили переменные

  function hideTabContent() {
    //функция скрытия
    tabsContent.forEach((item) => {
      item.classList.add("hide"); //display none
      item.classList.remove("show", "fade"); //дисплэй блок и 1.5 сек
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active"); //убираем подчеркивание
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active"); // добавляем подчеркивание
  }
  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    let target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

module.exports = tabs;
