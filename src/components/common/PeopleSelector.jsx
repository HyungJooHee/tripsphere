import React, { useState, useEffect } from 'react';
import Counter from './Counter';
import useFilterStore from '../../stores/useFilterStore';

const PeopleSelector = ({ isGlobal }) => {
  const store = useFilterStore();
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [localPeople, setLocalPeople] = useState(0);

  const selectedState = isGlobal
    ? {
        people: store.people,
        setPeople: store.setPeople,
      }
    : {
        people: localPeople,
        setPeople: setLocalPeople,
      };

  const { people, setPeople } = selectedState;

  useEffect(() => {
    setPeople(adultCount + childrenCount);
  }, [adultCount, childrenCount]);

  const handlePeopleCount = (type, count) => {
    if (type === 'adultCount') {
      setAdultCount(count);
    } else if (type === 'childrenCount') {
      setChildrenCount(count);
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor="peopleCount"
        className="mb-2 block text-sm font-medium text-gray-700 text-left dark:text-gray-200">
        인원수
      </label>
      <div className="dropdown w-full">
        <input
          tabIndex={1}
          role="button"
          className="input bg-base-200 w-full dark:border-gray-200"
          placeholder="인원수"
          value={`총 인원 ${people}`}
          readOnly
        />
        <div
          tabIndex={1}
          className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md">
          <div className="card-body">
            <Counter
              type="adultCount"
              label="성인"
              handlePeopleCount={handlePeopleCount}
            />

            <Counter
              type="childrenCount"
              label="어린이"
              handlePeopleCount={handlePeopleCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleSelector;
