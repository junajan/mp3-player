import moment from 'moment';
import * as constants from '../constants';

export const formatTime = format => time => moment(time).format(format);
export const formatTimeDefault = formatTime(constants.DATE_TIME_FORMAT);
