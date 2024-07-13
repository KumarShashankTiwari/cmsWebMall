export const calendarValidation = (start_date, end_date) => {
    if (end_date && (start_date > end_date)) {
        return false
    }
    return true

}