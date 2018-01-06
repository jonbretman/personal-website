import React from 'react';

const months = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
];

function paddedNumber(n) {
    return n < 10 ? '0' + n : n;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return [
        paddedNumber(date.getDate()),
        months[date.getMonth()],
        date.getFullYear(),
    ].join(' ');
}

export default function PostDate({ date }) {
    return <div>Posted {formatDate(date)}</div>;
}
