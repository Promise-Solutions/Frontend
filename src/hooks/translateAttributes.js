export function getCategoryTranslated(category) {
    switch (category) {
        case  "MUSIC_REHEARSAL": return "Ensaio Musical";
        case "PODCAST": return "Podcast";
        case "PHOTO_VIDEO_STUDIO": return "Estúdio Fotográfico";
        default: return category;  
    }
}

export function getStatusTranslated(status) {
    switch (status) {
        case "PENDING": return "Pendente"
        case "CLOSED": return "Concluído"
        case "CANCELED": return "Cancelado"
        default: return status
    }
}

export function getServiceTypeTranslated(serviceType) {
    switch (serviceType) {
        case "SINGLE": return "Avulso"
        case "MONTHLY": return "Mensal"
        default: return serviceType
    }
}