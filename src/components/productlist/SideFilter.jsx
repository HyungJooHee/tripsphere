import { useEffect, useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import useDateSelection from '../../hooks/useDateSelection';
import { getAllAccomData } from '../../services/productListService.jsx';
import useFilterStore from '../../stores/useFilterStore.js';
import usePriceStore from '../../stores/usePriceStore.js';
import useProductListStore from '../../stores/useProductListStore.js';
import useRoomType from '../../stores/useRoomType.js';
import CitySelector from '../common/CitySelector';
import DateSelector from '../common/DateSelector';
import PeopleSelector from '../common/PeopleSelector';
// import PriceSlider from './PriceSlider.jsx';
// import RoomTypeSelector from './RoomTypeSelect.jsx';

const SideFilter = ({ setLoading, setError }) => {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [openDate, setOpenDate] = useState(false);
  const { date } = useDateSelection('filter');

  const {
    selectedCity,
    selectedSubCity,
    adultCount,
    childrenCount,
    checkIn,
    checkOut,
  } = useFilterStore();

  const filter = useFilterStore();

  const moveScroll = () => {
    scroll({ top: 0, behavior: 'smooth' });
  };

  const { range, resetPriceRange } = usePriceStore();
  const { roomTypes, resetRoomTypes } = useRoomType();
  const { list, setList, resetList } = useProductListStore();

  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };

  useEffect(
    () => {
      console.log('쿼리요청이 필요한 옵션 변경');
      listInfoSetting();
    },
    [
      // selectedCity,
      // selectedSubCity,
      // adultCount,
      // childrenCount,
      // checkIn,
      // checkOut,
    ],
  );

  // 검색 옵션 변경 버튼 클릭시 DB 쿼리
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('옵션 수정 적용 버튼 클릭');
    listInfoSetting();
    moveScroll();
  };

  const listInfoSetting = () => {
    resetList();

    let listInfo = async () => {
      setLoading(true);
      try {
        const data = await getAllAccomData(
          selectedCity,
          selectedSubCity,
          adultCount,
          childrenCount,
          checkIn,
          checkOut,
        );
        // console.log('쿼리 결과 데이터 길이 : ', data.length);
        setList(data);
      } catch (error) {
        console.error('상품정보 로딩 중 오류 ', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    listInfo();
    // resetPriceRange();
    // resetRoomTypes();
  };

  return (
    <aside
      aria-label="숙소 검색 옵션"
      className={`sidebar z-10 sticky top-5 ${isFormOpen ? 'w-[30%]' : 'w-0'}`}>
      <div className="flex mb-4 items-center justify-between">
        {isFormOpen && (
          <div className="pl-3 font-extrabold">검색 옵션 영역</div>
        )}
        <button
          type="button"
          onClick={toggleForm}
          aria-label={
            isFormOpen ? '숙소 검색 옵션 닫기' : '숙소 검색 옵션 열기'
          }
          className={`border border-gray-200 px-0.5 py-2 ${
            isFormOpen ? 'rounded-l-md' : 'rounded-r-md'
          }`}>
          <BiChevronLeft
            className={`transition-transform duration-300 ${
              !isFormOpen ? 'rotate-180' : ''
            } size-6`}
          />
        </button>
      </div>

      {isFormOpen && (
        <form
          aria-label="검색 옵션 변경창"
          className="flex flex-col gap-y-5 p-2.5">
          {/* 여행 장소 선택 */}
          <fieldset className="rounded-lg border border-gray-200 p-3">
            <legend className="fieldset-legend px-2 font-medium">
              여행 장소
            </legend>
            <CitySelector isGlobal={true} />
          </fieldset>

          <fieldset className="fieldset border border-base-300 p-4 rounded-box dark:border-white">
            <legend className="fieldset-legend px-2 font-medium">일정</legend>
            {/* 체크인 · 체크아웃 */}
            <DateSelector
              stateType="filter"
              openDate={openDate}
              setOpenDate={setOpenDate}
            />

            {/* 인원수 */}
            <PeopleSelector stateType="filter" />
          </fieldset>

          {/* 예산 범위 선택 */}
          {/* <fieldset className="rounded-lg border border-gray-200 px-3">
            <legend className="fieldset-legend px-2 font-medium">가격</legend>
            <div className="flex items-center justify-between">
              <div className="w-full p-3 max-w-xs">
                <PriceSlider
                  step={5}
                  className="relative w-full p-4"
                />
              </div>
            </div>
          </fieldset> */}

          {/* 숙박 장소 선택 */}
          {/* <fieldset className="rounded-lg border border-gray-200 p-3">
            <legend className="fieldset-legend px-2 font-medium">
              숙박 장소
            </legend>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              <RoomTypeSelector />
            </div>
          </fieldset> */}

          <button
            aria-label="수정한 검색 옵션 적용"
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            옵션 수정 적용
          </button>
        </form>
      )}
    </aside>
  );
};

export default SideFilter;
