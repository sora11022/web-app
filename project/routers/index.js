const authRouter = require('./auth.router');
const categoryRouter = require('./category.router');
const userRouter = require('./user.router');
const productRouter = require('./product.router');
const productImageRouter = require('./productImages.router');
const cartRouter = require('./cart.router')
const ErrorHandle = require('../middlewares/error.handle');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/category', categoryRouter);
  app.use('/api/accounts', userRouter);
  app.use('/api/products', productRouter);
  app.use('/api/products/images', productImageRouter);
  app.use('/api/cart', cartRouter)

  app.use(ErrorHandle);
};
