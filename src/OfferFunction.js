export function totalBeforeAfterOfferType(cartItems, codeE) {
  const sortOther = cartItems.filter((x) => x.category !== "Perfume");
  const otherPrice = sortOther.reduce((a, c) => a + c.price * c.qty, 0);
  const sortPerfumes = cartItems.filter((x) => x.category === "Perfume");

  if (codeE === "25FO" && cartItems.length !== 0) {
    const sortOroFiore = cartItems.filter(
      (x) => x.title === "Oro" || x.title === "Fiore"
    );
    const itemsOroFiorePriceBefore = sortOroFiore.reduce(
      (a, c) => a + c.price * c.qty,
      0
    );

    const discountFioreOro = itemsOroFiorePriceBefore * 0.25;
    const total = itemsOroFiorePriceBefore - discountFioreOro;

    const sortOtherWithoutOroFiore = cartItems.filter(
      (x) => x.title !== "Oro" && x.title !== "Fiore"
    );

    let otherPriceWithoutOroFiore = sortOtherWithoutOroFiore.reduce(
      (a, c) => a + c.price * c.qty,
      0
    );

    return {
      before: itemsOroFiorePriceBefore + otherPriceWithoutOroFiore,
      after: total,
      offerType: [2],
      otherPrice: otherPriceWithoutOroFiore,
    };
  }

  if (codeE === "RYD1122" && cartItems.length !== 0) {
    // discount 25% for all products

    const itemsPriceBefore = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const discount = itemsPriceBefore * 0.25;
    const total = itemsPriceBefore - discount;

    //offerType > 1 in the cart to run the offer
    return {
      before: itemsPriceBefore,
      after: total,
      offerType: [2],
      otherPrice: 0,
    };
  }

  // console.log(sortPerfumes);

  if (sortPerfumes.length) {
    const itemsPriceBefore = sortPerfumes.reduce((a, c) => {
      return a + c.price * c.qty;
    }, 0);

    function qtyToArray(max, qty) {
      const qtyI = Array(max).fill(0);
      for (let index = 0; index < qty; index++) {
        qtyI.unshift(1);
        qtyI.pop();
      }
      return qtyI;
    }

    function findMaxQty(c) {
      const arrMax = c.map((x) => x.qty);
      let arr = [...arrMax];
      return Math.max(...arr);
    }

    const newBasket = sortPerfumes.map((item) => {
      const qty = item.qty;
      const qtyI = qtyToArray(findMaxQty(sortPerfumes), qty);
      return { ...item, qtyI: qtyI };
    });

    //array of perfumes

    const vArray = function operationsOnQtyI(newBasket) {
      const arr = [];

      for (let index = 0; index < newBasket.length; index++) {
        arr.push(newBasket[index].qtyI);
      }
      return arr;
    };

    const totalItemsVerticallyArray = vArray(newBasket).reduce(function (
      array1,
      array2
    ) {
      return array1.map(function (value, index) {
        return value + array2[index];
      }, 0);
    });

    function calcOffers(arr = totalItemsVerticallyArray) {
      const itemsDiscountArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 4) {
          itemsDiscountArr.push(4 * 155);
        } else if (arr[i] === 3) {
          itemsDiscountArr.push(Math.round(3 * 166.666));
        } else if (arr[i] === 2) {
          itemsDiscountArr.push(2 * 175);
        } else {
          itemsDiscountArr.push(1 * 199);
        }
      }
      return itemsDiscountArr;
    }

    let xOffer = calcOffers();
    let total = xOffer.reduce((a, c) => a + c, 0);

    // return [
    //   { before: itemsPriceBefore },
    //   { after: total },
    //   { offerType: totalItemsVerticallyArray },
    //   { otherPrice: otherPrice },
    // ];
    return {
      before: itemsPriceBefore + otherPrice,
      after: total,
      offerType: totalItemsVerticallyArray,
      otherPrice: otherPrice,
    };
  } else {
    // return [
    //   { before: 0 },
    //   { after: 0 },
    //   { offerType: [0] },
    //   { otherPrice: otherPrice },
    // ];
    return { before: 0, after: 0, offerType: [0], otherPrice: otherPrice };
  }
}

// sort Object
function sortObject(arr) {
  arr.map((obj) => {
    let mm = Object.keys(obj)
      .sort()
      .reduce((a, v) => {
        a[v] = obj[v];
        return a;
      }, {});
    console.log("mm", mm);
    return mm;
  });
}
