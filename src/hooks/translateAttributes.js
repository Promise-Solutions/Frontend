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
        case "WORKING": return  "Em progresso"
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

export function getPaymentTypeTranslated(paymentType) {
    switch (paymentType) {
        case "CREDIT_CARD": return "Cartão de Crédito"
        case "DEBIT_CARD": return "Cartão de Débito"
        case "BILLET": return "Boleto"
        case "MONEY": return "Dinheiro"
        case "PIX": return "Pix"
        case "TRANSFER": return "Transferência"
        default: return paymentType
    }
}

export function getExpenseCategoryTranslated(expenseCategory) {
    switch (expenseCategory) {
        case "BILLS": return "Contas"
        case "STOCK": return "Estoque"
        case "MAINTENANCE": return "Manutenção"
        case "OTHERS": return "Outros"
        default: return expenseCategory
    }
}