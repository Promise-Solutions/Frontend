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

export function formatDateBR(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function extractDateOnly(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return "";

  const [datePart] = dateStr.split("T");
  if (!datePart) return "";

  const [year, month, day] = datePart.split("-");
  if (!year || !month || !day) return "";

  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
}

export const getNumericValue = (valueString) => {
if (valueString == "" || valueString == NaN || valueString == null) {
    return valueString;
}
if (typeof valueString === "string" && valueString.includes(",")) {
    valueString = valueString.replace(",", ".");
}
return parseFloat(valueString);
};

export const getBRCurrency = (value) => {
    if(typeof value === "string") {
        value = getNumericValue(value)
    } else if(typeof value === "number" ) {
        value = value.toFixed(2)
    } else {
        return "Não foi possível encontrar o valor" ;
    }

    return `R$ ${String(value).replace(".", ",")}`
}