export const generateId= () => (
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
);

export const getTime = () => {
    const date = new Date()

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const setValueTime = (m) => {
        if (m < 10) {
            return m = "0" + m
        } else {
            return m
        }
    }

    return `${setValueTime(date.getHours())}:${setValueTime(date.getMinutes())}:${setValueTime(date.getSeconds())}, ${setValueTime(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()} `
}