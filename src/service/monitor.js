import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadCouponDataSet(param) {
  return new Promise((resolve) => {
    post(`${API_DOMAIN}api/services/app/monitor/GetMonitorsByPhone`, param).then((data) => {
      resolve(data);
    });
  });
}