export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const getAddProductFormElements = (user) => [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Shop",
    name: "brand",
    componentType: "select",
    options: [
      { id: user?.userName || "" , label: user?.userName || "" },
    ],
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "Chips & Crisps", label: "Chips & Crisps" },
      { id: "Namkeen & Mixtures", label: "Namkeen & Mixtures" },
      { id: "Roasted Snacks", label: "Roasted Snacks" },
      { id: "Baked Goods", label: "Baked Goods" },
      { id: "Pickles & Chutneys", label: "Pickles & Chutneys" },
      { id: "Dips & Sauces", label: "Dips & Sauces" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [

];

 export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};  

 export const brandOptionsMap = {

}; 

export const filterOptions = {
  category: [
    { id: "Chips & Crisps", label: "Chips & Crisps" },
    { id: "Namkeen & Mixtures", label: "Namkeen & Mixtures" },
    { id: "Roasted Snacks", label: "Roasted Snacks" },
    { id: "Baked Goods", label: "Baked Goods" },
    { id: "Pickles & Chutneys", label: "Pickles & Chutneys" },
    { id: "Dips & Sauces", label: "Dips & Sauces" },
    
  ],

}; 

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

export const registesellerrFormControls = [
  {
    name: "userName",
    label: "Shop Name",
    placeholder: "Enter your shop name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
  {
    name: "phone",
    label: "phone",
    placeholder: "Enter your number",
    componentType: "input",
    type: "number",
  },
  {
    name: "address",
    label: "address",
    placeholder: "Enter your password",
    componentType: "input",
    type: "text",
  },
];