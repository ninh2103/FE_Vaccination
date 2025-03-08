import React, { useState } from "react";

const warnings = [
  {
    title: "Warning of danger when mothers give antibiotics to children with measles",
    image: "https://www.duocphamvinhgia.vn/wp-content/uploads/2022/10/thuoc-khang-sinh-cho-tre-em-bi-viem-hong.jpg", // Add the image URL here
  },
  {
    title: "Pregnant women with flu are more likely to get worse than normal",
    image: "https://www.vimed.org/wp-content/uploads/2020/07/cach-tri-ho-cho-ba-bau-1-600x400.jpg",
  },
  {
    title: "HPV virus can cause many unexpected cancers!",
    image: "https://ecopharma.com.vn/wp-content/uploads/2024/06/gia-tiem-vac-xin-hpv-co-the-thay-doi-tuy-thuoc-co-so-tiem-chung.jpg",
  },
];

const features = [
    { icon: "🧊", title: "Standard GSP storage", desc: "Vaccines are always guaranteed in quality..." },
    { icon: "👨‍⚕️", title: "A team of experienced doctors", desc: "From a hospital with a lot of experience..." },
    { icon: "📅", title: "Electronic vaccination book", desc: "Remind scientific appointments for the whole family..." },
    { icon: "💰", title: "Buy vaccines conveniently", desc: "With attractive offers" },
];

const images = [
  "https://cdn.tiemchunglongchau.com.vn/unsafe/2560x0/filters:quality(90)/808x298_76e9703d8a.jpg",
  "https://cdn.tiemchunglongchau.com.vn/unsafe/2560x0/filters:quality(90)/Trang_chu_PC_800x289_60aca847fa.jpg",
  "https://vnvc.vn/wp-content/uploads/2022/10/khai-truong-vnvc-hoai-nhon.jpg",
  "https://vnvc.vn/wp-content/uploads/2022/08/thiet-ke-goi-vac-xin-theo-nhu-cau.jpg",
 
];

const Options = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phần Vắc Xin có sẵn */}
        <div className="bg-white p-4 rounded-lg shadow-xl col-span-2">
          <div className="relative group overflow-hidden rounded-lg shadow-md">
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 hover:bg-blue-500 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all"
              onClick={handlePreviousImage}
              aria-label="Hình ảnh trước"
            >
              <span className="text-xl">&#8249;</span>
            </button>

            <img
              src={images[currentImageIndex]}
              alt={`Vaccine ${currentImageIndex + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-lg transition-all duration-500"
              style={{ objectFit: "cover" }} // Ensure the image covers the fixed space
            />

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 hover:bg-blue-500 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all"
              onClick={handleNextImage}
              aria-label="Hình ảnh tiếp theo"
            >
              <span className="text-xl">&#8250;</span>
            </button>

            {/* Dấu chấm điều hướng */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'} cursor-pointer`}
                  onClick={() => setCurrentImageIndex(index)} // Chuyển đến ảnh tương ứng khi click vào dấu chấm
                />
              ))}
            </div>
          </div>
        </div>

        {/* Phần Cảnh báo quan trọng */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-bold text-orange-500">🔥 IMPORTANT WARNING</h3>
          <ul className="mt-2 space-y-2 text-sm font-bold ">
            {warnings.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <p className="text-xs">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Phần Danh sách tính năng */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-md">
            <span className="text-3xl">{feature.icon}</span>
            <div className="ml-3">
              <h4 className="text-sm font-bold">{feature.title}</h4>
              <p className="text-xs">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;
