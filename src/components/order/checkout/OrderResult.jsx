import React from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { formatTimeStampTime } from '../../../utils/format';
import { FaMapLocationDot } from 'react-icons/fa6';
import { BiHotel, BiUser } from 'react-icons/bi';
import RoomTypeMapping from '../../common/RoomTypeMapping';
import OrderList from './OrderList';
import KakaoMap from '../../common/KakaoMap';
import { PiBabyLight } from 'react-icons/pi';
import ServiceList from '../../common/ServiceList';

const OrderResult = ({ room, isOpen, toggleContent }) => {
  return (
    <div
      key={room.accommodation_id}
      className="border-b border-base-300 mb-4">
      <button
        onClick={toggleContent}
        className="flex justify-between items-center w-full text-left p-4 bg-base-200 rounded-lg">
        <span className="text-sm font-semibold">{room.name}</span>
        <span
          className={`cursor-pointer transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <IoIosArrowDropdownCircle className="text-stone-500 text-lg" />
        </span>
      </button>

      {isOpen && (
        <div className="mt-2 text-base-content">
          <div>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium">숙소명</dt>
                <dd className="mt-1 text-sm/6  sm:col-span-2 sm:mt-0">
                  {room?.accomData?.name}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium">객실명</dt>
                <dd className="mt-1 text-sm/6  sm:col-span-2 sm:mt-0 flex items-center gap-2">
                  {room?.name} <RoomTypeMapping type={room?.type} />
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium ">예약 정보</dt>
                <dd className="mt-2 text-sm sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 rounded-md border border-gray-200">
                    <OrderList
                      IconComponent={FaMapLocationDot}
                      Title={'숙소 위치'}
                      description={`${room?.accomData?.location?.city}
                                ${room?.accomData?.location?.sub_city}`}
                    />
                    <div className="border-t border-gray-100">
                      <div className="divide-y divide-gray-100">
                        <KakaoMap
                          latitude={room?.accomData?.location?.latitude}
                          longitude={room?.accomData?.location?.longitude}
                        />
                      </div>
                    </div>
                    <OrderList
                      IconComponent={BiHotel}
                      Title={'숙박 시설'}
                      type={room?.accomData?.type}
                    />
                    <li>
                      <div className="py-4 px-6 flex flex-col gap-3">
                        {/* 체크인 · 체크아웃 */}
                        체크인: {formatTimeStampTime(room?.check_in)} ~
                        체크아웃: {formatTimeStampTime(room?.check_out)}
                        <span className="flex items-center gap-1">
                          <BiUser /> 성인 {room?.capacity?.adults || 0}명
                        </span>
                        <span className="flex items-center gap-1">
                          <PiBabyLight /> 미성년자{' '}
                          {room?.capacity?.children || 0}명
                        </span>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
                <dt className="text-sm/6 font-medium">호스트 연락처</dt>
                <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">
                  {room?.accomData?.host?.contact}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium ">객실 소개</dt>
                <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">
                  {room?.description}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium">서비스</dt>
                <dd className="mt-2 text-sm sm:col-span-2 sm:mt-0">
                  {room?.services && <ServiceList services={room?.services} />}
                </dd>
              </div>
            </dl>
          </div>

          {/* <p>{room.description}</p>
          <p className="text-sm">위치: {room.location.place_name}</p>
          <p className="text-sm">가격: {room.original_price} 원</p>
          <div className="flex items-center gap-2">
            {room.images && room.images.length > 0 && (
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-32 h-32 object-cover"
              />
            )}
          </div>
          <p className="text-sm">재고: {room.stock}</p> */}
        </div>
      )}
    </div>
  );
};

export default OrderResult;
