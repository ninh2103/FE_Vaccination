import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface Province {
  id: string
  name: string
}

interface District {
  id: string
  name: string
  provinceId: string
}

const RegistrationForm: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [selectedProvince, setSelectedProvince] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get<Province[]>('https://api.example.com/provinces')
        setProvinces(response.data)
      } catch (error) {
        console.error('Error fetching provinces:', error)
      }
    }

    fetchProvinces()
  }, [])

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get<District[]>(
            `https://api.example.com/districts?provinceId=${selectedProvince}`
          )
          setDistricts(response.data)
        } catch (error) {
          console.error('Error fetching districts:', error)
        }
      }

      fetchDistricts()
    } else {
      setDistricts([])
    }
  }, [selectedProvince])

  const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(event.target.value)
    setSelectedDistrict('')
  }

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value)
  }

  return (
    <div>
      <h1>Đăng Ký Mừi Tiêm</h1>
      <form>
        <div>
          <label htmlFor='province'>Tỉnh/Thành Phố:</label>
          <select id='province' value={selectedProvince} onChange={handleProvinceChange}>
            <option value=''>-- Chọn tỉnh/thành phố --</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='district'>Quận/Huyện:</label>
          <select id='district' value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedProvince}>
            <option value=''>-- Chọn quận/huyện --</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <button type='submit'>Đăng Ký</button>
      </form>
      {selectedProvince && selectedDistrict && (
        <p>
          Bạn đã chọn: {provinces.find((p) => p.id === selectedProvince)?.name} -{' '}
          {districts.find((d) => d.id === selectedDistrict)?.name}
        </p>
      )}
    </div>
  )
}

export default RegistrationForm
