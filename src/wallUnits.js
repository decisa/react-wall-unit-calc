const wallUnits = {
  "Tomasella A054": [
    {
      name: "120cm flap door base unit",
      sku: "10768S",
      price: 478,
      frame: "Materico",
      doors: "Essenza Wood",
      qty: 2
    },
    {
      name: "120cm flap door base unit",
      sku: "10768S",
      price: 478,
      frame: "Materico",
      doors: "Essenza Wood"
    },
    {
      name: "120cm flap upper unit",
      sku: "10769S",
      price: 524,
      frame: "Essenza Wood",
      doors: "Essenza Wood"
    },
    {
      name: "120cm flap upper unit",
      sku: "10769S",
      price: 524,
      frame: "Essenza Wood",
      doors: "Essenza Wood"
    },
    {
      name: "180cm vertical cabinet",
      sku: "11869S",
      price: 725,
      frame: "Materico",
      doors: "Essenza Wood"
    },
    {
      name: "Open element with shelves",
      sku: "14256",
      price: 673,
      frame: "Essenza Wood"
    }
  ]
};

function getWallUnit(unit) {
  return [...wallUnits[unit]].map((elem, ind) => {
    return { ...elem, id: ind, qty: elem.qty || 0 };
  });
}

export default getWallUnit;
