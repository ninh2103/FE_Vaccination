import React from 'react';

export default function MessengerButton() {
  const handleMessengerClick = () => {
    window.open('https://m.me/61575699530090', '_blank');
  };

  return (
    <button
      onClick={handleMessengerClick}
      className=" right-4 bottom-4 w-10 h-10 rounded-full bg-[#0084FF] shadow-xl flex items-center justify-center z-50"
      aria-label="Messenger Chat"
    >
      <div className="bg-white w-7 h-7 rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#0084FF"
        >
          <path d="M12.004 2C6.486 2 2 6.028 2 11.041c0 2.859 1.301 5.388 3.37 7.151V22l3.096-1.7c1.065.296 2.197.456 3.538.456 5.518 0 10.004-4.028 10.004-9.041S17.522 2 12.004 2zm.254 13.514-2.56-2.733-5.19 2.733 6.478-6.801 2.515 2.731 5.148-2.731-6.391 6.801z" />
        </svg>
      </div>
    </button>
  );
}
