import { BiUser, BiCalendarAlt } from 'react-icons/bi';
import { HiOutlineTicket } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { compareToday, formatDate, formatNumber } from '../../utils/format';
import { useUserOrders } from '../../hooks/useOrderData';
import Loading from '../common/Loading';
import useAuthStore from '../../stores/useAuthStore';

const OrderHistory = () => {
  const { user } = useAuthStore();
  const { data: orderInfo, isLoading, error } = useUserOrders(user?.uid);

  if (isLoading) return <Loading />;
  if (error) return <>오류</>;

  return (
    <div>
      <div className="my-8 p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between">
        <h2 className="flex items-center gap-2 font-bold text-xl">
          <HiOutlineTicket size={20} /> 주문 내역
        </h2>

        <Link
          to="/orderhistory"
          className="text-primary font-bold">
          더 보기
        </Link>
      </div>

      <ul className="mt-8 list bg-base-100 rounded-box shadow-md">
        {orderInfo?.map((order, index) => (
          <li
            className="list-row flex-col flex"
            key={index}>
            <div className="text-xs uppercase font-bold flex items-center justify-between">
              {compareToday(order.check_in) && (
                <div className="badge badge-soft badge-primary text-xs">
                  {compareToday(order.check_in)}
                </div>
              )}
              <div> 예약번호 : {order.id} </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-6">
                <img
                  className="size-24 rounded-box"
                  src={
                    order.accommodation?.images?.[0] ||
                    'https://via.placeholder.com/100'
                  }
                  alt={order.accommodation?.name || '숙소 정보 없음'}
                />

                <div className="flex flex-col">
                  <h4 className="text-md opacity-60 flex gap-2">
                    {formatDate(order.order_date)}
                    <div>
                      {order.payment_status === 'completed'
                        ? '결제완료'
                        : '취소'}
                    </div>
                  </h4>

                  <div className="mb-2 text-md uppercase font-bold">
                    {order.accommodation?.name}
                  </div>

                  <div className="flex-col flex gap-[4px] mt-auto">
                    <div className="flex items-center gap-2 text-xs">
                      <BiUser />
                      <div className="mr-1 text-xs">
                        인원수 (성인: {order.guest_count.adults}명 소아:
                        {order.guest_count.children}
                        명)
                      </div>
                    </div>

                    <div className="flex items-center gap-10">
                      <div className="flex items-center gap-2 text-xs">
                        <BiCalendarAlt />
                        <span>체크인:</span>
                        <span>{formatDate(order.check_in)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <BiCalendarAlt />
                        <span>체크아웃:</span>
                        <span>{formatDate(order.check_out)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>{formatNumber(order.total_price)}원</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
