const cartData = [
  {
    id: 1,
    img: "img1",
    name: "Half sleeve T-shirt",
    color: "Green",
    price: "450",
    // data_attr: 2,
    // total: 900
  },
  {
    id: 2,
    img: "img2",
    name: "Black color T-shirt",
    color: "Black",
    price: "225",
    data_attr: 6,
    total: 225
  },
  {
    id: 3,
    img: "img3",
    name: "Printed T-shirt",
    color: "Black",
    price: "152",
    data_attr: 2,
    total: 304
  },
  {
    id: 4,
    img: "img4",
    name: "Smiley Plain T-shirt",
    color: "Blue",
    price: "145",
    data_attr: 2,
    total: 290
  },
  {
    id: 5,
    img: "img5",
    name: "Full sleeve T-Shirt",
    color: "Light orange",
    price: "138",
    data_attr: 8,
    total: 138
  },
  {
    id: 6,
    img: "img6",
    name: "Sky blue color T-shirt",
    color: "Green",
    price: "152",
    data_attr: 2,
    total: 304
  }
];

const dateFormatter = new Intl.DateTimeFormat("ua", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

/*

orderSummary: {
    grandTotal: "$ 1,857",
    discount: "$ 157",
    shippingCharge: "$ 25",
    estimatedTax: "$ 19.22",
    total: "$ 1744.22",
  },

* */

const productsData = [
  {
    id: 192,
    title: "БИ-2",
    image: "https://storage.concert.ua/JmJ/2/mQ/61a8778ebe867/e8ae.jpg:31-catalog-event_item-desktop",
    description: "Би-2 скучили за Україною й мають чим порадувати шанувальників: вони привезуть своє нове шоу NewBest, наймасштабніше і найбільш видовищне в історії гурту. На гостей концерту чекають захоплююча сценографія й світлове шоу, а окрему увагу гурт традиційно приділить топовому, потужному звуку.",
    price: 300,
    category: 1,
    date: new Date().toDateString(),
    address: "Київ, пр-т Ак. Глушкова, 1"
  },
  {
    id: 193,
    title: "БАСТА",
    image: "https://storage.concert.ua/JmF/2/Wy/61307f755772a/7779.jpg:31-catalog-event_item-desktop ",
    description: "Би-2 скучили за Україною й мають чим порадувати шанувальників: вони привезуть своє нове шоу NewBest, наймасштабніше і найбільш видовищне в історії гурту. На гостей концерту чекають захоплююча сценографія й світлове шоу, а окрему увагу гурт традиційно приділить топовому, потужному звуку.",
    price: 300,
    category: 1,
    date: new Date().toDateString(),
    address: "Київ, пр-т Ак. Глушкова, 1"
  },
  {
    id: 194,
    title: "MARKUL",
    image: "https://storage.concert.ua/JmF/3/4I/61322b832f1b7/f203.png:31-catalog-event_item-desktop",
    description: "Би-2 скучили за Україною й мають чим порадувати шанувальників: вони привезуть своє нове шоу NewBest, наймасштабніше і найбільш видовищне в історії гурту. На гостей концерту чекають захоплююча сценографія й світлове шоу, а окрему увагу гурт традиційно приділить топовому, потужному звуку.",
    price: 300,
    category: 1,
    date: new Date().toDateString(),
    address: "Київ, пр-т Ак. Глушкова, 1"
  },
  {
    id: 1,
    image: "product1",
    name: "Half sleeve T-shirt",
    link: "#",
    category: "T-shirts",
    rating: 5,
    oldPrice: 500,
    newPrice: 405,
    isOffer: true,
    offer: 10,
    reviews: 0,
    specification: [
      { type: "Category", value: "T-shirt" },
      { type: "Brand", value: "Levis" },
      { type: "Size", value: "M" },
      { type: "Color", value: "Red" }
    ],

    features: [
      { icon: "fa fa-caret-right", type: "Fit", value: "Regular fit" },
      { icon: "fa fa-caret-right", type: "", value: "Highest quality fabric" },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Suitable for all weather condition"
      },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Excellent Washing and Light Fastness"
      }
    ],
    colorOptions: [
      { image: "product8", color: "Red" },
      { image: "product7", color: "Black" }
    ]
  },
  {
    id: 2,
    image: "product2",
    name: "Black color T-shirt",
    link: "#",
    category: "T-shirts",
    rating: 5,
    oldPrice: 225,
    newPrice: 175,
    isOffer: true,
    offer: 20,
    reviews: 0,
    specification: [
      { type: "Category", value: "T-shirt" },
      { type: "Brand", value: "Levis" },
      { type: "Size", value: "L" },
      { type: "Color", value: "Light blue" }
    ],
    features: [
      { icon: "fa fa-caret-right", type: "Fit", value: "Regular fit" },
      { icon: "fa fa-caret-right", type: "", value: "Highest quality fabric" },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Suitable for all weather condition"
      },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Excellent Washing and Light Fastness"
      }
    ],
    colorOptions: [
      { image: "product2", color: "Light blue" },
      { image: "product9", color: "Black" }
    ]
  },
  {
    id: 3,
    image: "product3",
    name: "Printed T-shirt",
    link: "#",
    category: "T-shirts",
    rating: 4,
    oldPrice: 177,
    newPrice: 152,
    isOffer: true,
    offer: 14,
    reviews: 0,
    specification: [
      { type: "Category", value: "T-shirt" },
      { type: "Brand", value: "Levis" },
      { type: "Size", value: "XL" },
      { type: "Color", value: "Black" }
    ],
    features: [
      { icon: "fa fa-caret-right", type: "Fit", value: "Regular fit" },
      { icon: "fa fa-caret-right", type: "", value: "Highest quality fabric" },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Suitable for all weather condition"
      },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Excellent Washing and Light Fastness"
      }
    ],
    colorOptions: [
      { image: "product3", color: "Black" },
      { image: "product10", color: "White" }
    ]
  },
  {
    id: 4,
    image: "product4",
    name: "Smiley Plain T-shirt",
    link: "#",
    category: "Hoodies",
    rating: 3,
    oldPrice: 150,
    newPrice: 145,
    isOffer: true,
    offer: 5,
    reviews: 0,
    specification: [
      { type: "Category", value: "T-shirt" },
      { type: "Brand", value: "Levis" },
      { type: "Size", value: "M" },
      { type: "Color", value: "Blue" }
    ],
    features: [
      { icon: "fa fa-caret-right", type: "Fit", value: "Regular fit" },
      { icon: "fa fa-caret-right", type: "", value: "Highest quality fabric" },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Suitable for all weather condition"
      },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Excellent Washing and Light Fastness"
      }
    ],
    colorOptions: [
      { image: "product4", color: "Blue" },
      { image: "product11", color: "Black" }
    ]
  },
  {
    id: 5,
    image: "product5",
    name: "Full sleeve T-Shirt",
    link: "#",
    category: "T-shirts",
    rating: 1,
    oldPrice: 177,
    newPrice: 152,
    isOffer: false,
    offer: 0,
    reviews: 5,
    specification: [
      { type: "Size", value: "S" },
      { type: "Color", value: "Coral" }
    ],
    features: [
      { icon: "fa fa-caret-right", type: "Fit", value: "Regular fit" },
      { icon: "fa fa-caret-right", type: "", value: "Highest quality fabric" },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Suitable for all weather condition"
      },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Excellent Washing and Light Fastness"
      }
    ],
    colorOptions: [
      { image: "product5", color: "Coral" },
      { image: "product12", color: "Black" }
    ]
  },
  {
    id: 6,
    image: "product6",
    name: "Sky blue color T-shirt",
    link: "#",
    category: "T-shirts",
    rating: 5,
    oldPrice: 200,
    newPrice: 100,
    isOffer: true,
    offer: 50,
    reviews: 10,
    specification: [
      { type: "Category", value: "T-shirt" },
      { type: "Brand", value: "Levis" },
      { type: "Size", value: "L" },
      { type: "Color", value: "Green" }
    ],
    features: [
      { icon: "fa fa-caret-right", type: "Fit", value: "Regular fit" },
      { icon: "fa fa-caret-right", type: "", value: "Highest quality fabric" },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Suitable for all weather condition"
      },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Excellent Washing and Light Fastness"
      }
    ],
    colorOptions: [
      { image: "product6", color: "Green" },
      { image: "product13", color: "Black" }
    ]
  }
];

module.exports = {
  cartData,
  productsData,
  dateFormatter,
};
