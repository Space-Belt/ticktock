import { useState, useEffect } from 'react';
import moment from 'moment';

type DateState = {
  currentDate: string;
  goToPreviousDay: () => void;
  goToNextDay: () => void;
};

const useDate = (): DateState => {
  const [currentDate, setCurrentDate] = useState<string>(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    // 현재 날짜로 상태 업데이트
    setCurrentDate(moment().format('YYYY-MM-DD'));
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const goToPreviousDay = () => {
    setCurrentDate(prevDate => moment(prevDate).subtract(1, 'days').format('YYYY-MM-DD'));
  };

  // 다음 날짜로 이동
  const goToNextDay = () => {
    setCurrentDate(prevDate => moment(prevDate).add(1, 'days').format('YYYY-MM-DD'));
  };

  return {
    currentDate,
    goToPreviousDay,
    goToNextDay,
  };
};

export default useDate;
