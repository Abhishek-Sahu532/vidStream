export function formatTimeDifference(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date(timestamp);

    // Calculate the difference in milliseconds
    const timeDifference = currentDate - targetDate;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    if (daysDifference > 0) {
        return `${formatTwoDigits(targetDate.getDate())} ${getMonthAbbreviation(
            targetDate.getMonth(),
        )} ${formatTwoDigits(targetDate.getFullYear() % 100)}`;
    } else if (hoursDifference > 0) {
        return  `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
    } else if (minutesDifference > 0) {
        return `${minutesDifference} min${minutesDifference > 1 ? 's' : ''} ago`;
    } else {
        return 'now';
    }
}

function getMonthAbbreviation(monthIndex) {
    const monthAbbreviations = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    return monthAbbreviations[monthIndex];
}

function formatTwoDigits(value) {
    return value < 10 ? '0' + value : value;
}
