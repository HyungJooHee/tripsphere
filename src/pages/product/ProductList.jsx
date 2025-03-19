import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import ProductsPageList from '../../components/productlist/ProductsPageList';
import SideFilter from '../../components/productlist/SideFilter';
import useFilterStore from '../../stores/useFilterStore';
import usePriceStore from '../../stores/usePriceStore';

const products = [
  {
    id: '1',
    type: 'pension',
    location: {
      place_name: '양평군, 경기도, 한국',
    },
    name: '양평 독채 풀빌라 스테이호은',
    check_in: '2025.03.11',
    check_out: '2025.03.13',
    description:
      '예약 전 숙소 이용 안내 및 이용 수칙을 반드시 읽어주세요. 호젓한 은신처를 의미하는 호은.',
    original_price: '80000',
    discount_rate: '20',
    final_price: '64000',
    images: [
      'https://ak-d.tripcdn.com/images/220713000000ubfbb2422_R_600_400_R5.webp',
      'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F5%2Fb1df43231016311a21c18139bcda6d08%2Fd2071f084774e9d137837f63a757b432.jpg%22&type=m1500',
    ],
  },
  {
    id: '2',
    type: 'pension',
    location: {
      place_name: '양평군, 경기도, 한국',
    },
    name: '양평 독채 풀빌라 스테이호은',
    check_in: '2025.03.11',
    check_out: '2025.03.13',
    description:
      '예약 전 숙소 이용 안내 및 이용 수칙을 반드시 읽어주세요. 호젓한 은신처를 의미하는 호은.',
    original_price: '80000',
    discount_rate: '20',
    final_price: '64000',
    images: [
      'https://ak-d.tripcdn.com/images/220713000000ubfbb2422_R_600_400_R5.webp',
      'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F5%2Fb1df43231016311a21c18139bcda6d08%2Fd2071f084774e9d137837f63a757b432.jpg%22&type=m1500',
    ],
  },
];

const breadcrumb = [
  { link: '/', text: '홈' },
  { link: '/products', text: '여행 검색 결과 목록' },
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

  const { range, rangeLimit } = usePriceStore();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {}, []);

  return (
    <div className="max-w-[1200px] mx-auto py-[40px]">
      <div className="inline-block py-4 px-4 bg-gray-100 rounded-md">
        selectedCity: {selectedCity} <br />
        selectedSubCity: {selectedSubCity} <br />
        adultCount: {adultCount} <br />
        childrenCount: {childrenCount} <br />
        checkIn: {checkIn} <br />
        checkOut: {checkOut}
      </div>

      <div className="inline-block py-4 px-4 bg-gray-100 rounded-md">
        nowMin: {range.min} <br />
        nowMax: {range.max} <br />
        rangeLow : {rangeLimit.min}
        <br />
        rangeHigh : {rangeLimit.max}
        <br />
      </div>

      <div className="inline-block py-4 px-4 bg-gray-100 rounded-md">
        searchParams : {searchParams}
        <br />
      </div>

      <PageHeader
        title="여행 숙소 검색 결과"
        breadcrumb={breadcrumb}
      />

      <div
        id="container"
        className="flex items-start gap-10">
        <SideFilter />

        <article className="content flex-1">
          <ProductsPageList />
        </article>
      </div>
    </div>
  );
};

export default ProductList;
