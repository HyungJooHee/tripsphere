import React, { useState, useEffect } from 'react';
import OrderResult from './OrderResult';

const ToggleOrderList = ({ data }) => {
  const [openIndexes, setOpenIndexes] = useState([]);

  useEffect(() => {
    if (data) {
      setOpenIndexes(new Array(data.length).fill(true));
    }
  }, [data]);

  const toggleContent = (index) => {
    const updatedIndexes = [...openIndexes];
    updatedIndexes[index] = !updatedIndexes[index];
    setOpenIndexes(updatedIndexes);
  };

  return (
    <div className="flex-1">
      {data?.map((room, index) => (
        <OrderResult
          key={`${room.roomId}-${index}`}
          room={room}
          isOpen={openIndexes[index]}
          toggleContent={() => toggleContent(index)}
        />
      ))}
    </div>
  );
};

export default ToggleOrderList;
