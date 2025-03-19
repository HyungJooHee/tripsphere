import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// rangeLimit : 가격 범위 고정값으로 활용
//   하위 속성 : min, max
// range : 가격 범위 가변으로 사용
//   하위 속성 : min, max

// 페이지네이션으로 url 변경시 상태 초기화 문제 확인
const usePriceStore = create()(
  persist(
    (set) => ({
      rangeLimit: { min: 0, max: 35 },
      setLimitLow: (val) =>
        set((state) => ({ rangeLimit: { ...state.rangeLimit, min: val } })),
      setLimitHigh: (val) =>
        set((state) => ({ rangeLimit: { ...state.rangeLimit, max: val } })),
      // 가격 범위 조정
      range: { min: 0, max: 35 },
      setRangeMin: (val) =>
        set((state) => ({ range: { ...state.range, min: val } })),
      setRangeMax: (val) =>
        set((state) => ({ range: { ...state.range, max: val } })),
    }),
    {
      name: 'priceRange-storage',
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default usePriceStore;
