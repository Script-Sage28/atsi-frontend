export const Peso = (amount: number): string => {
    const formatter = new Intl.NumberFormat('en-PH',{
        style: 'currency',
        currency:'PHP',
        minimumFractionDigits: 2,
    })
    return formatter.format(amount);
}