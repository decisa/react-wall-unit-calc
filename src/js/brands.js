const brands = {
  Tomasella: {
    frame: ["materico", "matte lacquer", "essenza wood", "glossy lacquer"],
    doors: ["matte lacquer", "essenza wood", "glossy lacquer", "something new"]
  }
};

// console.log( brands.Tomasella );

// const { frame, doors } = brands.Tomasella;

// const combinations = {};

// frame.forEach(elem => {
//   combinations[elem] = {};
//   for (const door of doors) {
//     combinations[elem][door] = 0;
//   }
// });

function getAttributesByBrand(brand) {
  return brands[brand];
}
// console.log(JSON.stringify(combinations));
// console.log(combinations);
// console.log(doors);
export default getAttributesByBrand;
