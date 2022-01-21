function convertToHumanReadable(finishTime, startTime) {
    const t = (finishTime - startTime)/1000;
    const h = parseInt(t/3600, 10);
    const m = parseInt((t / 60 - h * 60), 10);
    const s = parseInt((t - h*3600 - m*60), 10);
    return `${h}H : ${m}M : ${s}S`;
}
export default { convertToHumanReadable };