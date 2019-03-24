export const getRandomColor = () => {
    return ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
}