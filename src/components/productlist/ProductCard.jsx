import React from 'react';
import { BiCalendarAlt, BiCart, BiHeart } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../utils/format';
import KakaoShareButton from '../common/KakaoShareButton';

const ProductCard = ({ index, product, arrayLength }) => {
  function bulidingType({ product }) {
    let message;

    switch (product.type) {
      case 'hotel':
        message = '호텔';
        break;
      case 'pension':
        message = '펜션';
        break;
      case 'guesthouse':
        message = '게스트하우스';
        break;
      case 'camping':
        message = '캠핑';
        break;
      default:
        message = '';
        break;
    }

    return message;
  }

  return (
    <Link to={`/product/${index}`}>
      <li
        className={`group card bg-base-100 transition-shadow grid grid-cols-[2fr_5fr] gap-[20px] ${
          index === 0 ? 'pb-[30px]' : 'py-[30px]'
        } ${index !== arrayLength - 1 ? 'border-b border-gray-200' : ''}`}>
        <figure>
          <div className="h-full relative">
            <div className="h-[200px] rounded-md overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full object-cover"
              />
            </div>
          </div>
        </figure>

        <div className="card-body py-0 px-0 gap-0">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div className="badge badge-soft badge-primary">
                {bulidingType({ product })}
              </div>

              <div className="badge badge-soft badge-info">
                {product.location.place_name}
              </div>
            </div>

            <div className="flex gap-2">
              <span className="hidden sm:block">
                <KakaoShareButton
                  title={product.name}
                  description={product.description}
                  imageUrl={product.images[0]}
                  pageUrl={window.location.origin + '/product/0'}
                />
              </span>

              <span className="hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                  <BiCart
                    aria-hidden="true"
                    className="size-5 text-gray-400"
                  />
                </button>
              </span>

              <span className="hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                  <BiHeart
                    aria-hidden="true"
                    className="size-5 text-gray-400"
                  />
                </button>
              </span>
            </div>
          </div>
          <h2 className=" transition-colors card-title text-2xl pb-3.5 border-b-1 border-gray-200">
            {product.name}
          </h2>

          {/* 패키지 정보 */}
          <div className="grid grid-cols-[3fr_1fr] h-4/5">
            <div className="py-4 pr-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-2.5">
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2 min-w-[90px]">
                    <BiCalendarAlt className="text-base" />
                    <p className="font-bold">체크인</p>
                  </div>
                  <time dateTime={product.check_in.toLocaleString()}>
                    {product.check_in.toLocaleString()}
                  </time>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2 min-w-[90px]">
                    <BiCalendarAlt className="text-base" />
                    <p className="font-bold">체크아웃</p>
                  </div>
                  <time dateTime={product.check_out.toLocaleString()}>
                    {product.check_out.toLocaleString()}
                  </time>
                </div>
              </div>

              <p
                className="line-clamp-2"
                title="패키지 설명">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col border-l border-gray-200 pl-4 py-4">
              {/* 가격정보 */}
              <div
                title="가격정보"
                className="flex flex-col justify-around items-start">
                <div title="가격할인">
                  <p
                    className="line-through text-red-600"
                    title="정가">
                    {formatNumber(product.original_price)}원
                  </p>

                  <p
                    className="underline font-bold text-2xl transition-colors"
                    title="할인가">
                    {formatNumber(product.final_price)}원
                  </p>
                </div>

                <span> {product.discount_rate}% </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default ProductCard;
