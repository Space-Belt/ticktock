import { StyleSheet, Text, View } from 'react-native';
import React, { SetStateAction } from 'react';
import DatePicker from 'react-native-date-picker';
import { useModal } from '@stores/zustand/modal';

type Props = {
  isStartTimeModal: boolean;
  selectedStartTime: Date;
  isEndTimeModal: boolean;
  selectedEndTime: Date;
  setIsStartTimeModal: React.Dispatch<SetStateAction<boolean>>;
  setSelectedStartTime: React.Dispatch<SetStateAction<Date>>;
  setIsEndTimeModal: React.Dispatch<SetStateAction<boolean>>;
  setSelectedEndTime: React.Dispatch<SetStateAction<Date>>;
};

const StartEndTimePicker = ({
  isStartTimeModal,
  selectedStartTime,
  isEndTimeModal,
  selectedEndTime,
  setIsStartTimeModal,
  setSelectedStartTime,
  setIsEndTimeModal,
  setSelectedEndTime,
}: Props) => {
  const setModalState = useModal(state => state.setModalState);
  const removeModal = useModal(state => state.removeModal);
  return (
    <DatePicker
      modal
      title={'시간을 선택하세요'}
      date={isStartTimeModal ? selectedStartTime : selectedEndTime}
      is24hourSource="locale"
      locale="en_GB"
      minuteInterval={1}
      onConfirm={(select: Date) => {
        if (isStartTimeModal) {
          if (select > selectedEndTime) {
            setModalState(
              true,
              '안돼요',
              '시작시간이 종료시간 이후일 수 없습니다.',
              null,
              '확인',
              '',
              () => {
                removeModal();
              },
              () => {},
            );
          } else {
            setSelectedStartTime(select);
            setIsStartTimeModal(false);
          }
        } else {
          if (select < selectedStartTime) {
            setModalState(
              true,
              '안돼요',
              '종료시간이 시작시간 이후일 수 없습니다.',
              null,
              '확인',
              '',
              () => {
                removeModal();
              },
              () => {},
            );
          } else {
            setSelectedEndTime(select);
            setIsEndTimeModal(false);
          }
        }
      }}
      onCancel={() => (isStartTimeModal ? setIsStartTimeModal(false) : setIsEndTimeModal(false))}
      mode={'time'}
      confirmText="설정"
      cancelText="취소"
      open={isStartTimeModal || isEndTimeModal}
    />
  );
};

export default StartEndTimePicker;

const styles = StyleSheet.create({});
