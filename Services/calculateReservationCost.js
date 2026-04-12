const reservationCost = (room_rate, start_date, end_date) => {
    const nights = (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24);    
    return nights * room_rate;
}

module.exports = {reservationCost};