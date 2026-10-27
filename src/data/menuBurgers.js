export const menuBurgers = [
  {
    id: 'garden-crunch',
    name: 'Garden Crunch',
    category: 'VEGGIE',
    description: 'Crispy garden patty, fresh greens, tomato and our bright herb sauce.',
    price: 219,
    tag: 'GARDEN FRESH',
    image: 'https://www.seriouseats.com/thmb/RUfmJ_967GfAPtq_DMg3IbhZ-A8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2017__06__20170617-bulgogi-burger-matt-clifton-2-8b2b50764af74dedb11c5eda385494bd.jpg',
    imageAlt: 'Garden Crunch veggie burger',
    layers: ['top-bun', 'lettuce', 'tomato', 'veggie-patty', 'cheese', 'bottom-bun'],
  },
  {
    id: 'double-melt',
    name: 'Double Melt',
    category: 'CHEESE',
    description: 'Flame-grilled beef, double cheddar and a rich, silky house sauce.',
    price: 249,
    tag: 'CROWD FAVORITE',
    image: 'https://images.openai.com/static-rsc-4/fuQPmgQwFK4xZ_9AM2nVYw89PE9o0JADLaIJpgO1h_VSLoVvFY0X2bz0PjvcepPOROE1KJH7umuynfQ6op17UKBUkJhkorCWhJlGjsHugrEt6JwUK4I11BrpOxjXgj9uKi-r1VSgOnqtXOKH0mTF3OCz5WoPOmCu6_PLreaaIiEPGToqReMdKtna_LT5M04e?purpose=fullsize',
    imageAlt: 'Double Melt cheeseburger',
    layers: ['top-bun', 'lettuce', 'cheese', 'patty', 'cheese', 'patty', 'bottom-bun'],
  },
  {
    id: 'smoky-bbq',
    name: 'Smoky BBQ',
    category: 'SIGNATURE',
    description: 'Smoky grilled patty, golden cheese, crisp onion and slow BBQ sauce.',
    price: 279,
    tag: 'SLOW GRILLED',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNMYlJn2QwJgyObbXG4IUy7NIBSE2vC3Mc5w-wm6EVzxCDo56Du5Y31Ms&s=10',
    imageAlt: 'Smoky BBQ burger',
    layers: ['top-bun', 'lettuce', 'onion', 'cheese', 'patty', 'bottom-bun'],
  },
  {
    id: 'firehouse',
    name: 'Firehouse Chili',
    category: 'SPICY',
    description: 'A spicy beef stack with melted cheese, jalapeño and a little fire.',
    price: 269,
    tag: 'BRING THE HEAT',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/French_Fries.JPG?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
    imageAlt: 'Firehouse chili burger',
    layers: ['top-bun', 'jalapeno', 'cheese', 'patty', 'jalapeno', 'bottom-bun'],
  },
];

export const formatBurgerPrice = (price) => (
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
);
