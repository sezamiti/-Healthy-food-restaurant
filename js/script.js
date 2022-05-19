//tabs
window.addEventListener("DOMContentLoaded", () => {
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

  //tabs

  //Sliders
  //поймать и затащить в переменные

  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesFiled = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    //если меньше 10
    total.textContent = `0${slides.length}`; //добав 0
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length; //тогда не надо
    current.textContent = slideIndex;
  }

  slidesFiled.style.width = 100 * slides.length + "%";
  slidesFiled.style.display = "flex";
  slidesFiled.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  next.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      //если нажать вперед, то добавиться 500px и у него вырезаем "px"
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesFiled.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesFiled.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });

  //calc

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

  const deadline = "2022-06-27";

  function getTimeRemaining(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date()), //кол-во мс, но с дробьями
      days = Math.floor(t / (1000 * 60 * 60 * 24)), // без дробей в днях
      hours = Math.floor((t / (1000 * 60 * 60)) % 24), // без дробей в часах
      minutes = Math.floor((t / (1000 * 60)) % 60), // без дробей в часах
      seconds = Math.floor((t / 1000) % 60); // без дробей в часах

    return {
      total: t, //мс
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      //Если номер меньше 0 или меньше 10
      return `0${num}`; //тогда добавь 0 к значению
    } else {
      return num; //если нет, то тупо верни обратно
    }
  }
  function setClock(selector, endTime) {
    const timer = document.querySelector(selector), //селектор или .timer
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(upDateClock, 1000); // обновлять страницу каждую секунду

    upDateClock(); // что бы ебанный СЕТинтервал не мешал

    function upDateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = getZero(t.days); //функция getZero
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        //когда время таймера будет 0, отключись
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);

  //Modal
  let modalTriger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerID);
  }

  modalTriger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeMoadal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "visible";
  }

  modal.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeMoadal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modal.classList.contains("show")) {
      console.log(e);
      closeMoadal();
    }
  });

  const modalTimerID = setTimeout(openModal, 50000);
  //Modal

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // Menu cards with class

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...clases) {
      this.src = src;
      this.altimg = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.clases = clases;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 15;
      this.changeToKz();
      // console.log(parentSelector);
    }

    changeToKz() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      // console.log(this.clases);
      if (this.clases.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.clases.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
            <img src=${this.src} alt="${this.src}" />
            <h3 class="menu__item-subtitle">${this.title}"</h3>
            <div class="menu__item-descr">
            ${this.descr}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> тенге/день</div>
        </div>
        `;
      this.parent.append(element);
    }
  }

  const GetResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  // GetResourse("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });
  //forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/054 spinner.svg",
    success: "Спасибо! скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    BindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  function BindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display:block;
      margin: 0 auto`;
      form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);

          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const privModalDialog = document.querySelector(".modal__dialog");

    privModalDialog.classList.add("hide");
    openModal();

    const thnksModal = document.createElement("div");
    thnksModal.classList.add("modal__dialog");
    thnksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" date-close>×</div>
      <div class="modal__title">${message}</div>
    </div>
    `;

    document.querySelector(".modal").append(thnksModal);
    setTimeout(() => {
      thnksModal.remove();
      privModalDialog.classList.add("show");
      privModalDialog.classList.remove("hide");
      closeMoadal();
    }, 4000);
  }

  fetch("http://localhost:3000/menu").then((data) => data.json());
  // .then((res) => console.log(res));
});

// fetch("https://jsonplaceholder.typicode.com/posts", {
//     method: "POST",
//     body: JSON.stringify({ name: "Alex" }),
//     headers: {
//       "content-type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => console.log(json));
// ("use strict");

// console.log("Zapros dannyh");

// const req = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     console.log("podgotovka dannyh ...");

//     const product = {
//       name: "tv",
//       price: 2000,
//     };

//     resolve(product);
//   }, 2000);
// });

// req
//   .then((product) => {
//     return (req2 = new Promise((resolve, reject) => {
//       setTimeout(() => {
//         product.status = "order";
//         resolve(product);
//       }, 2000);
//     }));
//   })
//   .then((data) => {
//     data.modify = true;
//     return data;
//   })
//   .then((data) => {
//     console.log(data);
//   });

// let m = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// let c = [9, 8, 7, 6, 5, 4, 3, 2, 1];
// let sp = [...m, ...c];
// console.log(sp);

// function Get(x, ...y) {
//   console.log(x);
//   console.log(y);
//   y.push(x * 2);
// }
// Get(6, 45271);
