import { useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';

// 약관 목록
const list = [
  '서비스 이용약관',
  '개인정보 수집/이용 동의',
  '개인정보 제3자 정보 제공 동의',
  '위치 기반 서비스 이용 약관 동의',
];

const TermsAgreement = ({ onAgree }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState(() =>
    Object.fromEntries(list.map((item) => [item, false])),
  );
  const [isAllChecked, setIsAllChecked] = useState(false);

  // 동의 버튼 클릭
  const handleAgree = () => {
    setIsChecked(true);
    setIsModalOpen(false);
    onAgree?.();
  };

  // 모달 닫기
  const handleCloseModal = () => setIsModalOpen(false);

  // 모든 항목 동의 체크박스 변경
  const handleAllAgreeChange = () => {
    const newState = !isAllChecked;
    setIsAllChecked(newState);
    setCheckedItems(Object.fromEntries(list.map((item) => [item, newState])));
  };

  // 개별 항목 체크박스 변경
  const handleItemChange = (item) => {
    const updatedItems = { ...checkedItems, [item]: !checkedItems[item] };
    setCheckedItems(updatedItems);
    setIsAllChecked(Object.values(updatedItems).every(Boolean));
  };

  return (
    <>
      <div className="flex justify-end">
        {/* 약관 동의하기 버튼 */}
        <div className="flex items-center">
          <input
            id="link-checkbox"
            type="checkbox"
            value=""
            checked={isChecked}
            onChange={() => document.getElementById('my_modal_1').showModal()}
            className="checkbox checkbox-primary"
          />
          <label
            htmlFor="link-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            약관 동의하기
          </label>
        </div>

        {/* 약관 동의 모달 */}
        <dialog
          id="my_modal_1"
          className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">약관 동의</h3>
            <p className="pt-2 text-sm text-gray-500">
              필수항목 및 선택항목 약관에 동의해 주세요.
            </p>

            {/* 모든 항목 동의 */}
            <div className="pt-8">
              <div className="flex items-center bg-gray-100 py-6 px-4">
                <input
                  id="all-agree"
                  type="checkbox"
                  checked={isAllChecked}
                  onChange={handleAllAgreeChange}
                  className="checkbox checkbox-primary"
                />

                <label
                  htmlFor="all-agree"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  모든 항목 동의하기
                </label>
              </div>

              {/* 약관 목록 */}
              <div>
                <ul className="list">
                  {list.map((item) => (
                    <li
                      key={item}
                      className="list-row flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={checkedItems[item]}
                          onChange={() => handleItemChange(item)}
                          className="checkbox checkbox-primary"
                        />

                        <label className="flex items-center gap-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          <div className="badge badge-soft badge-info">
                            필수
                          </div>{' '}
                          {item}
                        </label>
                      </div>

                      <button className="btn btn-square btn-ghost">
                        <BiChevronRight className="size-8" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <div className="flex items-center gap-2">
                  <button
                    className="btn"
                    onClick={handleCloseModal}>
                    취소
                  </button>

                  <button
                    className={`btn btn-primary ${
                      !isAllChecked ? 'btn-disabled' : ''
                    }`}
                    onClick={handleAgree}
                    disabled={!isAllChecked}>
                    동의
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default TermsAgreement;
