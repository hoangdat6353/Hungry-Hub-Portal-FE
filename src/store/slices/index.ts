import userReducer from '@app/store/slices/userSlice';
import authReducer from '@app/store/slices/authSlice';
import nightModeReducer from '@app/store/slices/nightModeSlice';
import themeReducer from '@app/store/slices/themeSlice';
import pwaReducer from '@app/store/slices/pwaSlice';
import productReducer from '@app/store/slices/productSlice';
import categoryReducer from '@app/store/slices/categorySlice';
import orderReducer from '@app/store/slices/orderSlice';

export default {
  user: userReducer,
  auth: authReducer,
  nightMode: nightModeReducer,
  theme: themeReducer,
  pwa: pwaReducer,
  product: productReducer,
  category: categoryReducer,
  order: orderReducer,
};
