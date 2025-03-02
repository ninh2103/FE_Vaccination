// hooks/useRouterElement.js

import { useRoutes } from 'react-router-dom';
import { path } from '@/core/constants/path'; // Đảm bảo bạn có file constants/path.js hoặc sửa theo cấu trúc thư mục của bạn
import HomePage from '@/pages/home/HomePage';
import PriceList from '@/components/homepage/PriceList';  // Giả sử đây là component PriceList của bạn
import RegisterPage from '@/components/homepage/OrderVaccinePage';


function useRouterElement() {
  const routes = [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/pricelist',
      element: <PriceList />,
    },
    {
      path: '/register',  
      element: <RegisterPage />,
    },
    // Thêm các route khác vào đây nếu cần
  ];

  // Dùng hook useRoutes để tạo ra các route
  const routerDom = useRoutes(routes);
  
  return routerDom;
}

export default useRouterElement;
