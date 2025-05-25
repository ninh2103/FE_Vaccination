import styled from 'styled-components'

// Định nghĩa styled component
const MarqueeWrapper = styled.div`
  background: linear-gradient(to right, #63b3ed, #48bb78, #38b2ac);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 48px;
  position: relative;
  overflow: hidden;
  height: 80px; /* Tăng chiều cao khung */
`

const MarqueeText = styled.div`
  display: inline-block;
  white-space: nowrap; /* Ngăn chặn dòng bị ngắt */
  animation: marquee 7s linear infinite; /* Điều chỉnh tốc độ và kiểu chạy */
  font-weight: 600;
  color: white;
  font-size: 2rem; /* Tăng kích thước chữ */
  padding-left: 100%; /* Đảm bảo text bắt đầu từ ngoài màn hình */

  @keyframes marquee {
    0% {
      transform: translateX(100%); /* Bắt đầu từ bên phải */
    }
    100% {
      transform: translateX(-100%); /* Chạy qua trái */
    }
  }
`

const Banner = () => {
  return (
    <MarqueeWrapper>
      <MarqueeText>🌟 Hãy tiêm vaccine để bảo vệ sức khỏe của bạn! 🌟</MarqueeText>
    </MarqueeWrapper>
  )
}

export default Banner
