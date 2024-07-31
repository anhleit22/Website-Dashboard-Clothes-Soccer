import React from 'react';
import { addNotication } from '@/lib/features/Notification/NotificationSlice';
import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { Notification } from '@mantine/core';
const NotificationValidate = () => {
  const notification = useSelector(
    (state: RootState) => state.notifitcation.render
  );
  const dispatch = useDispatch();
  return (
    <div>
      {notification && (
        <Notification
          className={`${
            notification
              ? 'animate-slideIn absolute !top-0.5 right-[0px] z-50 w-[50vh]'
              : 'animate-slideOut absolute !top-0.5 right-[0px] z-50 w-[50vh]'
          }`}
          color='teal'
          title='Cảm ơn quý khách hàng'
          onClose={() => {
            dispatch(addNotication(false));
          }}
        >
          Đã đặt hàng thành công - Tư vấn viên sẽ liên hệ mình trong giây lát!
        </Notification>
      )}
    </div>
  );
};

export default NotificationValidate;
