// StyledCalendar.tsx
import React from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './test.css';  

interface StyledCalendarProps extends CalendarProps {
  theme: {
    color: {
      pink: string;
      brown: string;
      lime: string;
      blue: string;
    };
  };
}

const StyledCalendar: React.FC<StyledCalendarProps> = ({ theme, className, ...props }) => {
  const calendarStyles = {
    '.react-calendar__navigation': {
      background: theme.color.pink,
      borderBottom: `4px solid ${theme.color.brown}`,
      height: '120px', // Increase the height
      borderRadius: '20px 20px 0 0',
    },
    '.react-calendar__navigation span': {
      fontSize: '24px',
      fontWeight: '600',
      color: theme.color.brown,
    },
    '.react-calendar__navigation button:disabled': {
      backgroundColor: theme.color.pink,
      borderRadius: '20px 20px 0 0',
    },
    '.react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus': {
      backgroundColor: theme.color.pink,
      borderRadius: '20px 20px 0 0',
    },
    '.react-calendar__month-view': {
      padding: '32px', // Increase the padding
    },
    '.react-calendar__month-view abbr': {
      color: theme.color.brown,
      fontSize: '16px',
      fontWeight: '500',
    },
    '.react-calendar__month-view__weekdays abbr': {
      fontSize: '18px',
      fontWeight: '900',
    },
    '.react-calendar__tile': {
      textAlign: 'center',
      height: '100px', // Increase the height of each tile
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    '.react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus, .react-calendar__tile--active': {
      background: theme.color.blue,
      borderRadius: '14px',
    },
    '.react-calendar__tile--now': {
      background: theme.color.lime,
      borderRadius: '14px',
    },
    '.react-calendar__tile--now:enabled:hover, .react-calendar__tile--now:enabled:focus': {
      background: theme.color.blue,
      borderRadius: '14px',
    },
    '.react-calendar__navigation__label': {
      backgroundColor: 'tomato',
    },
  };

  return (
    <div className={`w-full h-full mt-8 ${className}`} style={calendarStyles}>
      <Calendar {...props} />
    </div>
  );
};

export default StyledCalendar;
