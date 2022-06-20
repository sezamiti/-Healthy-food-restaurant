function calc(params) {
  const result = document.querySelector(".calculating__result span");

  let sex, height, weight, age, ratio;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }

  function initLocalSettings(selector, activClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activClass);
      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(activClass);
      }

      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activClass);
      }
    });
  }

  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function calcTotal() {
    //проверка на буквы. Если false, тогда условие работает и пишет "____"
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return; // возвращает NaN
    }

    if (sex == "female") {
      result.textContent = Math.round(
        (447, 6 + (9, 2 * weight) + (3, 1 * height) - (4, 3 * age)) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88, 36 + (13, 4 * weight) + (4, 8 * height) - (5, 7 * age)) * ratio
      );
    }
  }

  calcTotal();
  function getStaticInformation(selector, activClass) {
    const elements = document.querySelectorAll(selector); // ищет клики по диву

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio"); //если он клинкун по диву с атрибутом, мы забираем его атрибут, а если он кликнул на пол(у него нет атрибута) то условие false
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }

        elements.forEach((elem) => {
          elem.classList.remove(activClass);
        });
        e.target.classList.add(activClass);

        calcTotal();
      });
    });
  }

  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      //подсветка при ошибке
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }

      //если не число тогда условие calcTotal не сработает и будет NaN, то есть false .
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");

  //my test

  //

  // showSlides(slideIndex); //вызов функ
  // if (slides.length < 10) {
  //   //если меньше 10
  //   total.textContent = `0${slides.length}`; //добав 0
  // } else {
  //   total.textContent = slides.length; //тогда не надо
  // }

  // //паказ/скрытие слайдов
  // function showSlides(n) {
  // if (n > slides.length) {
  //   //если слайдиндекс больше количества
  //   slideIndex = 1; //тогда вернуться на 1 слайд
  // }
  //   // наоборот
  //   if (n < 1) {
  //     slideIndex = slides.length; //слайд идет на полседнюю
  //   }

  //   //скрыть все слайды кроме нужного
  //   slides.forEach((item) => (item.style.display = "none")); //скрыть все слайды

  //   slides[slideIndex - 1].style.display = "block"; // показать первый слайд, тк инд =1, а нужно 0

  // if (slides.length < 10) {
  //   current.textContent = `0${slideIndex}`; //добав 0
  // } else {
  //   total.textContent = slideIndex; //не надо
  // }
  // }

  // //функция добавления +1 в n
  // function plusSlides(n) {
  //   showSlides((slideIndex += n));
  // }

  // prev.addEventListener("click", () => {
  //   plusSlides(-1);
  // });

  // next.addEventListener("click", () => {
  //   plusSlides(1);
  // });
  //my test
}

module.exports = calc;
