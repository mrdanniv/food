const products = {
  plainBurger: {
    name: "Гамбургер простой",
    cost: 10000,
    kcall: 100,
    amount: 0,
    get summ() {
      return this.cost * this.amount;
    },
    get summKcall() {
      return this.kcall * this.amount;
    },
  },

  freshBurger: {
    name: "Гамбургер FRESH",
    cost: 20500,
    kcall: 0,
    amount: 0,
    get summ() {
      return this.cost * this.amount;
    },
    get summKcall() {
      return this.kcall * this.amount;
    },
  },

  freshCombo: {
    name: "FRESH COMBO",
    cost: 31900,
    kcall: 400,
    amount: 0,
    get summ() {
      return this.cost * this.amount;
    },
    get summKcall() {
      return this.kcall * this.amount;
    },
  },
};

const extraProducts = {
  doubleMayonnaise: {
    name: "Двойной майнонез",
    count: 2000,
    kcall: 50,
  },
  lettuce: {
    name: "Салатный лист",
    count: 500,
    kcall: 10,
  },
  cheese: {
    name: "Сыр",
    count: 1000,
    kcall: 100,
  },
};

const btns = document.querySelectorAll(".main__product-btn");
btns.forEach((element) => {
  element.addEventListener("click", function (event) {
    event.preventDefault();
    add(this);
  });
});

/*кнопка с прибавкой и обнулением*/

function add(btn) {
  const symbol = btn.getAttribute("data-symbol");
  const parent = btn.closest(".main__product");
  const parentId = parent.getAttribute("id");

  // Проверка клика
  if (symbol == "+") {
    products[parentId].amount++;
  } else if (symbol == "-" && products[parentId].amount > 0) {
    products[parentId].amount--;
  } else if (symbol == "x") {
    // Если нажали на крестик — полностью обнуляем количество
    products[parentId].amount = 0;
  }

  // Обновляем всё на экране
  const output = parent.querySelector(".main__product-num");
  const productPrice = parent.querySelector(".main__product-price span");
  const productKcall = parent.querySelector(".main__product-kcall span");

  output.innerHTML = products[parentId].amount;
  productPrice.innerHTML = products[parentId].summ;
  productKcall.innerHTML = products[parentId].summKcall;
}

const checkboxes = document.querySelectorAll(".main__product-checkbox"); // extraProducts

checkboxes.forEach((el) => {
  el.addEventListener("click", function () {
    // меняем а не перезаписываем
    addIngradient(this);
  });
});

function addIngradient(checkBox) {
  const parent = checkBox.closest(".main__product"); //родитель//
  const parentID = parent.getAttribute("id"); // all burgers //
  const checkID = checkBox.getAttribute("data-extra"); // extraProducts //
  const isCheck = checkBox.checked;

  if (isCheck) {
    products[parentID].kcall += extraProducts[checkID].kcall;
    products[parentID].cost += extraProducts[checkID].count;
  } else {
    products[parentID].kcall -= extraProducts[checkID].kcall;
    products[parentID].cost -= extraProducts[checkID].count;
  }

  const productPrice = parent.querySelector(".main__product-price span");
  const productKcall = parent.querySelector(".main__product-kcall span");

  productPrice.innerHTML = products[parentID].summ;
  productKcall.innerHTML = products[parentID].summKcall;
}

const addCart = document.querySelector(".addCart");
const receipt = document.querySelector(".receipt");
const receiptWindow = document.querySelector(".receipt__window");
const receiptWindowOut = document.querySelector(".receipt__window-out");
const receitWindowBtn = document.querySelector(".receipt__window-btn");

addCart.addEventListener("click", function (element) {
  element.preventDefault();
  const NewProducts = [];
  let totalPrice = 10000; // доставка
  let totalKcall = 0; // калории
  let totalName = ""; // название

  for (const key in products) {
    const element = products[key]; // берем каждый продукт его порядковый номер //

    if (element.amount > 0) {
      NewProducts.push(element); // добавляем в массив //

      for (const key2 in element) {
        if (element[key2] === true) {
          element.name += "\n + " + extraProducts[key2].name;
        }
      }
    }
  }
  NewProducts.forEach((element) => {
    totalName +=
      "\n" + element.name + `\nВ количестве ${element.amount} штук. \n`;
    totalPrice += element.cost; // тоесть дозаписываем в общую сумму, я взял от продукта//
    totalKcall += element.kcall; // ну и также калории от туда
  });

  if (NewProducts.length > 0) {
    //  проверка что пользователь что-то заказал а не пустую строку
    receiptWindowOut.innerHTML = `\n Вы заказали: \n${totalName}\nВсего к оплате: ${totalPrice} рублей\n \nИтого калорий: ${totalKcall} калорий`;

    receipt.style.display = "flex";

    setTimeout(() => {
      receipt.style.opacity = 1;
      receiptWindow.style.top = "15%";
    }, 1000);
    document.body.style.overflow = "hidden";

    // тут остлось обнулить всё, чтобы не ломалось, но тут конечно было тяжело
    const output = document.querySelectorAll(".main__product-num");
    const spanPrice = document.querySelectorAll(".main__product-price span");
    const spanKcall = document.querySelectorAll(".main__product-kcall span");

    output.forEach((element, index) => {
      element.innerHTML = 0;
      spanPrice[index].innerHTML = 0;
      spanKcall[index].innerHTML = 0;
    });
  } else {
    alert("Вы ничего не заказали!, выберите что-нибудь");
  }
  // console.log(NewProducts);

  receitWindowBtn.addEventListener("click", () => {
    window.location.reload();
  });
});

//********* домашка, рекурсия *********//

const timerExtra = document.querySelector(".header__timer-extra");
let speed = 20; // начальная скорость

function lvlAnimation() {
  let currentLvl = Number(timerExtra.innerHTML);

  if (currentLvl < 100) {
    currentLvl++;
    timerExtra.innerHTML = currentLvl;

    //условие по заданию, если больше 50 - если больше 80 --
    if (currentLvl > 50 && currentLvl <= 80) {
      speed = 60;
    } else if (currentLvl > 80) {
      speed = 120;
    }
    // обязательно вызов рекурсии
    setTimeout(lvlAnimation, speed);
  }
}
lvlAnimation();

// 2 //

const productInfo = document.querySelectorAll(".main__product-info");
const view = document.querySelector(".view");
const viewImg = view.querySelector("img");
const viewClose = document.querySelector(".view__close");

productInfo.forEach((info) => {
  info.addEventListener("dblclick", function () {
    const img = this.querySelector("img");
    const src = img.getAttribute("src");

    viewImg.setAttribute("src", src);
    view.classList.add("active");
  });
});

viewClose.addEventListener("click", () => {
  view.classList.remove("active");
});
console.log(productInfo);
