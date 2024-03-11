export const formatDateForMySQL = (date: any) => {
    if (!date) return null;
    const newDate = new Date(date);
    const offset = newDate.getTimezoneOffset();
    const adjustedDate = new Date(newDate.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split('T')[0] + ' ' + adjustedDate.toISOString().split('T')[1].split('.')[0];
  };
  