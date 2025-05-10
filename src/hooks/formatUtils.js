export const formatDateWithTime = (date) => {
    if(!date) return null
    
    let day = "00", month = "00", year = "0000", hour = "00", minute = "00";

    if (typeof date === "string") {
        const [datePart, timePart] = date.split("T");
        
        if(!datePart) return null;

        [year, month, day] = datePart.substring(0, 10).split("-");
        if(timePart) {
            [hour, minute] = timePart.substring(0, 5).split(":");
        }
    } else if (date instanceof Date && !isNaN(date)) {
        day = String(date.getDate()).padStart(2, "0");
        month = String(date.getMonth() + 1).padStart(2, "0");
        year = date.getFullYear();
        hour = String(date.getHours()).padStart(2, "0");
        minute = String(date.getMinutes()).padStart(2, "0");
    }

    return `${day}/${month}/${year} - ${hour}:${minute}`;
  };

export const formatDateWithoutTime = (date) => {
    if (!date) return;
    
    let year = "0000", month = "00", day = "00";

    if(typeof date === "string") {
        [year, month, day] = date.split("-");
    } else if(date instanceof Date && !isNaN(date)) {
        day = String(date.getDate()).padStart(2, "0");
        month = String(date.getMonth() + 1).padStart(2, "0");
        year = date.getFullYear();
    }

    return `${day}/${month}/${year}`;
};

export const formatTimeWithoutSeconds = (time) => {
    if(!time) return null;

    let hour = "00", minute = "00"

    if(typeof time === "string") {
        [hour, minute] = time.split(":")
    
    } else if(date instanceof Date && !isNaN(date)) {
        hour = String(date.getHours()).padStart(2, "0");
        minute = String(date.getMinutes()).padStart(2, "0");
    }

    return `${hour}:${minute}`
}