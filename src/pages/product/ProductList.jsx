import React, { useCallback, useEffect, useState } from 'react';
import PageHeader from '../../components/Molecules/PageHeader';
import SideFilter from '../../components/Organisms/SideFilter';
import Loading from '../../components/Molecules/Loading';
import AccomCard from '../../components/Molecules/AccomCard';
import { useAccommodations } from '../../hooks/useAccomData';
import useFilterStore from '../../stores/useFilterStore';
import AccomTypeSelector from '../../components/Organisms/AccomTypeSelector';
import Pagination from '../../components/Molecules/Pagination';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { LiaHotelSolid } from 'react-icons/lia';
import { LuHotel } from 'react-icons/lu';
import { BiBuildingHouse, BiBuildings } from 'react-icons/bi';
import { BsHouses } from 'react-icons/bs';
import { PiWarehouse, PiDiamondsFourLight } from 'react-icons/pi';
import { MdOutlineForest } from 'react-icons/md';
import NoData from '../../components/Atoms/NoData';

const breadcrumb = [
  { link: '/', text: '홈' },
  { link: '/products', text: '여행 검색 결과 목록' },
];

const typeMapping = [
  {
    value: '전체',
    text: '전체',
    icon: <PiDiamondsFourLight className="size-[40px]" />,
  },
  {
    value: 'hotel',
    text: '호텔',
    icon: <LiaHotelSolid className="size-[40px]" />,
  },
  {
    value: 'motel',
    text: '모텔',
    icon: <LuHotel className="size-[40px]" />,
  },
  {
    value: 'resort',
    text: '리조트',
    icon: <BiBuildingHouse className="size-[40px]" />,
  },
  {
    value: 'pension',
    text: '펜션',
    icon: <PiWarehouse className="size-[40px]" />,
  },
  {
    value: 'guesthouse',
    text: '게스트하우스',
    icon: <BsHouses className="size-[40px]" />,
  },
  {
    value: 'camping',
    text: '캠핑',
    icon: <MdOutlineForest className="size-[40px]" />,
  },
];

const ProductList = () => {
  const {
    selectedCity,
    selectedSubCity,
    adultCount,
    childrenCount,
    checkIn,
    checkOut,
  } = useFilterStore();

  const [filters, setFilters] = useState({
    type: '전체',
    city: selectedCity,
    sub_city: selectedSubCity,
    checkIn,
    checkOut,
    adults: adultCount,
    children: childrenCount,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading } = useAccommodations(filters);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPerOption, setSelectedPerOption] = useState(5);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const perOptions = [
    { id: 1, value: 5, name: '5개씩 보기' },
    { id: 2, value: 10, name: '10개씩 보기' },
    { id: 3, value: 15, name: '15개씩 보기' },
    { id: 4, value: 20, name: '20개씩 보기' },
  ];

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) => {
        const typeMatch = filters.type === '전체' || item.type === filters.type;
        return typeMatch;
      });
      setFilteredData(filtered);
    }
  }, [data, filters]);

  useEffect(() => {
    if (filteredData.length > 0 && location.search === '') {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev.toString());
        newParams.set('page', 1);
        return newParams;
      });
    }
  }, [filteredData, location.search]);

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());
      newParams.set('page', 1);
      return newParams;
    });
  }, [filters.type]);

  // 검색 핸들러
  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      city: selectedCity,
      sub_city: selectedSubCity,
      checkIn,
      checkOut,
      adults: adultCount,
      children: childrenCount,
    }));

    navigate('/products');
  };

  // 페이지 옵션 선택 핸들러
  const handlePagePerOptionSelect = useCallback(
    (event) => {
      const perPage = Number(event.target.value);
      setSelectedPerOption(perPage);

      navigate(location.pathname);
    },
    [navigate, location],
  );

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1200px] mx-auto py-[40px]">
      {/* 페이지 헤더 */}
      <PageHeader
        title={`여행 숙소 검색 결과 (${filteredData.length}건)`}
        breadcrumb={breadcrumb}
        navigateLink="/"
      />

      {/* 숙소 유형 선택 */}
      <AccomTypeSelector
        filters={filters}
        setFilters={setFilters}
        typeMapping={typeMapping}
      />

      <div
        id="container"
        className="flex items-start gap-10">
        {/* 숙소 필터 */}
        <SideFilter handleSearch={handleSearch} />

        <div className="flex-1">
          <div className="flex justify-end mb-10">
            <select
              id="perPage"
              className="select border border-gray-400 rounded-lg w-40"
              value={selectedPerOption}
              onChange={handlePagePerOptionSelect}
              title="갯수 보기">
              {perOptions.map((item) => (
                <option
                  key={item.id}
                  value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <h2 className="sr-only">숙소 리스트</h2>

          {filteredData.length > 0 ? (
            <>
              <ul className="flex flex-col gap-6">
                {currentPageData.map((item, index) => (
                  <AccomCard
                    accommodation={item}
                    key={index}
                  />
                ))}
              </ul>
              {/* 페이지네이션 */}
              <Pagination
                data={filteredData}
                pagePerItem={selectedPerOption}
                setCurrentPageData={setCurrentPageData}
              />
            </>
          ) : (
            <NoData
              text="검색 결과가 없습니다."
              icon={BiBuildings}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
