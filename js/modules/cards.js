import { GetResourse } from "../services/services";

function cards() {
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
}

export default cards;
