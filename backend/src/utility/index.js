function generateRandomArray(length) {
    const arr = [];
    for (let i = 1; i <= length/2; i+=1) {
        // arr.fill(i, i, i + 1);
        arr.push(i);
        arr.push(i);
    }
    return arr.sort(() => Math.random() - 0.5)
}
export default { generateRandomArray };